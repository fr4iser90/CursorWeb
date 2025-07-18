/**
 * PerformanceService - Domain service for performance analysis
 */
class PerformanceService {
  constructor(performanceAnalyzer, eventBus, logger, analysisOutputService, analysisRepository) {
    this.performanceAnalyzer = performanceAnalyzer;
    this.eventBus = eventBus || { emit: () => {} };
    this.logger = logger || { info: () => {}, error: () => {}, warn: () => {} };
    this.analysisOutputService = analysisOutputService;
    this.analysisRepository = analysisRepository;
  }

  /**
   * Analyze performance for a project
   * @param {string} projectPath - Project directory path
   * @param {Object} options - Analysis options
   * @param {string} projectId - Project ID
   * @returns {Promise<Object>} Performance analysis results
   */
  async analyzePerformance(projectPath, options = {}, projectId) {
    try {
      this.logger.info(`Starting performance analysis for project`);

      // Check for existing recent analysis
      const existingAnalysis = await this.checkExistingAnalysis(projectId, 'performance');
      if (existingAnalysis && !options.forceRefresh) {
        const shouldSkip = await this.shouldSkipAnalysis(existingAnalysis, 'performance');
        if (shouldSkip) {
          this.logger.info(`Recent performance analysis found, skipping`);
          return existingAnalysis.data || existingAnalysis.result_data;
        }
      }

      const analysis = await this.performanceAnalyzer.analyzePerformance(projectPath, options);

      // Save to file
      if (this.analysisOutputService) {
        const fileResult = await this.analysisOutputService.saveAnalysisResult(
          projectId, 
          'performance', 
          analysis
        );
        
        // Save to database
        if (this.analysisRepository) {
          const AnalysisResult = require('@entities/AnalysisResult');
const Logger = require('@logging/Logger');
const logger = new Logger('Logger');
          const analysisResult = AnalysisResult.create(
            projectId, 
            'performance', 
            analysis, 
            fileResult.filepath
          );
          await this.analysisRepository.save(analysisResult);
        }
      }

      this.logger.info(`Performance analysis completed for project`);
      this.eventBus.emit('performance:analysis:completed', { projectPath, analysis, projectId });

      return analysis;
    } catch (error) {
      this.logger.error(`Performance analysis failed:`, error.message);
      this.eventBus.emit('performance:analysis:failed', { projectPath, error: error.message });
      throw error;
    }
  }

  /**
   * Analyze build performance
   * @param {string} projectPath - Project directory path
   * @returns {Promise<Object>} Build performance analysis
   */
  async analyzeBuildPerformance(projectPath) {
    try {
      return await this.performanceAnalyzer.analyzeBuildPerformance(projectPath);
    } catch (error) {
      this.logger.error(`Build performance analysis failed:`, error);
      throw error;
    }
  }

  /**
   * Analyze bundle size
   * @param {string} projectPath - Project directory path
   * @returns {Promise<Object>} Bundle size analysis
   */
  async analyzeBundleSize(projectPath) {
    try {
      return await this.performanceAnalyzer.analyzeBundleSize(projectPath);
    } catch (error) {
      this.logger.error(`Bundle size analysis failed:`, error);
      throw error;
    }
  }

  /**
   * Analyze runtime performance
   * @param {string} projectPath - Project directory path
   * @returns {Promise<Object>} Runtime performance analysis
   */
  async analyzeRuntimePerformance(projectPath) {
    try {
      return await this.performanceAnalyzer.analyzeRuntimePerformance(projectPath);
    } catch (error) {
      this.logger.error(`Runtime performance analysis failed:`, error);
      throw error;
    }
  }

  /**
   * Identify optimization opportunities
   * @param {string} projectPath - Project directory path
   * @returns {Promise<Array>} Optimization opportunities
   */
  async identifyOptimizations(projectPath) {
    try {
      return await this.performanceAnalyzer.identifyOptimizations(projectPath);
    } catch (error) {
      this.logger.error(`Optimization identification failed:`, error);
      throw error;
    }
  }

  /**
   * Identify performance bottlenecks
   * @param {string} projectPath - Project directory path
   * @returns {Promise<Array>} Performance bottlenecks
   */
  async identifyBottlenecks(projectPath) {
    try {
      return await this.performanceAnalyzer.identifyBottlenecks(projectPath);
    } catch (error) {
      this.logger.error(`Bottleneck identification failed:`, error);
      throw error;
    }
  }

