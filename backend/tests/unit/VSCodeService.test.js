const vscodeIDEService = require('@services/vscodeIDEService');
const VSCodeExtensionManager = require('@external/VSCodeExtensionManager');

// Mock dependencies
jest.mock('../../infrastructure/external/VSCodeExtensionManager');

// Mock fs module
jest.mock('fs', () => ({
  writeFileSync: jest.fn()
}));

describe('vscodeIDEService', () => {
  let vscodeIDEService;
  let mockBrowserManager;
  let mockIDEManager;
  let mockEventBus;
  let mockFs;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Get mocked fs module
    mockFs = require('fs');

    // Create mock objects
    mockBrowserManager = {
      getPage: jest.fn(),
      getCurrentPort: jest.fn(),
      switchToPort: jest.fn()
    };

    mockIDEManager = {
      getActivePort: jest.fn(),
      getActiveIDE: jest.fn(),
      switchToIDE: jest.fn(),
      startNewIDE: jest.fn(),
      stopIDE: jest.fn(),
      getAvailableIDEs: jest.fn()
    };

    mockEventBus = {
      subscribe: jest.fn(),
      publish: jest.fn()
    };

    // Create vscodeIDEService instance
    vscodeIDEService = new vscodeIDEService(mockBrowserManager, mockIDEManager, mockEventBus);
  });

  describe('constructor', () => {
    it('should initialize with dependencies', () => {
      expect(vscodeIDEService.browserManager).toBe(mockBrowserManager);
      expect(vscodeIDEService.ideManager).toBe(mockIDEManager);
      expect(vscodeIDEService.eventBus).toBe(mockEventBus);
      expect(vscodeIDEService.extensionManager).toBeInstanceOf(VSCodeExtensionManager);
    });

    it('should subscribe to IDE change events when eventBus is provided', () => {
      expect(mockEventBus.subscribe).toHaveBeenCalledWith('activeIDEChanged', expect.any(Function));
    });
  });

  describe('sendMessage', () => {
    it('should send message successfully', async () => {
      const message = 'Test message';
      const mockPage = { evaluate: jest.fn() };
      
      mockBrowserManager.getPage.mockResolvedValue(mockPage);
      mockIDEManager.getActivePort.mockReturnValue(9232);
      mockBrowserManager.getCurrentPort.mockReturnValue(9232);
      
      // Mock the chat message handler
      vscodeIDEService.chatMessageHandler = {
        sendMessage: jest.fn().mockResolvedValue({ success: true })
      };

      const result = await vscodeIDEService.sendMessage(message);

      expect(vscodeIDEService.chatMessageHandler.sendMessage).toHaveBeenCalledWith(message, {});
      expect(result).toEqual({ success: true });
    });

    it('should switch browser port when active port differs', async () => {
      const message = 'Test message';
      const mockPage = { evaluate: jest.fn() };
      
      mockBrowserManager.getPage.mockResolvedValue(mockPage);
      mockIDEManager.getActivePort.mockReturnValue(9232);
      mockBrowserManager.getCurrentPort.mockReturnValue(9222);
      
      vscodeIDEService.chatMessageHandler = {
        sendMessage: jest.fn().mockResolvedValue({ success: true })
      };

      await vscodeIDEService.sendMessage(message);

      expect(mockBrowserManager.switchToPort).toHaveBeenCalledWith(9232);
    });
  });

  describe('postToVSCode', () => {
    it('should post message to VSCode successfully', async () => {
      const prompt = 'Test prompt';
      
      vscodeIDEService.chatMessageHandler = {
        sendMessage: jest.fn().mockResolvedValue({ success: true })
      };

      const result = await vscodeIDEService.postToVSCode(prompt);

      expect(vscodeIDEService.chatMessageHandler.sendMessage).toHaveBeenCalledWith(prompt);
      expect(result).toEqual({ success: true });
    });

    it('should handle errors when posting to VSCode', async () => {
      const prompt = 'Test prompt';
      const error = new Error('Failed to send message');
      
      vscodeIDEService.chatMessageHandler = {
        sendMessage: jest.fn().mockRejectedValue(error)
      };

      await expect(vscodeIDEService.postToVSCode(prompt)).rejects.toThrow('Failed to send message');
    });
  });

  describe('startNewVSCode', () => {
    it('should start new VSCode instance', async () => {
      const workspacePath = '/test/workspace';
      const expectedResult = { port: 9232, status: 'starting', ideType: 'vscode' };
      
      mockIDEManager.startNewIDE.mockResolvedValue(expectedResult);

      const result = await vscodeIDEService.startNewVSCode(workspacePath);

      expect(mockIDEManager.startNewIDE).toHaveBeenCalledWith(workspacePath, 'vscode');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getExtensions', () => {
    it('should get extensions for active IDE', async () => {
      const mockExtensions = [
        { id: 'github.copilot', name: 'GitHub Copilot' }
      ];
      
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232 });
      vscodeIDEService.extensionManager.getExtensions = jest.fn().mockResolvedValue(mockExtensions);

      const result = await vscodeIDEService.getExtensions();

      expect(vscodeIDEService.extensionManager.getExtensions).toHaveBeenCalledWith(9232);
      expect(result).toEqual(mockExtensions);
    });

    it('should get extensions for specific port', async () => {
      const mockExtensions = [
        { id: 'github.copilot', name: 'GitHub Copilot' }
      ];
      
      vscodeIDEService.extensionManager.getExtensions = jest.fn().mockResolvedValue(mockExtensions);

      const result = await vscodeIDEService.getExtensions(9232);

      expect(vscodeIDEService.extensionManager.getExtensions).toHaveBeenCalledWith(9232);
      expect(result).toEqual(mockExtensions);
    });
  });

  describe('getChatExtensions', () => {
    it('should get chat extensions', async () => {
      const mockExtensions = [
        { id: 'github.copilot', name: 'GitHub Copilot' }
      ];
      
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232 });
      vscodeIDEService.extensionManager.getChatExtensions = jest.fn().mockResolvedValue(mockExtensions);

      const result = await vscodeIDEService.getChatExtensions();

      expect(vscodeIDEService.extensionManager.getChatExtensions).toHaveBeenCalledWith(9232);
      expect(result).toEqual(mockExtensions);
    });
  });

  describe('getAIExtensions', () => {
    it('should get AI extensions', async () => {
      const mockExtensions = [
        { id: 'github.copilot', name: 'GitHub Copilot' }
      ];
      
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232 });
      vscodeIDEService.extensionManager.getAIExtensions = jest.fn().mockResolvedValue(mockExtensions);

      const result = await vscodeIDEService.getAIExtensions();

      expect(vscodeIDEService.extensionManager.getAIExtensions).toHaveBeenCalledWith(9232);
      expect(result).toEqual(mockExtensions);
    });
  });

  describe('hasExtension', () => {
    it('should check if extension exists', async () => {
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232 });
      vscodeIDEService.extensionManager.hasExtension = jest.fn().mockResolvedValue(true);

      const result = await vscodeIDEService.hasExtension('github.copilot');

      expect(vscodeIDEService.extensionManager.hasExtension).toHaveBeenCalledWith(9232, 'github.copilot');
      expect(result).toBe(true);
    });
  });

  describe('detectExtensions', () => {
    it('should detect extensions', async () => {
      const mockResult = {
        port: 9232,
        extensions: [{ id: 'github.copilot', name: 'GitHub Copilot' }],
        detected: true
      };
      
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232 });
      vscodeIDEService.extensionManager.detectExtensions = jest.fn().mockResolvedValue(mockResult);

      const result = await vscodeIDEService.detectExtensions();

      expect(vscodeIDEService.extensionManager.detectExtensions).toHaveBeenCalledWith(9232);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getConnectionStatus', () => {
    it('should get connection status successfully', async () => {
      const userId = 'test-user';
      const mockPage = { evaluate: jest.fn() };
      
      mockBrowserManager.getPage.mockResolvedValue(mockPage);
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232, workspacePath: '/test' });

      const result = await vscodeIDEService.getConnectionStatus(userId);

      expect(result).toHaveProperty('connected');
      expect(result).toHaveProperty('activeIDE');
      expect(result).toHaveProperty('userId', userId);
      expect(result).toHaveProperty('timestamp');
    });

    it('should handle connection errors', async () => {
      const userId = 'test-user';
      
      mockBrowserManager.getPage.mockRejectedValue(new Error('Connection failed'));

      const result = await vscodeIDEService.getConnectionStatus(userId);

      expect(result.connected).toBe(false);
      expect(result).toHaveProperty('error');
      expect(result).toHaveProperty('userId', userId);
    });
  });

  describe('sendTaskToVSCode', () => {
    it('should send task to VSCode successfully', async () => {
      const task = {
        id: 'task-123',
        title: 'Test Task',
        description: 'Test Description',
        type: 'feature',
        priority: 'high',
        status: 'pending',
        createdAt: new Date(),
        projectId: 'project-123'
      };
      
      const workspacePath = '/test/workspace';
      const mockPage = { evaluate: jest.fn() };
      
      mockBrowserManager.getPage.mockResolvedValue(mockPage);
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232, workspacePath });

      const result = await vscodeIDEService.sendTaskToVSCode(task, workspacePath);

      expect(result.success).toBe(true);
      expect(result.taskId).toBe('task-123');
      expect(result).toHaveProperty('filePath');
      expect(result.message).toBe('Task sent to VSCode IDE successfully');
      
      // Verify that writeFileSync was called
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        expect.stringContaining('task_task-123.md'),
        expect.stringContaining('Task: Test Task')
      );
    });

    it('should throw error when no workspace path available', async () => {
      const task = { id: 'task-123', title: 'Test Task' };
      
      mockIDEManager.getActiveIDE.mockResolvedValue(null);

      await expect(vscodeIDEService.sendTaskToVSCode(task)).rejects.toThrow('No workspace path available for VSCode IDE');
    });
  });

  describe('sendAutoModeTasksToVSCode', () => {
    it('should send auto mode tasks to VSCode successfully', async () => {
      const tasks = [
        { id: 'task-1', title: 'Task 1', description: 'Description 1' },
        { id: 'task-2', title: 'Task 2', description: 'Description 2' }
      ];
      
      const projectAnalysis = {
        projectType: 'React',
        complexity: 'medium',
        projectPath: '/test/project',
        timestamp: new Date()
      };
      
      const workspacePath = '/test/workspace';
      const mockPage = { evaluate: jest.fn() };
      
      mockBrowserManager.getPage.mockResolvedValue(mockPage);
      mockIDEManager.getActiveIDE.mockResolvedValue({ port: 9232, workspacePath });

      const result = await vscodeIDEService.sendAutoModeTasksToVSCode(tasks, projectAnalysis, workspacePath);

      expect(result.success).toBe(true);
      expect(result.taskCount).toBe(2);
      expect(result).toHaveProperty('filePath');
      expect(result.message).toBe('Auto mode tasks sent to VSCode IDE successfully');
    });
  });

  describe('isConnected', () => {
    it('should return true when connected', async () => {
      const mockPage = { evaluate: jest.fn() };
      mockBrowserManager.getPage.mockResolvedValue(mockPage);

      const result = await vscodeIDEService.isConnected();

      expect(result).toBe(true);
    });

    it('should return false when not connected', async () => {
      mockBrowserManager.getPage.mockRejectedValue(new Error('Not connected'));

      const result = await vscodeIDEService.isConnected();

      expect(result).toBe(false);
    });
  });
}); 