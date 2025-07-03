import useAuthStore from '@infrastructure/stores/AuthStore.jsx';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
    this.eventListeners = new Map();
    this.connectionPromise = null;
  }

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }

    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${location.host}/ws`;
        
        console.log('🔌 WebSocketService: Connecting to:', wsUrl);
        
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('✅ WebSocketService: Connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          
          // Send authentication token
          const { token } = useAuthStore.getState();
          if (token) {
            this.send({
              type: 'authenticate',
              token: token
            });
          }
          
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('❌ WebSocketService: Failed to parse message:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('🔌 WebSocketService: Disconnected:', event.code, event.reason);
          this.isConnected = false;
          this.connectionPromise = null;
          
          // Handle authentication failure
          if (event.code === 1008) {
            console.log('🔐 WebSocketService: Authentication failed, logging out');
            const { logout } = useAuthStore.getState();
            logout();
            return;
          }
          
          // Attempt reconnection
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 WebSocketService: Reconnecting (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            setTimeout(() => this.connect(), this.reconnectDelay);
          } else {
            console.error('❌ WebSocketService: Max reconnection attempts reached');
          }
        };

        this.ws.onerror = (error) => {
          console.error('❌ WebSocketService: Error:', error);
          this.connectionPromise = null;
          reject(error);
        };

      } catch (error) {
        console.error('❌ WebSocketService: Failed to create WebSocket:', error);
        this.connectionPromise = null;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'User initiated disconnect');
      this.ws = null;
    }
    this.isConnected = false;
    this.connectionPromise = null;
    this.reconnectAttempts = 0;
  }

  send(data) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('⚠️ WebSocketService: Cannot send message, not connected');
      return false;
    }

    try {
      this.ws.send(JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('❌ WebSocketService: Failed to send message:', error);
      return false;
    }
  }

  handleMessage(message) {
    const { event, data, timestamp } = message;
    
    console.log('📨 WebSocketService: Received message:', event, data);
    
    // Emit to registered listeners
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data, timestamp);
        } catch (error) {
          console.error('❌ WebSocketService: Error in event listener:', error);
        }
      });
    }
  }

  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).delete(callback);
    }
  }

  // Convenience methods for common events
  onChatUpdate(callback) {
    this.on('chatUpdate', callback);
  }

  onIDEStateChange(callback) {
    this.on('ideStateChange', callback);
  }

  onUserAppUrl(callback) {
    this.on('userAppUrl', callback);
  }

  onActiveIDEChanged(callback) {
    this.on('activeIDEChanged', callback);
  }

  // Send specific message types
  sendChatMessage(message, sessionId) {
    return this.send({
      type: 'chat-message',
      message,
      sessionId
    });
  }

  sendIDEConnect() {
    return this.send({
      type: 'connect-ide'
    });
  }

  sendIDERefresh() {
    return this.send({
      type: 'refresh-ide'
    });
  }

  sendIDESwitch(port) {
    return this.send({
      type: 'switch-ide',
      payload: { port: parseInt(port) }
    });
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService; 