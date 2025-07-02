import React, { useState, useEffect, useRef } from 'react';
import EventBus from '@infrastructure/events/EventBus.jsx';
import ChatComponent from '@presentation/components/ChatComponent.jsx';
import SidebarComponent from '@presentation/components/SidebarComponent.jsx';
import RightPanelComponent from '@presentation/components/RightPanelComponent.jsx';
import IDEMirrorComponent from '@presentation/components/IDEMirrorComponent.jsx';
import PreviewComponent from '@presentation/components/PreviewComponent.jsx';

function App() {
  const [eventBus] = useState(() => new EventBus());
  const [currentView, setCurrentView] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('🔄 App initializing...');
    setupEventListeners();
    initializeApp();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const setupEventListeners = () => {
    if (eventBus) {
      eventBus.on('view-change', handleViewChange);
      eventBus.on('app-loading', handleLoading);
      eventBus.on('app-error', handleError);
      eventBus.on('app-ready', handleReady);
    }
  };

  const initializeApp = () => {
    setIsLoading(true);
    
    // Simulate app initialization
    setTimeout(() => {
      setIsLoading(false);
      if (eventBus) {
        eventBus.emit('app-ready');
      }
    }, 1000);
  };

  const handleViewChange = (data) => {
    setCurrentView(data.view);
  };

  const handleLoading = (data) => {
    setIsLoading(data.isLoading);
  };

  const handleError = (data) => {
    setError(data.error);
  };

  const handleReady = () => {
    console.log('✅ App ready');
  };

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatComponent eventBus={eventBus} />;
      case 'ide-mirror':
        return <IDEMirrorComponent eventBus={eventBus} />;
      case 'preview':
        return <PreviewComponent eventBus={eventBus} />;
      case 'code':
        return <div className="code-explorer-container">Code Editor View</div>;
      default:
        return <ChatComponent eventBus={eventBus} />;
    }
  };

  const handleNavigationClick = (view) => {
    setCurrentView(view);
    if (eventBus) {
      eventBus.emit('view-changed', { view });
    }
  };

  if (isLoading) {
    return (
      <div className="app-root">
        <div className="loading-message">
          <div className="loading-spinner"></div>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-root">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="app-root">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">CursorWeb</h1>
          
          {/* Navigation */}
          <nav className="header-navigation">
            <button
              onClick={() => handleNavigationClick('chat')}
              className={`mode-btn ${currentView === 'chat' ? 'active' : ''}`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => handleNavigationClick('ide-mirror')}
              className={`mode-btn ${currentView === 'ide-mirror' ? 'active' : ''}`}
            >
              🖥️ IDE Mirror
            </button>
            <button
              onClick={() => handleNavigationClick('preview')}
              className={`mode-btn ${currentView === 'preview' ? 'active' : ''}`}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => handleNavigationClick('code')}
              className={`mode-btn ${currentView === 'code' ? 'active' : ''}`}
            >
              📝 Code
            </button>
          </nav>
        </div>
        
        <div className="header-actions">
          <button
            onClick={() => eventBus?.emit('sidebar-toggle')}
            className="btn-icon"
            title="Toggle Sidebar"
          >
            📁
          </button>
          <button
            onClick={() => eventBus?.emit('right-panel-toggle')}
            className="btn-icon"
            title="Toggle Right Panel"
          >
            📋
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-layout">
        {/* Sidebar */}
        <SidebarComponent eventBus={eventBus} />
        
        {/* Main View */}
        <div className="main-content">
          {renderView()}
        </div>
        
        {/* Right Panel */}
        <RightPanelComponent eventBus={eventBus} />
      </main>
    </div>
  );
}

export default App; 