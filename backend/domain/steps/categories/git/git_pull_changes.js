/**
 * Git Pull Changes Step
 * Pulls changes from remote repository using real Git commands
 */

const StepBuilder = require('@steps/StepBuilder');
const Logger = require('@logging/Logger');
const logger = new Logger('GitPullChangesStep');

// Step configuration
const config = {
  name: 'GIT_PULL_CHANGES',
  type: 'git',
  description: 'Pulls changes from remote repository',
  category: 'git',
  version: '1.0.0',
  dependencies: ['terminalService'],
  settings: {
    timeout: 30000,
    remote: 'origin',
    rebase: false
  },
  validation: {
    required: ['projectPath'],
    optional: ['remote', 'branch', 'rebase']
  }
};

class GitPullChangesStep {
  constructor() {
    this.name = 'GIT_PULL_CHANGES';
    this.description = 'Pulls changes from remote repository';
    this.category = 'git';
    this.dependencies = ['terminalService'];
  }

  static getConfig() {
    return config;
  }

  async execute(context = {}) {
    const config = GitPullChangesStep.getConfig();
    const step = StepBuilder.build(config, context);
    
    try {
      logger.info(`🔧 Executing ${this.name}...`);
      
      // Validate context
      this.validateContext(context);
      
      const { projectPath, remote = 'origin', branch, rebase = false } = context;
      
      logger.info('Executing GIT_PULL_CHANGES step', {
        projectPath,
        remote,
        branch,
        rebase
      });

      // Get terminal service via dependency injection
      const terminalService = context.getService('terminalService');
      
      if (!terminalService) {
        throw new Error('TerminalService not available in context');
      }

      // Build pull command
      let pullCommand = 'git pull';
      if (rebase) {
        pullCommand += ' --rebase';
      }
      pullCommand += ` ${remote}`;
      if (branch) {
        pullCommand += ` ${branch}`;
      }

      // Execute git pull using real Git command
      const result = await terminalService.executeCommand(pullCommand, { cwd: projectPath });

      logger.info('GIT_PULL_CHANGES step completed successfully', {
        remote,
        branch,
        rebase,
        result: result.stdout
      });

      return {
        success: true,
        remote,
        branch,
        rebase,
        result: result.stdout,
        timestamp: new Date()
      };

    } catch (error) {
      logger.error('GIT_PULL_CHANGES step failed', {
        error: error.message,
        context
      });

      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  validateContext(context) {
    if (!context.projectPath) {
      throw new Error('Project path is required');
    }
  }
}

module.exports = { config, execute: GitPullChangesStep.prototype.execute.bind(new GitPullChangesStep()) }; 