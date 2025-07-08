# Test Coverage Report

**Generated:** 7/9/2025, 12:38:05 AM

## 📊 Coverage Summary

**Overall Coverage:** 13%

**Files Analyzed:** 304
**Files with ≥80% Coverage:** 18

## 📁 File Coverage Details

| File | Functions | Lines | Branches | Average | Status |
|------|-----------|-------|----------|---------|--------|
| `Application.js` | 10% | 80% | 29% | 40% | ❌ |
| `jest.config.js` | 100% | 0% | 0% | 33% | ❌ |
| `server.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/commands/CreateTaskCommand.js` | 50% | 52% | 65% | 56% | ⚠️ |
| `application/commands/PortStreamingCommand.js` | 0% | 3% | 0% | 1% | ❌ |
| `application/commands/ProcessTodoListCommand.js` | 0% | 4% | 0% | 1% | ❌ |
| `application/commands/SendMessageCommand.js` | 0% | 13% | 0% | 4% | ❌ |
| `application/commands/StartStreamingCommand.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/commands/StopStreamingCommand.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/commands/UpdateTestStatusCommand.js` | 50% | 79% | 64% | 64% | ⚠️ |
| `application/commands/analyze/AdvancedAnalysisCommand.js` | 100% | 100% | 90% | 97% | ✅ |
| `application/commands/analyze/AnalyzeArchitectureCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/analyze/AnalyzeCodeQualityCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/analyze/AnalyzeDependenciesCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/analyze/AnalyzeRepoStructureCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/analyze/AnalyzeTechStackCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/generate/GenerateConfigsCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/generate/GenerateDocumentationCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/generate/GenerateScriptsCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/generate/GenerateTestsCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/refactor/CleanDependenciesCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/refactor/OrganizeModulesCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/refactor/RestructureArchitectureCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/refactor/SplitLargeFilesCommand.js` | 0% | 2% | 0% | 1% | ❌ |
| `application/commands/vibecoder/VibeCoderAnalyzeCommand.js` | 0% | 1% | 0% | 0% | ❌ |
| `application/commands/vibecoder/VibeCoderAutoRefactorCommand.js` | 0% | 33% | 100% | 44% | ❌ |
| `application/commands/vibecoder/VibeCoderGenerateCommand.js` | 0% | 5% | 0% | 2% | ❌ |
| `application/commands/vibecoder/VibeCoderModeCommand.js` | 0% | 1% | 0% | 0% | ❌ |
| `application/commands/vibecoder/VibeCoderRefactorCommand.js` | 0% | 1% | 0% | 0% | ❌ |
| `application/handlers/CreateTaskHandler.js` | 33% | 34% | 12% | 26% | ❌ |
| `application/handlers/GetChatHistoryHandler.js` | 6% | 7% | 0% | 4% | ❌ |
| `application/handlers/PortStreamingHandler.js` | 11% | 8% | 0% | 6% | ❌ |
| `application/handlers/ProcessTodoListHandler.js` | 20% | 23% | 4% | 16% | ❌ |
| `application/handlers/SendMessageHandler.js` | 43% | 16% | 3% | 21% | ❌ |
| `application/handlers/StartStreamingHandler.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/StopStreamingHandler.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/UpdateTestStatusHandler.js` | 50% | 32% | 22% | 35% | ❌ |
| `application/handlers/analyze/AdvancedAnalysisHandler.js` | 93% | 88% | 89% | 90% | ✅ |
| `application/handlers/analyze/AnalyzeArchitectureHandler.js` | 8% | 8% | 1% | 6% | ❌ |
| `application/handlers/analyze/AnalyzeCodeQualityHandler.js` | 9% | 7% | 1% | 6% | ❌ |
| `application/handlers/analyze/AnalyzeDependenciesHandler.js` | 10% | 9% | 1% | 7% | ❌ |
| `application/handlers/analyze/AnalyzeRepoStructureHandler.js` | 10% | 9% | 1% | 7% | ❌ |
| `application/handlers/analyze/AnalyzeTechStackHandler.js` | 12% | 10% | 1% | 8% | ❌ |
| `application/handlers/generate/GenerateConfigsHandler.js` | 2% | 3% | 2% | 2% | ❌ |
| `application/handlers/generate/GenerateDocumentationHandler.js` | 2% | 3% | 2% | 2% | ❌ |
| `application/handlers/generate/GenerateScriptHandler.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/GenerateScriptsHandler.js` | 2% | 3% | 3% | 3% | ❌ |
| `application/handlers/generate/GenerateTestsHandler.js` | 2% | 3% | 2% | 2% | ❌ |
| `application/handlers/generate/index.js` | 100% | 0% | 100% | 67% | ⚠️ |
| `application/handlers/generate/constants/ScriptGenerationConstants.js` | 0% | 0% | 100% | 33% | ❌ |
| `application/handlers/generate/services/EventPublishingService.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/services/ProjectAnalysisService.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/services/ScriptGenerationService.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/services/ScriptProcessingService.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/services/TaskManagementService.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/generate/validation/ScriptGenerationValidator.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/handlers/refactor/CleanDependenciesHandler.js` | 3% | 3% | 2% | 3% | ❌ |
| `application/handlers/refactor/OrganizeModulesHandler.js` | 2% | 3% | 3% | 3% | ❌ |
| `application/handlers/refactor/RestructureArchitectureHandler.js` | 2% | 3% | 3% | 3% | ❌ |
| `application/handlers/refactor/SplitLargeFilesHandler.js` | 17% | 7% | 10% | 11% | ❌ |
| `application/handlers/vibecoder/VibeCoderAnalyzeHandler.js` | 9% | 7% | 1% | 6% | ❌ |
| `application/handlers/vibecoder/VibeCoderAutoRefactorHandler.js` | 4% | 8% | 0% | 4% | ❌ |
| `application/handlers/vibecoder/VibeCoderGenerateHandler.js` | 4% | 6% | 6% | 5% | ❌ |
| `application/handlers/vibecoder/VibeCoderModeHandler.js` | 33% | 43% | 17% | 31% | ❌ |
| `application/handlers/vibecoder/VibeCoderRefactorHandler.js` | 4% | 7% | 10% | 7% | ❌ |
| `application/handlers/vibecoder/constants/analysis-constants.js` | 100% | 100% | 100% | 100% | ✅ |
| `application/handlers/vibecoder/constants/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `application/handlers/vibecoder/services/analysis-service.js` | 6% | 10% | 3% | 6% | ❌ |
| `application/handlers/vibecoder/services/execution-service.js` | 7% | 4% | 2% | 4% | ❌ |
| `application/handlers/vibecoder/services/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `application/handlers/vibecoder/services/metrics-service.js` | 17% | 11% | 5% | 11% | ❌ |
| `application/handlers/vibecoder/services/output-service.js` | 33% | 11% | 1% | 15% | ❌ |
| `application/handlers/vibecoder/services/recommendation-service.js` | 14% | 6% | 2% | 7% | ❌ |
| `application/handlers/vibecoder/services/report-service.js` | 17% | 17% | 3% | 12% | ❌ |
| `application/handlers/vibecoder/services/security-service.js` | 6% | 5% | 2% | 4% | ❌ |
| `application/handlers/vibecoder/services/validation-service.js` | 14% | 13% | 6% | 11% | ❌ |
| `application/handlers/vibecoder/utils/analysis-utils.js` | 6% | 6% | 0% | 4% | ❌ |
| `application/handlers/vibecoder/utils/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `application/queries/GetChatHistoryQuery.js` | 0% | 13% | 0% | 4% | ❌ |
| `application/queries/GetGeneratedScriptsQuery.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/queries/GetProjectAnalysisQuery.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/queries/GetTaskExecutionQuery.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/queries/GetTaskSuggestionsQuery.js` | 0% | 0% | 0% | 0% | ❌ |
| `application/queries/GetTasksQuery.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/entities/AnalysisResult.js` | 0% | 9% | 0% | 3% | ❌ |
| `domain/entities/ChatMessage.js` | 0% | 6% | 0% | 2% | ❌ |
| `domain/entities/ChatSession.js` | 0% | 6% | 0% | 2% | ❌ |
| `domain/entities/FrameMetrics.js` | 0% | 1% | 0% | 0% | ❌ |
| `domain/entities/GeneratedScript.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/entities/ProjectAnalysis.js` | 0% | 9% | 0% | 3% | ❌ |
| `domain/entities/StreamingPort.js` | 11% | 25% | 12% | 16% | ❌ |
| `domain/entities/StreamingSession.js` | 0% | 1% | 0% | 0% | ❌ |
| `domain/entities/Task.js` | 69% | 63% | 55% | 62% | ⚠️ |
| `domain/entities/TaskExecution.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/entities/TaskSession.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/entities/TaskSuggestion.js` | 0% | 4% | 0% | 1% | ❌ |
| `domain/entities/TaskTemplate.js` | 0% | 3% | 0% | 1% | ❌ |
| `domain/entities/TestMetadata.js` | 95% | 98% | 86% | 93% | ✅ |
| `domain/entities/TodoTask.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/entities/User.js` | 0% | 6% | 0% | 2% | ❌ |
| `domain/entities/UserSession.js` | 0% | 6% | 0% | 2% | ❌ |
| `domain/entities/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/repositories/AnalysisRepository.js` | 0% | 13% | 100% | 38% | ❌ |
| `domain/repositories/ChatRepository.js` | 9% | 19% | 0% | 9% | ❌ |
| `domain/repositories/ProjectAnalysisRepository.js` | 0% | 8% | 100% | 36% | ❌ |
| `domain/repositories/TaskExecutionRepository.js` | 0% | 3% | 0% | 1% | ❌ |
| `domain/repositories/TaskRepository.js` | 0% | 9% | 0% | 3% | ❌ |
| `domain/repositories/TaskSuggestionRepository.js` | 0% | 4% | 0% | 1% | ❌ |
| `domain/repositories/TaskTemplateRepository.js` | 0% | 5% | 0% | 2% | ❌ |
| `domain/repositories/TestMetadataRepository.js` | 74% | 69% | 53% | 65% | ⚠️ |
| `domain/repositories/UserRepository.js` | 0% | 8% | 0% | 3% | ❌ |
| `domain/repositories/UserSessionRepository.js` | 0% | 7% | 0% | 2% | ❌ |
| `domain/repositories/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/services/AdvancedAnalysisService.js` | 83% | 68% | 57% | 69% | ⚠️ |
| `domain/services/AnalysisOutputService.js` | 3% | 16% | 0% | 6% | ❌ |
| `domain/services/ArchitectureService.js` | 4% | 8% | 8% | 7% | ❌ |
| `domain/services/AuthService.js` | 9% | 11% | 0% | 7% | ❌ |
| `domain/services/CodeQualityService.js` | 7% | 12% | 11% | 10% | ❌ |
| `domain/services/CursorIDEService.js` | 3% | 7% | 1% | 4% | ❌ |
| `domain/services/FileSystemService.js` | 13% | 9% | 5% | 9% | ❌ |
| `domain/services/IDEMirrorService.js` | 3% | 3% | 0% | 2% | ❌ |
| `domain/services/IDEWorkspaceDetectionService.js` | 7% | 5% | 0% | 4% | ❌ |
| `domain/services/LayerValidationService.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/services/LogicValidationService.js` | 0% | 1% | 0% | 0% | ❌ |
| `domain/services/PerformanceService.js` | 5% | 9% | 8% | 7% | ❌ |
| `domain/services/ProjectMappingService.js` | 22% | 46% | 23% | 30% | ❌ |
| `domain/services/ScriptGenerationService.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/services/SecurityService.js` | 6% | 12% | 11% | 10% | ❌ |
| `domain/services/SubprojectDetector.js` | 33% | 9% | 0% | 14% | ❌ |
| `domain/services/TaskAnalysisService.js` | 1% | 6% | 8% | 5% | ❌ |
| `domain/services/TaskExecutionService.js` | 2% | 5% | 0% | 2% | ❌ |
| `domain/services/TaskGenerationService.js` | 0% | 4% | 0% | 1% | ❌ |
| `domain/services/TaskMonitoringService.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/services/TaskOptimizationService.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/services/TaskSchedulingService.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/services/TaskSecurityService.js` | 0% | 2% | 0% | 1% | ❌ |
| `domain/services/TaskService.js` | 3% | 4% | 1% | 3% | ❌ |
| `domain/services/TaskSuggestionService.js` | 0% | 3% | 0% | 1% | ❌ |
| `domain/services/TaskValidationService.js` | 2% | 5% | 0% | 2% | ❌ |
| `domain/services/TerminalLogCaptureService.js` | 100% | 87% | 80% | 89% | ✅ |
| `domain/services/TerminalLogReader.js` | 38% | 33% | 21% | 31% | ❌ |
| `domain/services/TestManagementService.js` | 42% | 58% | 62% | 54% | ⚠️ |
| `domain/services/VSCodeService.js` | 55% | 50% | 36% | 47% | ❌ |
| `domain/services/WorkflowGitService.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/WorkflowOrchestrationService.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/services/analysis-output/constants.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/services/analysis-output/file-system-service.js` | 20% | 26% | 0% | 15% | ❌ |
| `domain/services/analysis-output/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `domain/services/analysis-output/markdown-formatter.js` | 0% | 1% | 0% | 0% | ❌ |
| `domain/services/analysis-output/package-extractor.js` | 0% | 1% | 0% | 0% | ❌ |
| `domain/services/analysis-output/report-generator.js` | 8% | 5% | 0% | 4% | ❌ |
| `domain/services/analysis-output/security-aggregator.js` | 0% | 5% | 0% | 2% | ❌ |
| `domain/services/analysis-output/utils.js` | 0% | 6% | 0% | 2% | ❌ |
| `domain/services/auto-finish/AutoFinishSystem.js` | 17% | 22% | 3% | 14% | ❌ |
| `domain/services/auto-finish/ConfirmationSystem.js` | 19% | 8% | 0% | 9% | ❌ |
| `domain/services/auto-finish/FallbackDetection.js` | 16% | 9% | 0% | 8% | ❌ |
| `domain/services/auto-finish/TaskSequencer.js` | 10% | 5% | 0% | 5% | ❌ |
| `domain/services/auto-finish/TodoParser.js` | 14% | 9% | 0% | 8% | ❌ |
| `domain/services/chat/ChatHistoryExtractor.js` | 14% | 7% | 0% | 7% | ❌ |
| `domain/services/chat/ChatMessageHandler.js` | 17% | 4% | 0% | 7% | ❌ |
| `domain/services/dev-server/CDPWorkspaceDetector.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/dev-server/PackageJsonAnalyzer.js` | 11% | 4% | 0% | 5% | ❌ |
| `domain/services/ide-mirror/CompressionEngine.js` | 17% | 16% | 4% | 12% | ❌ |
| `domain/services/ide-mirror/FrameBuffer.js` | 14% | 13% | 10% | 12% | ❌ |
| `domain/services/ide-mirror/RegionDetector.js` | 7% | 10% | 19% | 12% | ❌ |
| `domain/services/ide-mirror/ScreenshotStreamingService.js` | 38% | 25% | 21% | 28% | ❌ |
| `domain/services/terminal/TerminalContentExtractor.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/terminal/TerminalMonitor.js` | 7% | 4% | 0% | 4% | ❌ |
| `domain/services/terminal/TerminalUrlExtractor.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/terminal/VSCodeTerminalHandler.js` | 0% | 2% | 1% | 1% | ❌ |
| `domain/services/vscode/VSCodeChatHandler.js` | 10% | 3% | 0% | 4% | ❌ |
| `domain/services/vscode/VSCodeWorkspaceDetector.js` | 0% | 0% | 0% | 0% | ❌ |
| `domain/services/workspace/FileBasedWorkspaceDetector.js` | 31% | 26% | 20% | 26% | ❌ |
| `domain/services/workspace/WorkspacePathDetector.js` | 17% | 4% | 0% | 7% | ❌ |
| `domain/value-objects/AISuggestion.js` | 0% | 17% | 0% | 6% | ❌ |
| `domain/value-objects/ProjectType.js` | 0% | 16% | 0% | 5% | ❌ |
| `domain/value-objects/TaskPriority.js` | 57% | 73% | 40% | 57% | ⚠️ |
| `domain/value-objects/TaskStatus.js` | 73% | 84% | 0% | 52% | ⚠️ |
| `domain/value-objects/TaskType.js` | 36% | 64% | 67% | 56% | ⚠️ |
| `domain/value-objects/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `infrastructure/auth/AuthMiddleware.js` | 11% | 4% | 0% | 5% | ❌ |
| `infrastructure/auto/AutoSecurityManager.js` | 60% | 56% | 21% | 46% | ❌ |
| `infrastructure/database/DatabaseConnection.js` | 65% | 47% | 38% | 50% | ⚠️ |
| `infrastructure/database/InMemoryAnalysisRepository.js` | 7% | 14% | 0% | 7% | ❌ |
| `infrastructure/database/InMemoryChatRepository.js` | 7% | 19% | 0% | 9% | ❌ |
| `infrastructure/database/InMemoryTaskExecutionRepository.js` | 3% | 2% | 0% | 2% | ❌ |
| `infrastructure/database/InMemoryTaskRepository.js` | 0% | 5% | 0% | 2% | ❌ |
| `infrastructure/database/PostgreSQLProjectAnalysisRepository.js` | 6% | 5% | 0% | 4% | ❌ |
| `infrastructure/database/PostgreSQLTaskRepository.js` | 14% | 14% | 0% | 9% | ❌ |
| `infrastructure/database/PostgreSQLUserRepository.js` | 9% | 6% | 0% | 5% | ❌ |
| `infrastructure/database/PostgreSQLUserSessionRepository.js` | 8% | 7% | 0% | 5% | ❌ |
| `infrastructure/database/SQLiteTaskExecutionRepository.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/database/SQLiteTaskRepository.js` | 3% | 3% | 0% | 2% | ❌ |
| `infrastructure/database/SQLiteTaskSuggestionRepository.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/database/SQLiteTaskTemplateRepository.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/database/StreamingSessionRepository.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/database/TaskDatabase.js` | 79% | 60% | 39% | 59% | ⚠️ |
| `infrastructure/database/TaskSessionRepository.js` | 7% | 9% | 2% | 6% | ❌ |
| `infrastructure/di/ApplicationIntegration.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/di/ProjectContextService.js` | 56% | 42% | 32% | 43% | ❌ |
| `infrastructure/di/ServiceContainer.js` | 53% | 51% | 41% | 48% | ❌ |
| `infrastructure/di/ServiceRegistry.js` | 90% | 95% | 100% | 95% | ✅ |
| `infrastructure/external/AIIntegrationManager.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/external/AIService.js` | 55% | 52% | 37% | 48% | ❌ |
| `infrastructure/external/ArchitectureAnalyzer.js` | 3% | 2% | 0% | 2% | ❌ |
| `infrastructure/external/BrowserManager.js` | 13% | 8% | 6% | 9% | ❌ |
| `infrastructure/external/CodeQualityAnalyzer.js` | 5% | 3% | 0% | 3% | ❌ |
| `infrastructure/external/DependencyAnalyzer.js` | 8% | 5% | 0% | 4% | ❌ |
| `infrastructure/external/DockerService.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/external/FileSystemService.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/external/GitService.js` | 3% | 3% | 1% | 2% | ❌ |
| `infrastructure/external/IDEDetector.js` | 71% | 70% | 50% | 64% | ⚠️ |
| `infrastructure/external/IDEManager.js` | 18% | 25% | 14% | 19% | ❌ |
| `infrastructure/external/IDEStarter.js` | 11% | 18% | 0% | 10% | ❌ |
| `infrastructure/external/PerformanceAnalyzer.js` | 6% | 2% | 0% | 3% | ❌ |
| `infrastructure/external/ProjectAnalyzer.js` | 4% | 3% | 0% | 2% | ❌ |
| `infrastructure/external/ScriptExecutor.js` | 4% | 8% | 4% | 5% | ❌ |
| `infrastructure/external/SecurityAnalyzer.js` | 5% | 3% | 0% | 3% | ❌ |
| `infrastructure/external/TaskExecutionEngine.js` | 56% | 55% | 17% | 43% | ❌ |
| `infrastructure/external/TechStackAnalyzer.js` | 6% | 3% | 0% | 3% | ❌ |
| `infrastructure/external/VSCodeDetector.js` | 67% | 66% | 65% | 66% | ⚠️ |
| `infrastructure/external/VSCodeExtensionManager.js` | 0% | 6% | 0% | 2% | ❌ |
| `infrastructure/external/VSCodeStarter.js` | 12% | 16% | 0% | 9% | ❌ |
| `infrastructure/external/task-execution/index.js` | 100% | 0% | 100% | 67% | ⚠️ |
| `infrastructure/external/task-execution/constants/ExecutionConstants.js` | 100% | 100% | 100% | 100% | ✅ |
| `infrastructure/external/task-execution/handlers/EventHandlers.js` | 56% | 26% | 14% | 32% | ❌ |
| `infrastructure/external/task-execution/services/AnalysisService.js` | 25% | 11% | 0% | 12% | ❌ |
| `infrastructure/external/task-execution/services/CustomTaskService.js` | 25% | 16% | 0% | 14% | ❌ |
| `infrastructure/external/task-execution/services/DeploymentService.js` | 6% | 6% | 0% | 4% | ❌ |
| `infrastructure/external/task-execution/services/OptimizationService.js` | 0% | 6% | 0% | 2% | ❌ |
| `infrastructure/external/task-execution/services/RefactoringService.js` | 13% | 8% | 0% | 7% | ❌ |
| `infrastructure/external/task-execution/services/ScriptService.js` | 25% | 11% | 0% | 12% | ❌ |
| `infrastructure/external/task-execution/services/SecurityService.js` | 0% | 3% | 0% | 1% | ❌ |
| `infrastructure/external/task-execution/services/TestingService.js` | 14% | 6% | 0% | 7% | ❌ |
| `infrastructure/external/task-execution/utils/ExecutionUtils.js` | 13% | 5% | 0% | 6% | ❌ |
| `infrastructure/external/task-execution/utils/FileUtils.js` | 7% | 8% | 0% | 5% | ❌ |
| `infrastructure/external/task-execution/utils/RefactoringUtils.js` | 8% | 7% | 0% | 5% | ❌ |
| `infrastructure/external/task-execution/validators/TaskValidator.js` | 33% | 12% | 4% | 16% | ❌ |
| `infrastructure/messaging/CommandBus.js` | 50% | 59% | 50% | 53% | ⚠️ |
| `infrastructure/messaging/EventBus.js` | 56% | 44% | 30% | 43% | ❌ |
| `infrastructure/messaging/QueryBus.js` | 38% | 48% | 13% | 33% | ❌ |
| `infrastructure/security/LogEncryptionService.js` | 33% | 42% | 50% | 42% | ❌ |
| `infrastructure/security/LogPermissionManager.js` | 45% | 29% | 28% | 34% | ❌ |
| `infrastructure/strategies/MonorepoStrategy.js` | 10% | 9% | 6% | 8% | ❌ |
| `infrastructure/strategies/SingleRepoStrategy.js` | 2% | 37% | 13% | 17% | ❌ |
| `infrastructure/strategies/single-repo/constants/index.js` | 100% | 100% | 100% | 100% | ✅ |
| `infrastructure/strategies/single-repo/services/buildToolsAnalyzer.js` | 50% | 50% | 100% | 67% | ⚠️ |
| `infrastructure/strategies/single-repo/services/dependencyAnalyzer.js` | 7% | 7% | 0% | 5% | ❌ |
| `infrastructure/strategies/single-repo/services/deploymentAnalyzer.js` | 50% | 19% | 0% | 23% | ❌ |
| `infrastructure/strategies/single-repo/services/lintingAnalyzer.js` | 50% | 24% | 0% | 25% | ❌ |
| `infrastructure/strategies/single-repo/services/optimizationService.js` | 11% | 13% | 0% | 8% | ❌ |
| `infrastructure/strategies/single-repo/services/performanceAnalyzer.js` | 25% | 21% | 0% | 15% | ❌ |
| `infrastructure/strategies/single-repo/services/projectTypeAnalyzer.js` | 20% | 12% | 0% | 11% | ❌ |
| `infrastructure/strategies/single-repo/services/recommendationsService.js` | 50% | 12% | 0% | 21% | ❌ |
| `infrastructure/strategies/single-repo/services/securityAnalyzer.js` | 25% | 21% | 0% | 15% | ❌ |
| `infrastructure/strategies/single-repo/services/structureAnalyzer.js` | 50% | 35% | 0% | 28% | ❌ |
| `infrastructure/strategies/single-repo/services/testingAnalyzer.js` | 17% | 21% | 0% | 13% | ❌ |
| `infrastructure/strategies/single-repo/utils/directoryScanner.js` | 25% | 18% | 0% | 14% | ❌ |
| `infrastructure/strategies/single-repo/utils/fileUtils.js` | 14% | 10% | 0% | 8% | ❌ |
| `infrastructure/strategies/single-repo/validators/repositoryTypeValidator.js` | 50% | 24% | 0% | 25% | ❌ |
| `infrastructure/templates/AIPrompts.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/templates/ScriptTemplates.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/templates/TaskTemplates.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/templates/modules/automationTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/buildTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/constants.js` | 100% | 0% | 100% | 67% | ⚠️ |
| `infrastructure/templates/modules/databaseTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/deployTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/developmentTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/generator.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/templates/modules/index.js` | 100% | 0% | 100% | 67% | ⚠️ |
| `infrastructure/templates/modules/maintenanceTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/monitoringTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/search.js` | 0% | 0% | 0% | 0% | ❌ |
| `infrastructure/templates/modules/securityTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/testTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/utilityTemplates.js` | 0% | 0% | 100% | 33% | ❌ |
| `infrastructure/templates/modules/validation.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/AnalysisController.js` | 7% | 7% | 4% | 6% | ❌ |
| `presentation/api/AuthController.js` | 10% | 7% | 0% | 6% | ❌ |
| `presentation/api/AutoFinishController.js` | 8% | 5% | 2% | 5% | ❌ |
| `presentation/api/AutoModeController.js` | 13% | 6% | 1% | 7% | ❌ |
| `presentation/api/ChatController.js` | 7% | 8% | 0% | 5% | ❌ |
| `presentation/api/CodeExplorerController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/ContentLibraryController.js` | 4% | 3% | 0% | 2% | ❌ |
| `presentation/api/DocumentationController.js` | 2% | 2% | 0% | 1% | ❌ |
| `presentation/api/GitController.js` | 10% | 3% | 4% | 6% | ❌ |
| `presentation/api/IDEController.js` | 2% | 3% | 0% | 2% | ❌ |
| `presentation/api/IDEMirrorController.js` | 8% | 21% | 7% | 12% | ❌ |
| `presentation/api/ProjectAnalysisController.js` | 8% | 4% | 0% | 4% | ❌ |
| `presentation/api/ScriptGenerationController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/StreamingController.js` | 9% | 6% | 0% | 5% | ❌ |
| `presentation/api/TaskAnalysisController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/TaskController.js` | 4% | 5% | 0% | 3% | ❌ |
| `presentation/api/TaskExecutionController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/TaskSuggestionController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/VibeCoderAutoRefactorController.js` | 50% | 29% | 25% | 35% | ❌ |
| `presentation/api/controllers/TestManagementController.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/api/handlers/DocsTasksHandler.js` | 62% | 66% | 62% | 63% | ⚠️ |
| `presentation/websocket/TaskNotificationService.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/websocket/TaskProgressTracker.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/websocket/TaskWebSocket.js` | 0% | 0% | 0% | 0% | ❌ |
| `presentation/websocket/WebSocketManager.js` | 9% | 9% | 0% | 6% | ❌ |

## 🎯 Coverage Improvement Tasks

### 🔴 High Priority

- **Application.js** (40% → 80%)
  - Current: Funcs 10%, Lines 80%, Branches 29%
  - Task: Improve test coverage for Application.js

- **jest.config.js** (33% → 80%)
  - Current: Funcs 100%, Lines 0%, Branches 0%
  - Task: Improve test coverage for jest.config.js

- **server.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for server.js

- **application/commands/PortStreamingCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 3%, Branches 0%
  - Task: Improve test coverage for PortStreamingCommand.js

- **application/commands/ProcessTodoListCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 4%, Branches 0%
  - Task: Improve test coverage for ProcessTodoListCommand.js

- **application/commands/SendMessageCommand.js** (4% → 80%)
  - Current: Funcs 0%, Lines 13%, Branches 0%
  - Task: Improve test coverage for SendMessageCommand.js

- **application/commands/StartStreamingCommand.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for StartStreamingCommand.js

- **application/commands/StopStreamingCommand.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for StopStreamingCommand.js

- **application/commands/analyze/AnalyzeArchitectureCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for AnalyzeArchitectureCommand.js

- **application/commands/analyze/AnalyzeCodeQualityCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for AnalyzeCodeQualityCommand.js

- **application/commands/analyze/AnalyzeDependenciesCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for AnalyzeDependenciesCommand.js

- **application/commands/analyze/AnalyzeRepoStructureCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for AnalyzeRepoStructureCommand.js

- **application/commands/analyze/AnalyzeTechStackCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for AnalyzeTechStackCommand.js

- **application/commands/generate/GenerateConfigsCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for GenerateConfigsCommand.js

- **application/commands/generate/GenerateDocumentationCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for GenerateDocumentationCommand.js

- **application/commands/generate/GenerateScriptsCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for GenerateScriptsCommand.js

- **application/commands/generate/GenerateTestsCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for GenerateTestsCommand.js

- **application/commands/refactor/CleanDependenciesCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for CleanDependenciesCommand.js

- **application/commands/refactor/OrganizeModulesCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for OrganizeModulesCommand.js

- **application/commands/refactor/RestructureArchitectureCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for RestructureArchitectureCommand.js

- **application/commands/refactor/SplitLargeFilesCommand.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for SplitLargeFilesCommand.js

- **application/commands/vibecoder/VibeCoderAnalyzeCommand.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for VibeCoderAnalyzeCommand.js

- **application/commands/vibecoder/VibeCoderAutoRefactorCommand.js** (44% → 80%)
  - Current: Funcs 0%, Lines 33%, Branches 100%
  - Task: Improve test coverage for VibeCoderAutoRefactorCommand.js

- **application/commands/vibecoder/VibeCoderGenerateCommand.js** (2% → 80%)
  - Current: Funcs 0%, Lines 5%, Branches 0%
  - Task: Improve test coverage for VibeCoderGenerateCommand.js

- **application/commands/vibecoder/VibeCoderModeCommand.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for VibeCoderModeCommand.js

- **application/commands/vibecoder/VibeCoderRefactorCommand.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for VibeCoderRefactorCommand.js

- **application/handlers/CreateTaskHandler.js** (26% → 80%)
  - Current: Funcs 33%, Lines 34%, Branches 12%
  - Task: Improve test coverage for CreateTaskHandler.js

- **application/handlers/GetChatHistoryHandler.js** (4% → 80%)
  - Current: Funcs 6%, Lines 7%, Branches 0%
  - Task: Improve test coverage for GetChatHistoryHandler.js

- **application/handlers/PortStreamingHandler.js** (6% → 80%)
  - Current: Funcs 11%, Lines 8%, Branches 0%
  - Task: Improve test coverage for PortStreamingHandler.js

- **application/handlers/ProcessTodoListHandler.js** (16% → 80%)
  - Current: Funcs 20%, Lines 23%, Branches 4%
  - Task: Improve test coverage for ProcessTodoListHandler.js

- **application/handlers/SendMessageHandler.js** (21% → 80%)
  - Current: Funcs 43%, Lines 16%, Branches 3%
  - Task: Improve test coverage for SendMessageHandler.js

- **application/handlers/StartStreamingHandler.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for StartStreamingHandler.js

- **application/handlers/StopStreamingHandler.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for StopStreamingHandler.js

- **application/handlers/UpdateTestStatusHandler.js** (35% → 80%)
  - Current: Funcs 50%, Lines 32%, Branches 22%
  - Task: Improve test coverage for UpdateTestStatusHandler.js

- **application/handlers/analyze/AnalyzeArchitectureHandler.js** (6% → 80%)
  - Current: Funcs 8%, Lines 8%, Branches 1%
  - Task: Improve test coverage for AnalyzeArchitectureHandler.js

- **application/handlers/analyze/AnalyzeCodeQualityHandler.js** (6% → 80%)
  - Current: Funcs 9%, Lines 7%, Branches 1%
  - Task: Improve test coverage for AnalyzeCodeQualityHandler.js

- **application/handlers/analyze/AnalyzeDependenciesHandler.js** (7% → 80%)
  - Current: Funcs 10%, Lines 9%, Branches 1%
  - Task: Improve test coverage for AnalyzeDependenciesHandler.js

- **application/handlers/analyze/AnalyzeRepoStructureHandler.js** (7% → 80%)
  - Current: Funcs 10%, Lines 9%, Branches 1%
  - Task: Improve test coverage for AnalyzeRepoStructureHandler.js

- **application/handlers/analyze/AnalyzeTechStackHandler.js** (8% → 80%)
  - Current: Funcs 12%, Lines 10%, Branches 1%
  - Task: Improve test coverage for AnalyzeTechStackHandler.js

- **application/handlers/generate/GenerateConfigsHandler.js** (2% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 2%
  - Task: Improve test coverage for GenerateConfigsHandler.js

- **application/handlers/generate/GenerateDocumentationHandler.js** (2% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 2%
  - Task: Improve test coverage for GenerateDocumentationHandler.js

- **application/handlers/generate/GenerateScriptHandler.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GenerateScriptHandler.js

- **application/handlers/generate/GenerateScriptsHandler.js** (3% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 3%
  - Task: Improve test coverage for GenerateScriptsHandler.js

- **application/handlers/generate/GenerateTestsHandler.js** (2% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 2%
  - Task: Improve test coverage for GenerateTestsHandler.js

- **application/handlers/generate/constants/ScriptGenerationConstants.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for ScriptGenerationConstants.js

- **application/handlers/generate/services/EventPublishingService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for EventPublishingService.js

- **application/handlers/generate/services/ProjectAnalysisService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ProjectAnalysisService.js

- **application/handlers/generate/services/ScriptGenerationService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ScriptGenerationService.js

- **application/handlers/generate/services/ScriptProcessingService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ScriptProcessingService.js

- **application/handlers/generate/services/TaskManagementService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskManagementService.js

- **application/handlers/generate/validation/ScriptGenerationValidator.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ScriptGenerationValidator.js

- **application/handlers/refactor/CleanDependenciesHandler.js** (3% → 80%)
  - Current: Funcs 3%, Lines 3%, Branches 2%
  - Task: Improve test coverage for CleanDependenciesHandler.js

- **application/handlers/refactor/OrganizeModulesHandler.js** (3% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 3%
  - Task: Improve test coverage for OrganizeModulesHandler.js

- **application/handlers/refactor/RestructureArchitectureHandler.js** (3% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 3%
  - Task: Improve test coverage for RestructureArchitectureHandler.js

- **application/handlers/refactor/SplitLargeFilesHandler.js** (11% → 80%)
  - Current: Funcs 17%, Lines 7%, Branches 10%
  - Task: Improve test coverage for SplitLargeFilesHandler.js

- **application/handlers/vibecoder/VibeCoderAnalyzeHandler.js** (6% → 80%)
  - Current: Funcs 9%, Lines 7%, Branches 1%
  - Task: Improve test coverage for VibeCoderAnalyzeHandler.js

- **application/handlers/vibecoder/VibeCoderAutoRefactorHandler.js** (4% → 80%)
  - Current: Funcs 4%, Lines 8%, Branches 0%
  - Task: Improve test coverage for VibeCoderAutoRefactorHandler.js

- **application/handlers/vibecoder/VibeCoderGenerateHandler.js** (5% → 80%)
  - Current: Funcs 4%, Lines 6%, Branches 6%
  - Task: Improve test coverage for VibeCoderGenerateHandler.js

- **application/handlers/vibecoder/VibeCoderModeHandler.js** (31% → 80%)
  - Current: Funcs 33%, Lines 43%, Branches 17%
  - Task: Improve test coverage for VibeCoderModeHandler.js

- **application/handlers/vibecoder/VibeCoderRefactorHandler.js** (7% → 80%)
  - Current: Funcs 4%, Lines 7%, Branches 10%
  - Task: Improve test coverage for VibeCoderRefactorHandler.js

- **application/handlers/vibecoder/services/analysis-service.js** (6% → 80%)
  - Current: Funcs 6%, Lines 10%, Branches 3%
  - Task: Improve test coverage for analysis-service.js

- **application/handlers/vibecoder/services/execution-service.js** (4% → 80%)
  - Current: Funcs 7%, Lines 4%, Branches 2%
  - Task: Improve test coverage for execution-service.js

- **application/handlers/vibecoder/services/metrics-service.js** (11% → 80%)
  - Current: Funcs 17%, Lines 11%, Branches 5%
  - Task: Improve test coverage for metrics-service.js

- **application/handlers/vibecoder/services/output-service.js** (15% → 80%)
  - Current: Funcs 33%, Lines 11%, Branches 1%
  - Task: Improve test coverage for output-service.js

- **application/handlers/vibecoder/services/recommendation-service.js** (7% → 80%)
  - Current: Funcs 14%, Lines 6%, Branches 2%
  - Task: Improve test coverage for recommendation-service.js

- **application/handlers/vibecoder/services/report-service.js** (12% → 80%)
  - Current: Funcs 17%, Lines 17%, Branches 3%
  - Task: Improve test coverage for report-service.js

- **application/handlers/vibecoder/services/security-service.js** (4% → 80%)
  - Current: Funcs 6%, Lines 5%, Branches 2%
  - Task: Improve test coverage for security-service.js

- **application/handlers/vibecoder/services/validation-service.js** (11% → 80%)
  - Current: Funcs 14%, Lines 13%, Branches 6%
  - Task: Improve test coverage for validation-service.js

- **application/handlers/vibecoder/utils/analysis-utils.js** (4% → 80%)
  - Current: Funcs 6%, Lines 6%, Branches 0%
  - Task: Improve test coverage for analysis-utils.js

- **application/queries/GetChatHistoryQuery.js** (4% → 80%)
  - Current: Funcs 0%, Lines 13%, Branches 0%
  - Task: Improve test coverage for GetChatHistoryQuery.js

- **application/queries/GetGeneratedScriptsQuery.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GetGeneratedScriptsQuery.js

- **application/queries/GetProjectAnalysisQuery.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GetProjectAnalysisQuery.js

- **application/queries/GetTaskExecutionQuery.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GetTaskExecutionQuery.js

- **application/queries/GetTaskSuggestionsQuery.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GetTaskSuggestionsQuery.js

- **application/queries/GetTasksQuery.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for GetTasksQuery.js

- **domain/entities/AnalysisResult.js** (3% → 80%)
  - Current: Funcs 0%, Lines 9%, Branches 0%
  - Task: Improve test coverage for AnalysisResult.js

- **domain/entities/ChatMessage.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for ChatMessage.js

- **domain/entities/ChatSession.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for ChatSession.js

- **domain/entities/FrameMetrics.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for FrameMetrics.js

- **domain/entities/GeneratedScript.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for GeneratedScript.js

- **domain/entities/ProjectAnalysis.js** (3% → 80%)
  - Current: Funcs 0%, Lines 9%, Branches 0%
  - Task: Improve test coverage for ProjectAnalysis.js

- **domain/entities/StreamingPort.js** (16% → 80%)
  - Current: Funcs 11%, Lines 25%, Branches 12%
  - Task: Improve test coverage for StreamingPort.js

- **domain/entities/StreamingSession.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for StreamingSession.js

- **domain/entities/TaskExecution.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskExecution.js

- **domain/entities/TaskSession.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskSession.js

- **domain/entities/TaskSuggestion.js** (1% → 80%)
  - Current: Funcs 0%, Lines 4%, Branches 0%
  - Task: Improve test coverage for TaskSuggestion.js

- **domain/entities/TaskTemplate.js** (1% → 80%)
  - Current: Funcs 0%, Lines 3%, Branches 0%
  - Task: Improve test coverage for TaskTemplate.js

- **domain/entities/TodoTask.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TodoTask.js

- **domain/entities/User.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for User.js

- **domain/entities/UserSession.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for UserSession.js

- **domain/repositories/AnalysisRepository.js** (38% → 80%)
  - Current: Funcs 0%, Lines 13%, Branches 100%
  - Task: Improve test coverage for AnalysisRepository.js

- **domain/repositories/ChatRepository.js** (9% → 80%)
  - Current: Funcs 9%, Lines 19%, Branches 0%
  - Task: Improve test coverage for ChatRepository.js

- **domain/repositories/ProjectAnalysisRepository.js** (36% → 80%)
  - Current: Funcs 0%, Lines 8%, Branches 100%
  - Task: Improve test coverage for ProjectAnalysisRepository.js

- **domain/repositories/TaskExecutionRepository.js** (1% → 80%)
  - Current: Funcs 0%, Lines 3%, Branches 0%
  - Task: Improve test coverage for TaskExecutionRepository.js

- **domain/repositories/TaskRepository.js** (3% → 80%)
  - Current: Funcs 0%, Lines 9%, Branches 0%
  - Task: Improve test coverage for TaskRepository.js

- **domain/repositories/TaskSuggestionRepository.js** (1% → 80%)
  - Current: Funcs 0%, Lines 4%, Branches 0%
  - Task: Improve test coverage for TaskSuggestionRepository.js

- **domain/repositories/TaskTemplateRepository.js** (2% → 80%)
  - Current: Funcs 0%, Lines 5%, Branches 0%
  - Task: Improve test coverage for TaskTemplateRepository.js

- **domain/repositories/UserRepository.js** (3% → 80%)
  - Current: Funcs 0%, Lines 8%, Branches 0%
  - Task: Improve test coverage for UserRepository.js

- **domain/repositories/UserSessionRepository.js** (2% → 80%)
  - Current: Funcs 0%, Lines 7%, Branches 0%
  - Task: Improve test coverage for UserSessionRepository.js

- **domain/services/AnalysisOutputService.js** (6% → 80%)
  - Current: Funcs 3%, Lines 16%, Branches 0%
  - Task: Improve test coverage for AnalysisOutputService.js

- **domain/services/ArchitectureService.js** (7% → 80%)
  - Current: Funcs 4%, Lines 8%, Branches 8%
  - Task: Improve test coverage for ArchitectureService.js

- **domain/services/AuthService.js** (7% → 80%)
  - Current: Funcs 9%, Lines 11%, Branches 0%
  - Task: Improve test coverage for AuthService.js

- **domain/services/CodeQualityService.js** (10% → 80%)
  - Current: Funcs 7%, Lines 12%, Branches 11%
  - Task: Improve test coverage for CodeQualityService.js

- **domain/services/CursorIDEService.js** (4% → 80%)
  - Current: Funcs 3%, Lines 7%, Branches 1%
  - Task: Improve test coverage for CursorIDEService.js

- **domain/services/FileSystemService.js** (9% → 80%)
  - Current: Funcs 13%, Lines 9%, Branches 5%
  - Task: Improve test coverage for FileSystemService.js

- **domain/services/IDEMirrorService.js** (2% → 80%)
  - Current: Funcs 3%, Lines 3%, Branches 0%
  - Task: Improve test coverage for IDEMirrorService.js

- **domain/services/IDEWorkspaceDetectionService.js** (4% → 80%)
  - Current: Funcs 7%, Lines 5%, Branches 0%
  - Task: Improve test coverage for IDEWorkspaceDetectionService.js

- **domain/services/LayerValidationService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for LayerValidationService.js

- **domain/services/LogicValidationService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for LogicValidationService.js

- **domain/services/PerformanceService.js** (7% → 80%)
  - Current: Funcs 5%, Lines 9%, Branches 8%
  - Task: Improve test coverage for PerformanceService.js

- **domain/services/ProjectMappingService.js** (30% → 80%)
  - Current: Funcs 22%, Lines 46%, Branches 23%
  - Task: Improve test coverage for ProjectMappingService.js

- **domain/services/SecurityService.js** (10% → 80%)
  - Current: Funcs 6%, Lines 12%, Branches 11%
  - Task: Improve test coverage for SecurityService.js

- **domain/services/SubprojectDetector.js** (14% → 80%)
  - Current: Funcs 33%, Lines 9%, Branches 0%
  - Task: Improve test coverage for SubprojectDetector.js

- **domain/services/TaskAnalysisService.js** (5% → 80%)
  - Current: Funcs 1%, Lines 6%, Branches 8%
  - Task: Improve test coverage for TaskAnalysisService.js

- **domain/services/TaskExecutionService.js** (2% → 80%)
  - Current: Funcs 2%, Lines 5%, Branches 0%
  - Task: Improve test coverage for TaskExecutionService.js

- **domain/services/TaskGenerationService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 4%, Branches 0%
  - Task: Improve test coverage for TaskGenerationService.js

- **domain/services/TaskMonitoringService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskMonitoringService.js

- **domain/services/TaskOptimizationService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskOptimizationService.js

- **domain/services/TaskSchedulingService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskSchedulingService.js

- **domain/services/TaskSecurityService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 0%
  - Task: Improve test coverage for TaskSecurityService.js

- **domain/services/TaskService.js** (3% → 80%)
  - Current: Funcs 3%, Lines 4%, Branches 1%
  - Task: Improve test coverage for TaskService.js

- **domain/services/TaskSuggestionService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 3%, Branches 0%
  - Task: Improve test coverage for TaskSuggestionService.js

- **domain/services/TaskValidationService.js** (2% → 80%)
  - Current: Funcs 2%, Lines 5%, Branches 0%
  - Task: Improve test coverage for TaskValidationService.js

- **domain/services/TerminalLogReader.js** (31% → 80%)
  - Current: Funcs 38%, Lines 33%, Branches 21%
  - Task: Improve test coverage for TerminalLogReader.js

- **domain/services/VSCodeService.js** (47% → 80%)
  - Current: Funcs 55%, Lines 50%, Branches 36%
  - Task: Improve test coverage for VSCodeService.js

- **domain/services/WorkflowGitService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for WorkflowGitService.js

- **domain/services/WorkflowOrchestrationService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for WorkflowOrchestrationService.js

- **domain/services/analysis-output/file-system-service.js** (15% → 80%)
  - Current: Funcs 20%, Lines 26%, Branches 0%
  - Task: Improve test coverage for file-system-service.js

- **domain/services/analysis-output/markdown-formatter.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for markdown-formatter.js

- **domain/services/analysis-output/package-extractor.js** (0% → 80%)
  - Current: Funcs 0%, Lines 1%, Branches 0%
  - Task: Improve test coverage for package-extractor.js

- **domain/services/analysis-output/report-generator.js** (4% → 80%)
  - Current: Funcs 8%, Lines 5%, Branches 0%
  - Task: Improve test coverage for report-generator.js

- **domain/services/analysis-output/security-aggregator.js** (2% → 80%)
  - Current: Funcs 0%, Lines 5%, Branches 0%
  - Task: Improve test coverage for security-aggregator.js

- **domain/services/analysis-output/utils.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for utils.js

- **domain/services/auto-finish/AutoFinishSystem.js** (14% → 80%)
  - Current: Funcs 17%, Lines 22%, Branches 3%
  - Task: Improve test coverage for AutoFinishSystem.js

- **domain/services/auto-finish/ConfirmationSystem.js** (9% → 80%)
  - Current: Funcs 19%, Lines 8%, Branches 0%
  - Task: Improve test coverage for ConfirmationSystem.js

- **domain/services/auto-finish/FallbackDetection.js** (8% → 80%)
  - Current: Funcs 16%, Lines 9%, Branches 0%
  - Task: Improve test coverage for FallbackDetection.js

- **domain/services/auto-finish/TaskSequencer.js** (5% → 80%)
  - Current: Funcs 10%, Lines 5%, Branches 0%
  - Task: Improve test coverage for TaskSequencer.js

- **domain/services/auto-finish/TodoParser.js** (8% → 80%)
  - Current: Funcs 14%, Lines 9%, Branches 0%
  - Task: Improve test coverage for TodoParser.js

- **domain/services/chat/ChatHistoryExtractor.js** (7% → 80%)
  - Current: Funcs 14%, Lines 7%, Branches 0%
  - Task: Improve test coverage for ChatHistoryExtractor.js

- **domain/services/chat/ChatMessageHandler.js** (7% → 80%)
  - Current: Funcs 17%, Lines 4%, Branches 0%
  - Task: Improve test coverage for ChatMessageHandler.js

- **domain/services/dev-server/CDPWorkspaceDetector.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for CDPWorkspaceDetector.js

- **domain/services/dev-server/PackageJsonAnalyzer.js** (5% → 80%)
  - Current: Funcs 11%, Lines 4%, Branches 0%
  - Task: Improve test coverage for PackageJsonAnalyzer.js

- **domain/services/ide-mirror/CompressionEngine.js** (12% → 80%)
  - Current: Funcs 17%, Lines 16%, Branches 4%
  - Task: Improve test coverage for CompressionEngine.js

- **domain/services/ide-mirror/FrameBuffer.js** (12% → 80%)
  - Current: Funcs 14%, Lines 13%, Branches 10%
  - Task: Improve test coverage for FrameBuffer.js

- **domain/services/ide-mirror/RegionDetector.js** (12% → 80%)
  - Current: Funcs 7%, Lines 10%, Branches 19%
  - Task: Improve test coverage for RegionDetector.js

- **domain/services/ide-mirror/ScreenshotStreamingService.js** (28% → 80%)
  - Current: Funcs 38%, Lines 25%, Branches 21%
  - Task: Improve test coverage for ScreenshotStreamingService.js

- **domain/services/terminal/TerminalContentExtractor.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TerminalContentExtractor.js

- **domain/services/terminal/TerminalMonitor.js** (4% → 80%)
  - Current: Funcs 7%, Lines 4%, Branches 0%
  - Task: Improve test coverage for TerminalMonitor.js

- **domain/services/terminal/TerminalUrlExtractor.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TerminalUrlExtractor.js

- **domain/services/terminal/VSCodeTerminalHandler.js** (1% → 80%)
  - Current: Funcs 0%, Lines 2%, Branches 1%
  - Task: Improve test coverage for VSCodeTerminalHandler.js

- **domain/services/vscode/VSCodeChatHandler.js** (4% → 80%)
  - Current: Funcs 10%, Lines 3%, Branches 0%
  - Task: Improve test coverage for VSCodeChatHandler.js

- **domain/services/vscode/VSCodeWorkspaceDetector.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for VSCodeWorkspaceDetector.js

- **domain/services/workspace/FileBasedWorkspaceDetector.js** (26% → 80%)
  - Current: Funcs 31%, Lines 26%, Branches 20%
  - Task: Improve test coverage for FileBasedWorkspaceDetector.js

- **domain/services/workspace/WorkspacePathDetector.js** (7% → 80%)
  - Current: Funcs 17%, Lines 4%, Branches 0%
  - Task: Improve test coverage for WorkspacePathDetector.js

- **domain/value-objects/AISuggestion.js** (6% → 80%)
  - Current: Funcs 0%, Lines 17%, Branches 0%
  - Task: Improve test coverage for AISuggestion.js

- **domain/value-objects/ProjectType.js** (5% → 80%)
  - Current: Funcs 0%, Lines 16%, Branches 0%
  - Task: Improve test coverage for ProjectType.js

- **infrastructure/auth/AuthMiddleware.js** (5% → 80%)
  - Current: Funcs 11%, Lines 4%, Branches 0%
  - Task: Improve test coverage for AuthMiddleware.js

- **infrastructure/auto/AutoSecurityManager.js** (46% → 80%)
  - Current: Funcs 60%, Lines 56%, Branches 21%
  - Task: Improve test coverage for AutoSecurityManager.js

- **infrastructure/database/InMemoryAnalysisRepository.js** (7% → 80%)
  - Current: Funcs 7%, Lines 14%, Branches 0%
  - Task: Improve test coverage for InMemoryAnalysisRepository.js

- **infrastructure/database/InMemoryChatRepository.js** (9% → 80%)
  - Current: Funcs 7%, Lines 19%, Branches 0%
  - Task: Improve test coverage for InMemoryChatRepository.js

- **infrastructure/database/InMemoryTaskExecutionRepository.js** (2% → 80%)
  - Current: Funcs 3%, Lines 2%, Branches 0%
  - Task: Improve test coverage for InMemoryTaskExecutionRepository.js

- **infrastructure/database/InMemoryTaskRepository.js** (2% → 80%)
  - Current: Funcs 0%, Lines 5%, Branches 0%
  - Task: Improve test coverage for InMemoryTaskRepository.js

- **infrastructure/database/PostgreSQLProjectAnalysisRepository.js** (4% → 80%)
  - Current: Funcs 6%, Lines 5%, Branches 0%
  - Task: Improve test coverage for PostgreSQLProjectAnalysisRepository.js

- **infrastructure/database/PostgreSQLTaskRepository.js** (9% → 80%)
  - Current: Funcs 14%, Lines 14%, Branches 0%
  - Task: Improve test coverage for PostgreSQLTaskRepository.js

- **infrastructure/database/PostgreSQLUserRepository.js** (5% → 80%)
  - Current: Funcs 9%, Lines 6%, Branches 0%
  - Task: Improve test coverage for PostgreSQLUserRepository.js

- **infrastructure/database/PostgreSQLUserSessionRepository.js** (5% → 80%)
  - Current: Funcs 8%, Lines 7%, Branches 0%
  - Task: Improve test coverage for PostgreSQLUserSessionRepository.js

- **infrastructure/database/SQLiteTaskExecutionRepository.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for SQLiteTaskExecutionRepository.js

- **infrastructure/database/SQLiteTaskRepository.js** (2% → 80%)
  - Current: Funcs 3%, Lines 3%, Branches 0%
  - Task: Improve test coverage for SQLiteTaskRepository.js

- **infrastructure/database/SQLiteTaskSuggestionRepository.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for SQLiteTaskSuggestionRepository.js

- **infrastructure/database/SQLiteTaskTemplateRepository.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for SQLiteTaskTemplateRepository.js

- **infrastructure/database/StreamingSessionRepository.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for StreamingSessionRepository.js

- **infrastructure/database/TaskSessionRepository.js** (6% → 80%)
  - Current: Funcs 7%, Lines 9%, Branches 2%
  - Task: Improve test coverage for TaskSessionRepository.js

- **infrastructure/di/ApplicationIntegration.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ApplicationIntegration.js

- **infrastructure/di/ProjectContextService.js** (43% → 80%)
  - Current: Funcs 56%, Lines 42%, Branches 32%
  - Task: Improve test coverage for ProjectContextService.js

- **infrastructure/di/ServiceContainer.js** (48% → 80%)
  - Current: Funcs 53%, Lines 51%, Branches 41%
  - Task: Improve test coverage for ServiceContainer.js

- **infrastructure/external/AIIntegrationManager.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for AIIntegrationManager.js

- **infrastructure/external/AIService.js** (48% → 80%)
  - Current: Funcs 55%, Lines 52%, Branches 37%
  - Task: Improve test coverage for AIService.js

- **infrastructure/external/ArchitectureAnalyzer.js** (2% → 80%)
  - Current: Funcs 3%, Lines 2%, Branches 0%
  - Task: Improve test coverage for ArchitectureAnalyzer.js

- **infrastructure/external/BrowserManager.js** (9% → 80%)
  - Current: Funcs 13%, Lines 8%, Branches 6%
  - Task: Improve test coverage for BrowserManager.js

- **infrastructure/external/CodeQualityAnalyzer.js** (3% → 80%)
  - Current: Funcs 5%, Lines 3%, Branches 0%
  - Task: Improve test coverage for CodeQualityAnalyzer.js

- **infrastructure/external/DependencyAnalyzer.js** (4% → 80%)
  - Current: Funcs 8%, Lines 5%, Branches 0%
  - Task: Improve test coverage for DependencyAnalyzer.js

- **infrastructure/external/DockerService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for DockerService.js

- **infrastructure/external/FileSystemService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for FileSystemService.js

- **infrastructure/external/GitService.js** (2% → 80%)
  - Current: Funcs 3%, Lines 3%, Branches 1%
  - Task: Improve test coverage for GitService.js

- **infrastructure/external/IDEManager.js** (19% → 80%)
  - Current: Funcs 18%, Lines 25%, Branches 14%
  - Task: Improve test coverage for IDEManager.js

- **infrastructure/external/IDEStarter.js** (10% → 80%)
  - Current: Funcs 11%, Lines 18%, Branches 0%
  - Task: Improve test coverage for IDEStarter.js

- **infrastructure/external/PerformanceAnalyzer.js** (3% → 80%)
  - Current: Funcs 6%, Lines 2%, Branches 0%
  - Task: Improve test coverage for PerformanceAnalyzer.js

- **infrastructure/external/ProjectAnalyzer.js** (2% → 80%)
  - Current: Funcs 4%, Lines 3%, Branches 0%
  - Task: Improve test coverage for ProjectAnalyzer.js

- **infrastructure/external/ScriptExecutor.js** (5% → 80%)
  - Current: Funcs 4%, Lines 8%, Branches 4%
  - Task: Improve test coverage for ScriptExecutor.js

- **infrastructure/external/SecurityAnalyzer.js** (3% → 80%)
  - Current: Funcs 5%, Lines 3%, Branches 0%
  - Task: Improve test coverage for SecurityAnalyzer.js

- **infrastructure/external/TaskExecutionEngine.js** (43% → 80%)
  - Current: Funcs 56%, Lines 55%, Branches 17%
  - Task: Improve test coverage for TaskExecutionEngine.js

- **infrastructure/external/TechStackAnalyzer.js** (3% → 80%)
  - Current: Funcs 6%, Lines 3%, Branches 0%
  - Task: Improve test coverage for TechStackAnalyzer.js

- **infrastructure/external/VSCodeExtensionManager.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for VSCodeExtensionManager.js

- **infrastructure/external/VSCodeStarter.js** (9% → 80%)
  - Current: Funcs 12%, Lines 16%, Branches 0%
  - Task: Improve test coverage for VSCodeStarter.js

- **infrastructure/external/task-execution/handlers/EventHandlers.js** (32% → 80%)
  - Current: Funcs 56%, Lines 26%, Branches 14%
  - Task: Improve test coverage for EventHandlers.js

- **infrastructure/external/task-execution/services/AnalysisService.js** (12% → 80%)
  - Current: Funcs 25%, Lines 11%, Branches 0%
  - Task: Improve test coverage for AnalysisService.js

- **infrastructure/external/task-execution/services/CustomTaskService.js** (14% → 80%)
  - Current: Funcs 25%, Lines 16%, Branches 0%
  - Task: Improve test coverage for CustomTaskService.js

- **infrastructure/external/task-execution/services/DeploymentService.js** (4% → 80%)
  - Current: Funcs 6%, Lines 6%, Branches 0%
  - Task: Improve test coverage for DeploymentService.js

- **infrastructure/external/task-execution/services/OptimizationService.js** (2% → 80%)
  - Current: Funcs 0%, Lines 6%, Branches 0%
  - Task: Improve test coverage for OptimizationService.js

- **infrastructure/external/task-execution/services/RefactoringService.js** (7% → 80%)
  - Current: Funcs 13%, Lines 8%, Branches 0%
  - Task: Improve test coverage for RefactoringService.js

- **infrastructure/external/task-execution/services/ScriptService.js** (12% → 80%)
  - Current: Funcs 25%, Lines 11%, Branches 0%
  - Task: Improve test coverage for ScriptService.js

- **infrastructure/external/task-execution/services/SecurityService.js** (1% → 80%)
  - Current: Funcs 0%, Lines 3%, Branches 0%
  - Task: Improve test coverage for SecurityService.js

- **infrastructure/external/task-execution/services/TestingService.js** (7% → 80%)
  - Current: Funcs 14%, Lines 6%, Branches 0%
  - Task: Improve test coverage for TestingService.js

- **infrastructure/external/task-execution/utils/ExecutionUtils.js** (6% → 80%)
  - Current: Funcs 13%, Lines 5%, Branches 0%
  - Task: Improve test coverage for ExecutionUtils.js

- **infrastructure/external/task-execution/utils/FileUtils.js** (5% → 80%)
  - Current: Funcs 7%, Lines 8%, Branches 0%
  - Task: Improve test coverage for FileUtils.js

- **infrastructure/external/task-execution/utils/RefactoringUtils.js** (5% → 80%)
  - Current: Funcs 8%, Lines 7%, Branches 0%
  - Task: Improve test coverage for RefactoringUtils.js

- **infrastructure/external/task-execution/validators/TaskValidator.js** (16% → 80%)
  - Current: Funcs 33%, Lines 12%, Branches 4%
  - Task: Improve test coverage for TaskValidator.js

- **infrastructure/messaging/EventBus.js** (43% → 80%)
  - Current: Funcs 56%, Lines 44%, Branches 30%
  - Task: Improve test coverage for EventBus.js

- **infrastructure/messaging/QueryBus.js** (33% → 80%)
  - Current: Funcs 38%, Lines 48%, Branches 13%
  - Task: Improve test coverage for QueryBus.js

- **infrastructure/security/LogEncryptionService.js** (42% → 80%)
  - Current: Funcs 33%, Lines 42%, Branches 50%
  - Task: Improve test coverage for LogEncryptionService.js

- **infrastructure/security/LogPermissionManager.js** (34% → 80%)
  - Current: Funcs 45%, Lines 29%, Branches 28%
  - Task: Improve test coverage for LogPermissionManager.js

- **infrastructure/strategies/MonorepoStrategy.js** (8% → 80%)
  - Current: Funcs 10%, Lines 9%, Branches 6%
  - Task: Improve test coverage for MonorepoStrategy.js

- **infrastructure/strategies/SingleRepoStrategy.js** (17% → 80%)
  - Current: Funcs 2%, Lines 37%, Branches 13%
  - Task: Improve test coverage for SingleRepoStrategy.js

- **infrastructure/strategies/single-repo/services/dependencyAnalyzer.js** (5% → 80%)
  - Current: Funcs 7%, Lines 7%, Branches 0%
  - Task: Improve test coverage for dependencyAnalyzer.js

- **infrastructure/strategies/single-repo/services/deploymentAnalyzer.js** (23% → 80%)
  - Current: Funcs 50%, Lines 19%, Branches 0%
  - Task: Improve test coverage for deploymentAnalyzer.js

- **infrastructure/strategies/single-repo/services/lintingAnalyzer.js** (25% → 80%)
  - Current: Funcs 50%, Lines 24%, Branches 0%
  - Task: Improve test coverage for lintingAnalyzer.js

- **infrastructure/strategies/single-repo/services/optimizationService.js** (8% → 80%)
  - Current: Funcs 11%, Lines 13%, Branches 0%
  - Task: Improve test coverage for optimizationService.js

- **infrastructure/strategies/single-repo/services/performanceAnalyzer.js** (15% → 80%)
  - Current: Funcs 25%, Lines 21%, Branches 0%
  - Task: Improve test coverage for performanceAnalyzer.js

- **infrastructure/strategies/single-repo/services/projectTypeAnalyzer.js** (11% → 80%)
  - Current: Funcs 20%, Lines 12%, Branches 0%
  - Task: Improve test coverage for projectTypeAnalyzer.js

- **infrastructure/strategies/single-repo/services/recommendationsService.js** (21% → 80%)
  - Current: Funcs 50%, Lines 12%, Branches 0%
  - Task: Improve test coverage for recommendationsService.js

- **infrastructure/strategies/single-repo/services/securityAnalyzer.js** (15% → 80%)
  - Current: Funcs 25%, Lines 21%, Branches 0%
  - Task: Improve test coverage for securityAnalyzer.js

- **infrastructure/strategies/single-repo/services/structureAnalyzer.js** (28% → 80%)
  - Current: Funcs 50%, Lines 35%, Branches 0%
  - Task: Improve test coverage for structureAnalyzer.js

- **infrastructure/strategies/single-repo/services/testingAnalyzer.js** (13% → 80%)
  - Current: Funcs 17%, Lines 21%, Branches 0%
  - Task: Improve test coverage for testingAnalyzer.js

- **infrastructure/strategies/single-repo/utils/directoryScanner.js** (14% → 80%)
  - Current: Funcs 25%, Lines 18%, Branches 0%
  - Task: Improve test coverage for directoryScanner.js

- **infrastructure/strategies/single-repo/utils/fileUtils.js** (8% → 80%)
  - Current: Funcs 14%, Lines 10%, Branches 0%
  - Task: Improve test coverage for fileUtils.js

- **infrastructure/strategies/single-repo/validators/repositoryTypeValidator.js** (25% → 80%)
  - Current: Funcs 50%, Lines 24%, Branches 0%
  - Task: Improve test coverage for repositoryTypeValidator.js

- **infrastructure/templates/AIPrompts.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for AIPrompts.js

- **infrastructure/templates/ScriptTemplates.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ScriptTemplates.js

- **infrastructure/templates/TaskTemplates.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskTemplates.js

- **infrastructure/templates/modules/automationTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for automationTemplates.js

- **infrastructure/templates/modules/buildTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for buildTemplates.js

- **infrastructure/templates/modules/databaseTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for databaseTemplates.js

- **infrastructure/templates/modules/deployTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for deployTemplates.js

- **infrastructure/templates/modules/developmentTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for developmentTemplates.js

- **infrastructure/templates/modules/generator.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for generator.js

- **infrastructure/templates/modules/maintenanceTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for maintenanceTemplates.js

- **infrastructure/templates/modules/monitoringTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for monitoringTemplates.js

- **infrastructure/templates/modules/search.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for search.js

- **infrastructure/templates/modules/securityTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for securityTemplates.js

- **infrastructure/templates/modules/testTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for testTemplates.js

- **infrastructure/templates/modules/utilityTemplates.js** (33% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 100%
  - Task: Improve test coverage for utilityTemplates.js

- **infrastructure/templates/modules/validation.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for validation.js

- **presentation/api/AnalysisController.js** (6% → 80%)
  - Current: Funcs 7%, Lines 7%, Branches 4%
  - Task: Improve test coverage for AnalysisController.js

- **presentation/api/AuthController.js** (6% → 80%)
  - Current: Funcs 10%, Lines 7%, Branches 0%
  - Task: Improve test coverage for AuthController.js

- **presentation/api/AutoFinishController.js** (5% → 80%)
  - Current: Funcs 8%, Lines 5%, Branches 2%
  - Task: Improve test coverage for AutoFinishController.js

- **presentation/api/AutoModeController.js** (7% → 80%)
  - Current: Funcs 13%, Lines 6%, Branches 1%
  - Task: Improve test coverage for AutoModeController.js

- **presentation/api/ChatController.js** (5% → 80%)
  - Current: Funcs 7%, Lines 8%, Branches 0%
  - Task: Improve test coverage for ChatController.js

- **presentation/api/CodeExplorerController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for CodeExplorerController.js

- **presentation/api/ContentLibraryController.js** (2% → 80%)
  - Current: Funcs 4%, Lines 3%, Branches 0%
  - Task: Improve test coverage for ContentLibraryController.js

- **presentation/api/DocumentationController.js** (1% → 80%)
  - Current: Funcs 2%, Lines 2%, Branches 0%
  - Task: Improve test coverage for DocumentationController.js

- **presentation/api/GitController.js** (6% → 80%)
  - Current: Funcs 10%, Lines 3%, Branches 4%
  - Task: Improve test coverage for GitController.js

- **presentation/api/IDEController.js** (2% → 80%)
  - Current: Funcs 2%, Lines 3%, Branches 0%
  - Task: Improve test coverage for IDEController.js

- **presentation/api/IDEMirrorController.js** (12% → 80%)
  - Current: Funcs 8%, Lines 21%, Branches 7%
  - Task: Improve test coverage for IDEMirrorController.js

- **presentation/api/ProjectAnalysisController.js** (4% → 80%)
  - Current: Funcs 8%, Lines 4%, Branches 0%
  - Task: Improve test coverage for ProjectAnalysisController.js

- **presentation/api/ScriptGenerationController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for ScriptGenerationController.js

- **presentation/api/StreamingController.js** (5% → 80%)
  - Current: Funcs 9%, Lines 6%, Branches 0%
  - Task: Improve test coverage for StreamingController.js

- **presentation/api/TaskAnalysisController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskAnalysisController.js

- **presentation/api/TaskController.js** (3% → 80%)
  - Current: Funcs 4%, Lines 5%, Branches 0%
  - Task: Improve test coverage for TaskController.js

- **presentation/api/TaskExecutionController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskExecutionController.js

- **presentation/api/TaskSuggestionController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskSuggestionController.js

- **presentation/api/VibeCoderAutoRefactorController.js** (35% → 80%)
  - Current: Funcs 50%, Lines 29%, Branches 25%
  - Task: Improve test coverage for VibeCoderAutoRefactorController.js

- **presentation/api/controllers/TestManagementController.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TestManagementController.js

- **presentation/websocket/TaskNotificationService.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskNotificationService.js

- **presentation/websocket/TaskProgressTracker.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskProgressTracker.js

- **presentation/websocket/TaskWebSocket.js** (0% → 80%)
  - Current: Funcs 0%, Lines 0%, Branches 0%
  - Task: Improve test coverage for TaskWebSocket.js

- **presentation/websocket/WebSocketManager.js** (6% → 80%)
  - Current: Funcs 9%, Lines 9%, Branches 0%
  - Task: Improve test coverage for WebSocketManager.js

### 🟡 Medium Priority

- **application/commands/CreateTaskCommand.js** (56% → 80%)
  - Task: Improve test coverage for CreateTaskCommand.js

- **application/commands/UpdateTestStatusCommand.js** (64% → 80%)
  - Task: Improve test coverage for UpdateTestStatusCommand.js

- **application/handlers/generate/index.js** (67% → 80%)
  - Task: Improve test coverage for index.js

- **domain/entities/Task.js** (62% → 80%)
  - Task: Improve test coverage for Task.js

- **domain/repositories/TestMetadataRepository.js** (65% → 80%)
  - Task: Improve test coverage for TestMetadataRepository.js

- **domain/services/AdvancedAnalysisService.js** (69% → 80%)
  - Task: Improve test coverage for AdvancedAnalysisService.js

- **domain/services/TestManagementService.js** (54% → 80%)
  - Task: Improve test coverage for TestManagementService.js

- **domain/value-objects/TaskPriority.js** (57% → 80%)
  - Task: Improve test coverage for TaskPriority.js

- **domain/value-objects/TaskStatus.js** (52% → 80%)
  - Task: Improve test coverage for TaskStatus.js

- **domain/value-objects/TaskType.js** (56% → 80%)
  - Task: Improve test coverage for TaskType.js

- **infrastructure/database/DatabaseConnection.js** (50% → 80%)
  - Task: Improve test coverage for DatabaseConnection.js

- **infrastructure/database/TaskDatabase.js** (59% → 80%)
  - Task: Improve test coverage for TaskDatabase.js

- **infrastructure/external/IDEDetector.js** (64% → 80%)
  - Task: Improve test coverage for IDEDetector.js

- **infrastructure/external/VSCodeDetector.js** (66% → 80%)
  - Task: Improve test coverage for VSCodeDetector.js

- **infrastructure/external/task-execution/index.js** (67% → 80%)
  - Task: Improve test coverage for index.js

- **infrastructure/messaging/CommandBus.js** (53% → 80%)
  - Task: Improve test coverage for CommandBus.js

- **infrastructure/strategies/single-repo/services/buildToolsAnalyzer.js** (67% → 80%)
  - Task: Improve test coverage for buildToolsAnalyzer.js

- **infrastructure/templates/modules/constants.js** (67% → 80%)
  - Task: Improve test coverage for constants.js

- **infrastructure/templates/modules/index.js** (67% → 80%)
  - Task: Improve test coverage for index.js

- **presentation/api/handlers/DocsTasksHandler.js** (63% → 80%)
  - Task: Improve test coverage for DocsTasksHandler.js

