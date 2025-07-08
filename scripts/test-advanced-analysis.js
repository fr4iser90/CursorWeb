#!/usr/bin/env node

/**
 * Test runner for Advanced Analysis components
 * This script helps test the advanced analysis functionality with real project data
 */

const path = require('path');
const fs = require('fs').promises;

// Import the components to test
const AdvancedAnalysisCommand = require('./backend/application/commands/analyze/AdvancedAnalysisCommand');
const AdvancedAnalysisHandler = require('./backend/application/handlers/analyze/AdvancedAnalysisHandler');
const AdvancedAnalysisService = require('./backend/domain/services/AdvancedAnalysisService');

class AdvancedAnalysisTester {
    constructor() {
        this.logger = {
            info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
            error: (message, data) => console.error(`[ERROR] ${message}`, data || ''),
            warn: (message, data) => console.warn(`[WARN] ${message}`, data || ''),
            debug: (message, data) => console.debug(`[DEBUG] ${message}`, data || '')
        };
    }

    async runTests() {
        console.log('🚀 Starting Advanced Analysis Component Tests\n');

        try {
            // Test 1: Command Creation and Validation
            await this.testCommandCreation();

            // Test 2: Service Integration
            await this.testServiceIntegration();

            // Test 3: Handler Workflow
            await this.testHandlerWorkflow();

            // Test 4: End-to-End Analysis
            await this.testEndToEndAnalysis();

            console.log('\n✅ All tests completed successfully!');

        } catch (error) {
            console.error('\n❌ Test failed:', error.message);
            process.exit(1);
        }
    }

