import { logger } from "@/infrastructure/logging/Logger";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { apiCall, API_CONFIG } from '@/infrastructure/repositories/APIChatRepository.jsx';
import ChatMessage from '@/domain/entities/ChatMessage.jsx';
import VoiceInput from '../../common/VoiceInput';
import '@/css/main/chat.css';
import useAuthStore from '@/infrastructure/stores/AuthStore.jsx';
import { useChatMessages, useProjectDataActions } from '@/infrastructure/stores/selectors/ProjectSelectors.jsx';

// Use global marked from CDN script tag

// Hilfsfunktion für HTML-Escaping
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function normalizeMessage(msg) {
  // EINFACH: Verwende nur die Sender-Information vom Backend
  let sender = msg.sender;
  
  // Type bestimmen - EINFACH
  let type = msg.type;
  if (!type) {
    if (msg.content && msg.content.includes('```')) type = 'code';
    else type = 'text';
  }
  
  return { ...msg, sender, type };
}

async function fetchPromptContent(promptFile) {
  let url;
  if (promptFile.startsWith('frameworks/')) {
    const parts = promptFile.split('/');
    const frameworkId = parts[1];
    const filename = parts[3];
    url = `/api/frameworks/${frameworkId}/prompts/${filename}`;
  } else {
    let filePath = promptFile;
    if (filePath.startsWith('prompts/')) filePath = filePath.substring(8);
    const pathParts = filePath.split('/');
    const filename = pathParts.pop();
    const category = pathParts.join('/');
    url = `/api/prompts/${category}/${filename}`;
  }
  const response = await apiCall(url);
  // Robust: prüfe alle sinnvollen Felder
  if (response.content) return response.content;
  if (response.data && response.data.content) return response.data.content;
  if (typeof response.data === 'string') return response.data;
  if (typeof response === 'string') return response;
  throw new Error(`Prompt content not found for ${promptFile}`);
}

