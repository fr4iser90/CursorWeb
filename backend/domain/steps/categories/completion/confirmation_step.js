/**
 * Confirmation Step
 * Handles task confirmation and validation
 */

const StepBuilder = require('@steps/StepBuilder');
const Logger = require('@logging/Logger');
const AITextDetector = require('@services/chat/AITextDetector');
const logger = new Logger('confirmation_step');

// Step configuration
const config = {
  name: 'ConfirmationStep',
  type: 'completion',
  category: 'completion',
  description: 'Handle task confirmation and validation',
  version: '1.0.0',
  dependencies: ['TaskRepository', 'TerminalService'],
  settings: {
    includeAutoConfirmation: true,
    includeQualityCheck: true,
    timeout: 30000
  },
  validation: {
    required: ['projectId'],
    optional: ['workspacePath', 'taskId']
  }
};

class ConfirmationStep {
  constructor() {
    this.name = 'ConfirmationStep';
    this.description = 'Handle task confirmation and validation';
    this.category = 'completion';
    this.version = '1.0.0';
  }

  static getConfig() {
    return config;
  }

  async execute(context) {
    try {
      logger.info('Starting ConfirmationStep execution');
      
      // Get services from context (fallback to application context)
      const browserManager = context.browserManager || context.getService?.('browserManager') || global.application?.browserManager;
      const idePortManager = context.idePortManager || context.getService?.('idePortManager') || global.application?.idePortManager;
      
      if (!browserManager) {
        logger.warn('BrowserManager not available, using fallback confirmation');
        return {
          success: true,
          message: 'Confirmation skipped - BrowserManager not available',
          data: { confirmed: true, reason: 'service_unavailable' }
        };
      }

      const { taskId, maxAttempts = 3, timeout = 30000, autoContinueThreshold = 0.8 } = context;

      logger.info(`Starting AI confirmation process for task: ${taskId || 'unknown'}`);

      // Switch to active port first (like IDESendMessageStep)
      if (idePortManager) {
        const activePort = idePortManager.getActivePort();
        if (activePort) {
          await browserManager.switchToPort(activePort);
        }
      }

      // Initialize AITextDetector for proper response waiting
      const aiTextDetector = new AITextDetector();
      const page = await browserManager.getPage();
      
      if (!page) {
        throw new Error('No browser page available for AI response detection');
      }

      let attempts = 0;
      const maxAttemptsValue = maxAttempts || 3;
      
      while (attempts < maxAttemptsValue) {
        attempts++;
        logger.info(`AI confirmation attempt ${attempts}/${maxAttemptsValue}`);
        
        try {
          // Send confirmation question to IDE (like IDESendMessageStep)
          const confirmationQuestion = this.getConfirmationQuestion(attempts);
          const result = await browserManager.typeMessage(confirmationQuestion, true);
          
          if (!result) {
            throw new Error('Failed to send confirmation question to IDE');
          }
          
          // Wait for AI response using AITextDetector (proper waiting instead of fixed timeout)
          logger.info('⏳ Waiting for AI response...');
          const aiResponseResult = await aiTextDetector.waitForAIResponse(page, {
            timeout: timeout || 30000,
            checkInterval: 2000,
            requiredStableChecks: 3
          });
          
          if (!aiResponseResult.success) {
            logger.warn('AI response timeout or error, continuing with next attempt');
            continue;
          }
          
          // Analyze the AI response for completion confirmation
          const confirmationScore = this.analyzeConfirmationResponse(aiResponseResult.response);
          
          logger.info(`AI confirmation result:`, {
            question: confirmationQuestion,
            response: aiResponseResult.response.substring(0, 100) + '...',
            score: confirmationScore,
            threshold: autoContinueThreshold,
            completion: aiResponseResult.completion
          });
          
          if (confirmationScore >= autoContinueThreshold) {
            logger.info(`✅ Task confirmed by AI with confidence: ${confirmationScore.toFixed(2)}`);
            return {
              success: true,
              message: 'Task confirmed by AI',
              data: {
                confirmed: true,
                confidence: confirmationScore,
                question: confirmationQuestion,
                response: aiResponseResult.response,
                attempts: attempts,
                completion: aiResponseResult.completion
              }
            };
          }
          
          logger.info(`⚠️ AI response ambiguous (confidence: ${confirmationScore.toFixed(2)}), retrying...`);
          
        } catch (error) {
          logger.error(`AI confirmation attempt ${attempts} failed:`, error.message);
        }
        
        // Wait before next attempt
        if (attempts < maxAttemptsValue) {
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }
      
      logger.warn(`❌ AI confirmation failed after ${maxAttemptsValue} attempts`);
      return {
        success: false,
        message: 'AI confirmation failed',
        data: {
          confirmed: false,
          attempts: maxAttemptsValue
        }
      };

    } catch (error) {
      logger.error('Error in ConfirmationStep:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  analyzeConfirmationResponse(response) {
    if (!response || typeof response !== 'string') {
      return 0;
    }
    
    const lowerResponse = response.toLowerCase();
    
    // Check for completion status patterns
    const completionPatterns = [
      /completed/i,
      /finished/i,
      /done/i,
      /ready/i,
      /successful/i,
      /\[passed\]/i
    ];
    
    // Check for partial completion patterns
    const partialPatterns = [
      /partially completed/i,
      /almost done/i,
      /mostly complete/i,
      /in progress/i
    ];
    
    // Check for need human patterns
    const needHumanPatterns = [
      /need human/i,
      /requires human/i,
      /user input/i,
      /manual intervention/i,
      /\[failed\]/i
    ];
    
    // Calculate confidence score
    let score = 0;
    
    // Check for explicit completion
    if (completionPatterns.some(pattern => pattern.test(lowerResponse))) {
      score += 0.8;
    }
    
    // Check for partial completion
    if (partialPatterns.some(pattern => pattern.test(lowerResponse))) {
      score += 0.4;
    }
    
    // Check for need human
    if (needHumanPatterns.some(pattern => pattern.test(lowerResponse))) {
      score += 0.2;
    }
    
    // Check for test results
    const testMatch = lowerResponse.match(/\[(passed|failed)\]\s*(\d+)%/i);
    if (testMatch) {
      const testStatus = testMatch[1];
      const testPercentage = parseInt(testMatch[2]);
      
      if (testStatus === 'passed' && testPercentage >= 80) {
        score += 0.3;
      } else if (testStatus === 'failed') {
        score -= 0.2;
      }
    }
    
    // Check for response length and quality
    if (response.length > 50) {
      score += 0.1;
    }
    
    // Normalize score to 0-1 range
    return Math.min(Math.max(score, 0), 1);
  }

  getConfirmationQuestion(attempt) {
    const questions = [
      'Check your status against the task and respond with your status: completed/partially completed/need human. Also include test results: [PASSED] or [FAILED] with percentage.',
      'Have you completed the task? Please respond with: completed/partially completed/need human. Also include test results: [PASSED] or [FAILED] with percentage.',
      'Task status check: Are you finished? Respond with: completed/partially completed/need human. Also include test results: [PASSED] or [FAILED] with percentage.'
    ];
    
    return questions[attempt % questions.length];
  }

  validateContext(context) {
    if (!context.projectId) {
      throw new Error('Project ID is required');
    }
  }
}

// Create instance for execution
const stepInstance = new ConfirmationStep();

// Export in StepRegistry format
module.exports = {
  config,
  execute: async (context) => await stepInstance.execute(context)
};
