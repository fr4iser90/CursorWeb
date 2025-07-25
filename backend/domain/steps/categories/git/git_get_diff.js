/**
 * Git Get Diff Step
 * Gets Git diff using real Git commands
 */

const StepBuilder = require('@steps/StepBuilder');
const Logger = require('@logging/Logger');
const logger = new Logger('GitGetDiffStep');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

// Step configuration
const config = {
  name: 'GitGetDiffStep',
  type: 'git',
  description: 'Gets Git diff',
  category: 'git',
  version: '1.0.0',
  dependencies: ['terminalService'],
  settings: {
    timeout: 30000,
    staged: false
  },
  validation: {
    required: ['projectPath'],
    optional: ['staged', 'file', 'commit1', 'commit2']
  }
};

class GitGetDiffStep {
  constructor() {
    this.name = 'GitGetDiffStep';
    this.description = 'Gets Git diff';
    this.category = 'git';
    this.dependencies = ['terminalService'];
  }

  static getConfig() {
    return config;
  }

  async execute(context = {}) {
    const config = GitGetDiffStep.getConfig();
    const step = StepBuilder.build(config, context);
    
    try {
      logger.info(`🔧 Executing ${this.name}...`);
      
      // Validate context
      this.validateContext(context);
      
      const { projectPath, staged = false, file, commit1, commit2 } = context;
      
      logger.info('Executing GIT_GET_DIFF step', {
        projectPath,
        staged,
        file,
        commit1,
        commit2
      });

      // Build diff command
      let diffCommand = 'git diff';
      if (staged) {
        diffCommand += ' --staged';
      }
      if (commit1 && commit2) {
        diffCommand += ` ${commit1}..${commit2}`;
      } else if (commit1) {
        diffCommand += ` ${commit1}`;
      }
      if (file) {
        diffCommand += ` -- ${file}`;
      }

      // Execute git diff using execAsync (like legacy implementation)
      const result = await execAsync(diffCommand, { cwd: projectPath });

      logger.info('GIT_GET_DIFF step completed successfully', {
        staged,
        file,
        commit1,
        commit2,
        diffLength: result.stdout.length
      });

      return {
        success: true,
        staged,
        file,
        commit1,
        commit2,
        diff: result.stdout,
        result: result.stdout,
        timestamp: new Date()
      };

    } catch (error) {
      logger.error('GIT_GET_DIFF step failed', {
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

// Create instance for execution
const stepInstance = new GitGetDiffStep();

// Export in StepRegistry format
module.exports = {
  config,
  execute: async (context) => await stepInstance.execute(context)
}; 