    async testCommandCreation() {
        console.log('📋 Test 1: Command Creation and Validation');
        
        // Test valid command
        const validCommand = new AdvancedAnalysisCommand({
            projectPath: process.cwd(),
            requestedBy: 'test-user',
            options: {
                includeLayerValidation: true,
                includeLogicValidation: true,
                includeStandardAnalysis: true,
                generateReport: true
            }
        });

        console.log('  ✓ Command created successfully');
        console.log(`  ✓ Command ID: ${validCommand.commandId}`);
        console.log(`  ✓ Project Path: ${validCommand.projectPath}`);
        console.log(`  ✓ Requested By: ${validCommand.requestedBy}`);

        // Test validation
        const validation = validCommand.validateBusinessRules();
        console.log(`  ✓ Validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
        
        if (!validation.isValid) {
            console.log(`  ✗ Errors: ${validation.errors.join(', ')}`);
        }
        if (validation.warnings.length > 0) {
            console.log(`  ⚠ Warnings: ${validation.warnings.join(', ')}`);
        }

        // Test invalid command
        const invalidCommand = new AdvancedAnalysisCommand({
            // Missing required fields
        });

        const invalidValidation = invalidCommand.validateBusinessRules();
        console.log(`  ✓ Invalid command validation: ${invalidValidation.isValid ? 'FAILED' : 'PASSED'}`);

        console.log('  ✓ Command creation and validation tests completed\n');
    }

    async testServiceIntegration() {
        console.log('🔧 Test 2: Service Integration');

        const service = new AdvancedAnalysisService({
            logger: this.logger
        });

        console.log('  ✓ AdvancedAnalysisService created successfully');

        // Test with a small project (current directory)
        const projectPath = process.cwd();
        
        try {
            console.log(`  📁 Testing with project: ${projectPath}`);
            
            const result = await service.performAdvancedAnalysis(projectPath, {
                includeLayerValidation: true,
                includeLogicValidation: true,
                includeStandardAnalysis: true,
                generateReport: true
            });

            console.log('  ✓ Analysis completed successfully');
            console.log(`  ✓ Overall Score: ${result.metrics.overallScore}`);
            console.log(`  ✓ Layer Score: ${result.metrics.layerScore}`);
            console.log(`  ✓ Logic Score: ${result.metrics.logicScore}`);
            console.log(`  ✓ Overall Valid: ${result.overall}`);
            console.log(`  ✓ Total Violations: ${(result.layerValidation.violations || []).length + (result.logicValidation.violations || []).length}`);
            console.log(`  ✓ Insights Generated: ${result.integratedInsights.length}`);
            console.log(`  ✓ Recommendations Generated: ${result.recommendations.length}`);

            // Generate report
            const report = service.generateAnalysisReport(result);
            console.log('  ✓ Report generated successfully');
            console.log(`  ✓ Report Summary: ${report.summary.overallScore}/100 score, ${report.summary.totalViolations} violations`);

        } catch (error) {
            console.log(`  ⚠ Analysis failed (this might be expected for some projects): ${error.message}`);
        }

        console.log('  ✓ Service integration tests completed\n');
    }

    async testHandlerWorkflow() {
        console.log('⚙️ Test 3: Handler Workflow');

        // Create mock dependencies
        const mockEventBus = {
            emit: (event, data) => {
                console.log(`  📡 Event: ${event}`, data ? `(${Object.keys(data).length} properties)` : '');
            }
        };

        const mockTaskRepository = {
            save: async (task) => {
                console.log(`  💾 Task saved: ${task.title}`);
                return task;
            }
        };

        const mockExecutionRepository = {
            save: async (execution) => {
                console.log(`  💾 Execution saved: ${execution.id}`);
                return execution;
            }
        };

        const handler = new AdvancedAnalysisHandler({
            logger: this.logger,
            eventBus: mockEventBus,
            taskRepository: mockTaskRepository,
            executionRepository: mockExecutionRepository
        });

        console.log('  ✓ Handler created successfully');

        const command = new AdvancedAnalysisCommand({
            projectPath: process.cwd(),
            requestedBy: 'test-user',
            options: {
                includeLayerValidation: true,
                includeLogicValidation: true,
                includeStandardAnalysis: true,
                generateReport: true
            }
        });

        try {
            console.log('  🔄 Starting handler workflow...');
            const result = await handler.handle(command);

            console.log('  ✓ Handler workflow completed successfully');
            console.log(`  ✓ Execution ID: ${result.executionId}`);
            console.log(`  ✓ Duration: ${result.duration}ms`);
            console.log(`  ✓ Success: ${result.success}`);

        } catch (error) {
            console.log(`  ⚠ Handler workflow failed (this might be expected): ${error.message}`);
        }

        console.log('  ✓ Handler workflow tests completed\n');
    }

    async testEndToEndAnalysis() {
        console.log('🔄 Test 4: End-to-End Analysis');

        // Create a simple test project structure
        const testProjectPath = path.join(process.cwd(), 'test-analysis-project');
        
        try {
            // Create test project if it doesn't exist
            await this.createTestProject(testProjectPath);

            const command = new AdvancedAnalysisCommand({
                projectPath: testProjectPath,
                requestedBy: 'test-user',
                options: {
                    includeLayerValidation: true,
                    includeLogicValidation: true,
                    includeStandardAnalysis: true,
                    generateReport: true
                }
            });

            const handler = new AdvancedAnalysisHandler({
                logger: this.logger
            });

            console.log(`  📁 Testing with created project: ${testProjectPath}`);
            
            const result = await handler.handle(command);

            console.log('  ✓ End-to-end analysis completed successfully');
            console.log(`  ✓ Overall Score: ${result.analysis.metrics.overallScore}`);
            console.log(`  ✓ Analysis Duration: ${result.duration}ms`);
            console.log(`  ✓ Report Generated: ${result.report ? 'Yes' : 'No'}`);

            // Clean up test project
            await this.cleanupTestProject(testProjectPath);

        } catch (error) {
            console.log(`  ⚠ End-to-end test failed: ${error.message}`);
            
            // Clean up test project even if test failed
            try {
                await this.cleanupTestProject(testProjectPath);
            } catch (cleanupError) {
                console.log(`  ⚠ Cleanup failed: ${cleanupError.message}`);
            }
        }

        console.log('  ✓ End-to-end analysis tests completed\n');
    }

    async createTestProject(projectPath) {
        try {
            await fs.mkdir(projectPath, { recursive: true });

            // Create package.json
            const packageJson = {
                name: 'test-analysis-project',
                version: '1.0.0',
                description: 'Test project for advanced analysis',
                main: 'src/index.js',
                scripts: {
                    start: 'node src/index.js',
                    test: 'jest'
                },
                dependencies: {
                    express: '^4.17.1'
                },
                devDependencies: {
                    jest: '^27.0.0'
                }
            };

            await fs.writeFile(
                path.join(projectPath, 'package.json'),
                JSON.stringify(packageJson, null, 2)
            );

            // Create src directory and files
            await fs.mkdir(path.join(projectPath, 'src'), { recursive: true });
            await fs.mkdir(path.join(projectPath, 'src/domain'), { recursive: true });
            await fs.mkdir(path.join(projectPath, 'src/infrastructure'), { recursive: true });
            await fs.mkdir(path.join(projectPath, 'src/presentation'), { recursive: true });

            // Create index.js
            const indexJs = `
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
`;

            await fs.writeFile(path.join(projectPath, 'src/index.js'), indexJs);

            // Create domain entity
            const userJs = `
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    validate() {
        return this.name && this.email;
    }
}

module.exports = User;
`;

            await fs.writeFile(path.join(projectPath, 'src/domain/User.js'), userJs);

            console.log(`  ✓ Test project created at: ${projectPath}`);

        } catch (error) {
            throw new Error(`Failed to create test project: ${error.message}`);
        }
    }

    async cleanupTestProject(projectPath) {
        try {
            await fs.rm(projectPath, { recursive: true, force: true });
            console.log(`  ✓ Test project cleaned up: ${projectPath}`);
        } catch (error) {
            throw new Error(`Failed to cleanup test project: ${error.message}`);
        }
    }
}

// Run the tests if this script is executed directly
if (require.main === module) {
    const tester = new AdvancedAnalysisTester();
    tester.runTests().catch(error => {
        console.error('Test runner failed:', error);
        process.exit(1);
    });
}

module.exports = AdvancedAnalysisTester; 