  /**
   * Generate performance recommendations
   * @param {Object} analysis - Performance analysis results
   * @returns {Promise<Array>} Performance recommendations
   */
  async generateRecommendations(analysis) {
    try {
      return await this.performanceAnalyzer.generatePerformanceRecommendations(analysis);
    } catch (error) {
      this.logger.error(`Performance recommendation generation failed:`, error);
      throw error;
    }
  }

  /**
   * Get performance score
   * @param {Object} analysis - Performance analysis results
   * @returns {number} Performance score (0-100)
   */
  getPerformanceScore(analysis) {
    // Use the performanceScore that's already calculated by the analyzer
    return analysis.performanceScore || 0;
  }

  /**
   * Get performance level based on score
   * @param {number} score - Performance score
   * @returns {string} Performance level
   */
  getPerformanceLevel(score) {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'fair';
    if (score >= 60) return 'poor';
    return 'critical';
  }

  /**
   * Get critical issues from analysis
   * @param {Object} analysis - Performance analysis results
   * @returns {Array} Critical issues
   */
  getCriticalIssues(analysis) {
    if (!analysis || !analysis.issues) return [];
    return analysis.issues.filter(issue => issue.severity === 'critical');
  }

  /**
   * Get performance summary
   * @param {Object} analysis - Performance analysis results
   * @returns {Object} Performance summary
   */
  getPerformanceSummary(analysis) {
    if (!analysis) return {};
    
    const issues = analysis.issues || [];
    const criticalIssues = issues.filter(issue => issue.severity === 'critical');
    const highIssues = issues.filter(issue => issue.severity === 'high');
    const mediumIssues = issues.filter(issue => issue.severity === 'medium');
    const lowIssues = issues.filter(issue => issue.severity === 'low');
    
    return {
      totalIssues: issues.length,
      criticalIssues: criticalIssues.length,
      highIssues: highIssues.length,
      mediumIssues: mediumIssues.length,
      lowIssues: lowIssues.length,
      overallScore: analysis.performanceScore || 0,
      performanceLevel: this.getPerformanceLevel(analysis.performanceScore || 0)
    };
  }

  /**
   * Check if build time is acceptable
   * @param {Object} analysis - Performance analysis results
   * @returns {boolean} Build time is acceptable
   */
  isBuildTimeAcceptable(analysis) {
    const buildTime = analysis.buildPerformance.buildTime;
    return buildTime === null || buildTime < 60000; // Less than 1 minute
  }

  /**
   * Check if bundle size is acceptable
   * @param {Object} analysis - Performance analysis results
   * @returns {boolean} Bundle size is acceptable
   */
  isBundleSizeAcceptable(analysis) {
    const totalSize = analysis.bundleAnalysis.totalSize;
    return totalSize < 5000000; // Less than 5MB
  }

  /**
   * Check if analysis already exists for this project
   * @param {string} projectId - Project ID
   * @param {string} analysisType - Analysis type
   * @returns {Promise<Object|null>} Existing analysis or null
   */
  async checkExistingAnalysis(projectId, analysisType) {
    try {
      if (!this.analysisRepository) return null;
      
      const existingAnalyses = await this.analysisRepository.findByProjectIdAndType(projectId, analysisType);
      return existingAnalyses.length > 0 ? existingAnalyses[0] : null;
    } catch (error) {
      this.logger.warn(`Failed to check existing analysis:`, error.message);
      return null;
    }
  }

  /**
   * Determine if analysis should be skipped based on recency and data changes
   * @param {Object} existingAnalysis - Existing analysis data
   * @param {string} analysisType - Analysis type
   * @returns {Promise<boolean>} Whether analysis should be skipped
   */
  async shouldSkipAnalysis(existingAnalysis, analysisType) {
    if (!existingAnalysis) return false;

    // Check if analysis is recent (within last 2 hours for performance)
    const lastUpdate = new Date(existingAnalysis.timestamp || existingAnalysis.created_at);
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    
    if (lastUpdate > twoHoursAgo) {
      this.logger.info(`Analysis is recent (${analysisType}), considering skip`);
      return true;
    }

    // Check if analysis is older than 24 hours (force refresh)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (lastUpdate < oneDayAgo) {
      this.logger.info(`Analysis is older than 24 hours (${analysisType}), forcing refresh`);
      return false;
    }

    return false;
  }
}

module.exports = PerformanceService; 