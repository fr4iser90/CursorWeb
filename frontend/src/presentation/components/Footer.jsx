import React, { useState, useEffect } from 'react';

function Footer({ eventBus, activePort, version = 'dev', message = 'Welcome to PIDEA!' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [gitBranch, setGitBranch] = useState('');
  const [gitStatus, setGitStatus] = useState(null);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check online status
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  // Fetch git status when activePort changes
  useEffect(() => {
    const fetchGitStatus = async () => {
      if (!activePort) {
        setGitBranch('');
        setGitStatus(null);
        return;
      }

      try {
        // Get IDE info
        const ideRes = await fetch('/api/ide/available');
        const ides = await ideRes.json();
        const activeIDE = ides.data?.find(ide => ide.port === activePort);
        
        if (activeIDE && activeIDE.workspacePath) {
          // Get project ID from workspace path
          const pathParts = activeIDE.workspacePath.split('/');
          const projectName = pathParts[pathParts.length - 1];
          const projectId = projectName.toLowerCase().replace(/[^a-z0-9]/g, '');
          
          // Get git status
          const gitRes = await fetch(`/api/projects/${projectId}/git/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectPath: activeIDE.workspacePath })
          });
          const gitData = await gitRes.json();
          
          setGitStatus(gitData.data?.status || null);
          setGitBranch(gitData.data?.currentBranch || '');
        }
      } catch (error) {
        setGitBranch('');
        setGitStatus(null);
      }
    };

    fetchGitStatus();
  }, [activePort]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <footer className="app-footer">
      <div className="footer-status">
        <span className="footer-git" title={gitBranch ? `Branch: ${gitBranch}` : 'No Git repository detected'}>
          <span className="git-icon">Git-Branch:</span>
          {gitBranch ? (
            <span className="git-branch">{gitBranch}</span>
          ) : (
            <span className="git-branch git-unknown">No Repo</span>
          )}
          {gitStatus?.dirty && <span className="git-dirty" title="Uncommitted changes">*</span>}
        </span>
        <span className="status-item">Port: <span className="status-value">{activePort ? `:${activePort}` : 'N/A'}</span></span>
        <span className="status-item">Status: <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>{isOnline ? '🟢 Online' : '🔴 Offline'}</span></span>
        <span className="status-item">Time: <span className="status-value">{formatTime(currentTime)}</span></span>
        <span className="status-item">Version: <span className="status-value">v{version}</span></span>
      </div>
      
      <div className="footer-marquee">
        <div className="marquee-container">
          <div className="marquee-content">
            {message}
          </div>
        </div>
      </div>
      <div className="footer-images" style={{ display: 'flex', gap: '10px', marginLeft: '10px' }}>
        <img src="/big.png" alt="Big Icon" style={{ height: '24px' }} />
      </div>
    </footer>
  );
}

export default Footer;