function ChatComponent({ eventBus, activePort, attachedPrompts = [] }) {
  // ✅ REFACTORED: Use global state for messages
  const { messages, hasMessages, messageCount } = useChatMessages();
  
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const msgInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const { user } = useAuthStore.getState();
  const requestedBy = user?.email || user?.id || 'unknown';

  // State für ausgeklappte Codeblöcke
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const toggleBlock = (id) => {
    setExpandedBlocks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ FIXED: No more manual data loading - global state handles it automatically
  useEffect(() => {
    logger.info('ChatComponent: activePort changed to:', activePort);
    setError(null);
  }, [activePort]);

  useEffect(() => {
    if (shouldAutoScroll) scrollToBottom();
  }, [messages, isTyping]);

  // Listen for external chat messages (from task execution, etc.)
  useEffect(() => {
    if (!eventBus) return;
    
    const handleExternalMessage = (data) => {
      if (data && data.message) {
        logger.info('Received external message:', data.message);
        sendMessage(data.message);
      }
    };

    eventBus.on('chat:send:message', handleExternalMessage);
    
    return () => {
      eventBus.off('chat:send:message', handleExternalMessage);
    };
  }, [eventBus]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Clear input immediately
    setInputValue('');
    setIsTyping(true);
    setError(null);
    
    let promptContents = [];
    let failedPrompts = [];
    
    // Fetch all attached prompt contents
    if (attachedPrompts.length > 0) {
      await Promise.all(attachedPrompts.map(async (promptFile) => {
        try {
          const content = await fetchPromptContent(promptFile);
          promptContents.push(content);
        } catch (err) {
          failedPrompts.push(promptFile);
        }
      }));
    }
    
    // Combine prompt contents and user message
    const finalMessage = `${promptContents.join('\n\n')}${promptContents.length > 0 ? '\n\n' : ''}${message}`;
    
    try {
      // Send message to active IDE via backend API
      const result = await apiCall(API_CONFIG.endpoints.chat.send, {
        method: 'POST',
        body: JSON.stringify({ 
          message: finalMessage.trim(), 
          requestedBy,
          port: activePort 
        })
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      logger.info('Message sent successfully to backend');
      
    } catch (error) {
      setError('❌ ' + error.message);
      logger.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // Enhanced message type detection
  const detectMessageType = (content) => {
    if (content.includes('```')) return 'code';
    if (/`[^`]+`/.test(content)) return 'inline_code';
    if (/^[ \t]*(function|def|class|const|let|var|if|for|while|import|require)/m.test(content)) return 'code_snippet';
    if (/<[^>]+>/.test(content)) return 'html';
    if (/^[ \t]*\w+\s*\{/.test(content)) return 'css';
    return 'text';
  };



  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
    autoResizeTextarea();
  };
  const handleSendClick = () => sendMessage(inputValue);
  const handleDebugClick = () => eventBus && eventBus.emit('chat:debug:requested');
  const handleFileUploadClick = () => fileInputRef.current && fileInputRef.current.click();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInputValue(ev.target.result);
      autoResizeTextarea();
    };
    reader.readAsText(file);
  };
  
  // Voice input handler
  const handleVoiceInput = (text) => {
    setInputValue(text);
    // Focus the textarea after voice input
    if (msgInputRef.current) {
      msgInputRef.current.focus();
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScroll = (e) => {
    const el = e.target;
    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
    setShouldAutoScroll(isAtBottom);
  };
  const clearChat = () => {
    // ✅ FIXED: Clear chat is now handled by global state
    logger.info('ChatComponent: clearChat called - should be handled by global state');
  };
  const exportChat = () => {
    const chatData = { messages, exportDate: new Date().toISOString(), totalMessages: messages.length };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const autoResizeTextarea = () => {
    const textarea = msgInputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight * 0.7) + 'px';
    }
  };
  useEffect(() => { autoResizeTextarea(); }, [inputValue]);

  // Copy code to clipboard
  const handleCopyClick = (code) => {
    navigator.clipboard.writeText(code);
  };

  // Render message bubble - EINFACH
  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';
    const isAI = message.sender === 'assistant';
    let content = message.content || message.text || '';
    
    // ✅ FIX: Debug logging entfernt - verursachte doppeltes Rendering
    
    // EINFACH: Code-Blöcke rendern
    let bubbleContent;
    if (content.includes('```')) {
      const codeBlockRegex = /```(\w+)?\s*([\s\S]+?)```/g;
      const codeBlocks = [];
      let match;
      
      while ((match = codeBlockRegex.exec(content)) !== null) {
        codeBlocks.push({
          language: match[1] || 'text',
          code: match[2].trim()
        });
      }
      
      if (codeBlocks.length > 0) {
        bubbleContent = (
          <div className="code-blocks-container">
            {codeBlocks.map((block, idx) => {
              const blockId = `${message.id}_${idx}`;
              const expanded = expandedBlocks[blockId] !== false;
              return (
                <div key={blockId} className="modern-code-block-wrapper">
                  <div className="modern-code-block-header" onClick={() => toggleBlock(blockId)}>
                    <span className="modern-code-block-title">{block.language}</span>
                    <button
                      className="modern-code-block-toggle"
                      title="Toggle"
                      tabIndex={-1}
                      onClick={e => { e.stopPropagation(); toggleBlock(blockId); }}
                    >
                      {expanded ? '▲' : '▼'}
                    </button>
                    <button
                      className="modern-code-block-copy"
                      title="Copy code"
                      tabIndex={-1}
                      onClick={e => { e.stopPropagation(); handleCopyClick(block.code); }}
                    >
                      📋
                    </button>
                  </div>
                  {expanded && (
                    <pre className={`modern-code-block code-block ${block.language}`}>
                      <code>{block.code}</code>
                    </pre>
                  )}
                </div>
              );
            })}
          </div>
        );
      } else {
        bubbleContent = <div className="message-bubble">{escapeHtml(content)}</div>;
      }
    } else {
      // Regular text content
      bubbleContent = (
        <div className="message-bubble" dangerouslySetInnerHTML={{ __html: window.marked ? window.marked.parse(content) : escapeHtml(content) }} />
      );
    }
    
    return (
      <div className={`message ${isUser ? 'user' : 'ai'}`} key={message.id || `msg_${index}`} data-index={index}>
        <div className="message-avatar">{isUser ? 'U' : 'AI'}</div>
        {bubbleContent}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="chat-container">
      <div className="messages-container" id="messages" onScroll={handleScroll}>
        {messages.map(renderMessage).filter(Boolean)}
        {isTyping && (
          <div className="typing-indicator show">
            <div className="message-avatar">AI</div>
            <div className="message-bubble">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        {error && <div className="error-message"><span>⚠️</span><span>{error}</span></div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <div className="input-container">
          <button id="fileUploadBtn" title="Datei hochladen" onClick={handleFileUploadClick}>📎</button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <div className="input-with-voice">
            <textarea
              id="msgInput"
              ref={msgInputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Nachricht eingeben..."
              autoComplete="off"
              rows={1}
            />
            <VoiceInput 
              onTextReceived={handleVoiceInput}
              size="md"
            />
          </div>
          <div className="button-group">
            <button id="sendBtn" onClick={handleSendClick} disabled={!inputValue.trim()} className="btn btn-primary">
              <span>Senden</span>
            </button>
            <button id="debugBtn" onClick={handleDebugClick} className="btn btn-secondary">
              <span>Debug</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent; 