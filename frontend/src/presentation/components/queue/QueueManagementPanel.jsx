/**
 * QueueManagementPanel - Main queue management interface
 * Provides comprehensive queue monitoring, control, and step progress tracking
 */

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/infrastructure/logging/Logger';
import QueueRepository from '@/infrastructure/repositories/QueueRepository.jsx';
import WebSocketService from '@/infrastructure/services/WebSocketService.jsx';
import { useActiveIDE } from '@/infrastructure/stores/selectors/ProjectSelectors.jsx';
import ActiveTaskItem from './ActiveTaskItem.jsx';
import QueueItem from './QueueItem.jsx';
import QueueControls from './QueueControls.jsx';
import StepTimeline from './StepTimeline.jsx';
import QueueHistoryPanel from './QueueHistoryPanel.jsx';
import '@/css/panel/queue-panel.css';

const QueueManagementPanel = ({ eventBus, activePort }) => {
    const [queueStatus, setQueueStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [stepProgress, setStepProgress] = useState(null);

    const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

    const queueRepository = new QueueRepository();
    const webSocketService = WebSocketService; // Use the singleton instance


    const { projectId } = useActiveIDE();

    /**
     * Load queue status
     */
    const loadQueueStatus = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            logger.debug('Loading queue status', { projectId });
            const status = await queueRepository.getQueueStatus(projectId);
            setQueueStatus(status);

            logger.debug('Queue status loaded', { 
                projectId, 
                totalItems: status?.queue?.total || 0,
                running: status?.queue?.running || 0,
                queued: status?.queue?.queued || 0
            });

        } catch (error) {
            logger.error('Failed to load queue status', { projectId, error: error.message });
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    // Load queue status when projectId changes
    useEffect(() => {
        if (projectId) {
            logger.debug('Project ID changed, loading queue status', { projectId });
            loadQueueStatus();
        }
    }, [projectId, loadQueueStatus]);

    /**
     * Load step progress for selected task
     */
    const loadStepProgress = useCallback(async (taskId) => {
        if (!taskId) return;

        try {
            logger.debug('Loading step progress', { projectId, taskId });
            const progress = await queueRepository.getStepProgress(projectId, taskId);
            setStepProgress(progress);

            logger.debug('Step progress loaded', { 
                projectId, 
                taskId, 
                currentStep: progress?.currentStep,
                progressPercentage: progress?.progressPercentage
            });

        } catch (error) {
            logger.error('Failed to load step progress', { 
                projectId, 
                taskId, 
                error: error.message 
            });
        }
    }, [projectId]);

    /**
     * Cancel queue item
     */
    const handleCancelItem = async (itemId) => {
        try {
            logger.info('Cancelling queue item', { projectId, itemId });
            await queueRepository.cancelQueueItem(projectId, itemId);
            
            // Reload queue status
            await loadQueueStatus();
            
            logger.info('Queue item cancelled successfully', { projectId, itemId });

        } catch (error) {
            logger.error('Failed to cancel queue item', { 
                projectId, 
                itemId, 
                error: error.message 
            });
            setError(error.message);
        }
    };

    /**
     * Update queue item priority
     */
    const handleUpdatePriority = async (itemId, priority) => {
        try {
            logger.info('Updating queue item priority', { projectId, itemId, priority });
            await queueRepository.updateQueueItemPriority(projectId, itemId, priority);
            
            // Reload queue status
            await loadQueueStatus();
            
            logger.info('Queue item priority updated successfully', { 
                projectId, 
                itemId, 
                priority 
            });

        } catch (error) {
            logger.error('Failed to update queue item priority', { 
                projectId, 
                itemId, 
                priority, 
                error: error.message 
            });
            setError(error.message);
        }
    };

    /**
     * Toggle step status
     */
    const handleToggleStepStatus = async (stepId, action) => {
        if (!selectedTask) return;

        try {
            logger.info('Toggling step status', { 
                projectId, 
                taskId: selectedTask.id, 
                stepId, 
                action 
            });
            
            await queueRepository.toggleStepStatus(projectId, selectedTask.id, stepId, action);
            
            // Reload step progress
            await loadStepProgress(selectedTask.id);
            
            logger.info('Step status toggled successfully', { 
                projectId, 
                taskId: selectedTask.id, 
                stepId, 
                action 
            });

        } catch (error) {
            logger.error('Failed to toggle step status', { 
                projectId, 
                taskId: selectedTask.id, 
                stepId, 
                action, 
                error: error.message 
            });
            setError(error.message);
        }
    };

    /**
     * Clear completed items
     */
    const handleClearCompleted = async () => {
        try {
            logger.info('Clearing completed items', { projectId });
            await queueRepository.clearCompletedItems(projectId);
            
            // Reload queue status
            await loadQueueStatus();
            
            logger.info('Completed items cleared successfully', { projectId });

        } catch (error) {
            logger.error('Failed to clear completed items', { 
                projectId, 
                error: error.message 
            });
            setError(error.message);
        }
    };

    /**
     * Handle task selection
     */
    const handleTaskSelect = (task) => {
        setSelectedTask(task);
        if (task) {
            loadStepProgress(task.id);
        } else {
            setStepProgress(null);
        }
    };

    /**
     * Setup WebSocket event listeners
     */
    useEffect(() => {
        const setupWebSocket = async () => {
            try {
                await webSocketService.connect();
                
                // Subscribe to queue events
                webSocketService.on('queue:updated', (data) => {
                    logger.debug('Queue updated via WebSocket', { projectId, data });
                    loadQueueStatus();
                });

                webSocketService.on('queue:item:added', (data) => {
                    logger.debug('Queue item added via WebSocket', { projectId, data });
                    loadQueueStatus();
                });

                webSocketService.on('queue:item:cancelled', (data) => {
                    logger.debug('Queue item cancelled via WebSocket', { projectId, data });
                    loadQueueStatus();
                });

                webSocketService.on('queue:item:updated', (data) => {
                    logger.debug('Queue item updated via WebSocket', { projectId, data });
                    loadQueueStatus();
                });

                // Subscribe to step progress events
                webSocketService.on('workflow:step:progress', (data) => {
                    logger.debug('Step progress updated via WebSocket', { projectId, data });
                    if (selectedTask && data.taskId === selectedTask.id) {
                        loadStepProgress(selectedTask.id);
                    }
                });

                webSocketService.on('workflow:step:started', (data) => {
                    logger.debug('Step started via WebSocket', { projectId, data });
                    if (selectedTask && data.taskId === selectedTask.id) {
                        loadStepProgress(selectedTask.id);
                    }
                });

                webSocketService.on('workflow:step:completed', (data) => {
                    logger.debug('Step completed via WebSocket', { projectId, data });
                    if (selectedTask && data.taskId === selectedTask.id) {
                        loadStepProgress(selectedTask.id);
                    }
                });

                logger.info('WebSocket event listeners setup complete', { projectId });

            } catch (error) {
                logger.error('Failed to setup WebSocket', { projectId, error: error.message });
            }
        };

        setupWebSocket();

        return () => {
            // Cleanup WebSocket listeners
            webSocketService.off('queue:updated');
            webSocketService.off('queue:item:added');
            webSocketService.off('queue:item:cancelled');
            webSocketService.off('queue:item:updated');
            webSocketService.off('workflow:step:progress');
            webSocketService.off('workflow:step:started');
            webSocketService.off('workflow:step:completed');
        };
    }, [projectId, selectedTask]);



    /**
     * Initial load
     */
    useEffect(() => {
        loadQueueStatus();
    }, [loadQueueStatus]);

    /**
     * Handle refresh button click
     */
    const handleRefresh = () => {
        loadQueueStatus();
        if (selectedTask) {
            loadStepProgress(selectedTask.id);
        }
    };



    if (loading && !queueStatus) {
        return (
            <div className="queue-panel">
                <div className="queue-panel-header">
                    <h3>🔄 Queue Management</h3>
                </div>
                <div className="queue-panel-content">
                    <div className="loading-spinner">Loading queue status...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="queue-panel">
                <div className="queue-panel-header">
                    <h3>🔄 Queue Management</h3>
                </div>
                <div className="queue-panel-content">
                    <div className="error-message">
                        <p>❌ Error loading queue status: {error}</p>
                        <button onClick={loadQueueStatus} className="btn-retry">
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const activeItems = queueStatus?.queue?.active || [];
    const completedItems = queueStatus?.queue?.completed || [];
    const statistics = queueStatus?.statistics || {};

    return (
        <div className="queue-panel">
            <div className="queue-panel-header">
                <h3>🔄 Queue Management</h3>
                <div className="queue-panel-controls">
                    <button 
                        onClick={handleRefresh} 
                        className="btn-refresh"
                        title="Refresh queue status"
                    >
                        🔄
                    </button>

                </div>
            </div>

            <div className="queue-panel-content">
                {/* Tab Navigation */}
                <div className="queue-tabs">
                    <button 
                        className={`queue-tab ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        🟢 Active Tasks
                    </button>
                    <button 
                        className={`queue-tab ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        📚 History
                    </button>
                </div>

                {/* Active Tab Content */}
                {activeTab === 'active' && (
                    <>
                        {/* Queue Statistics */}
                        <div className="queue-statistics">
                            <div className="stat-item">
                                <span className="stat-label">Total:</span>
                                <span className="stat-value">{statistics.totalItems || 0}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Running:</span>
                                <span className="stat-value running">{statistics.running || 0}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Queued:</span>
                                <span className="stat-value queued">{statistics.queued || 0}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Completed:</span>
                                <span className="stat-value completed">{statistics.completed || 0}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Failed:</span>
                                <span className="stat-value failed">{statistics.failed || 0}</span>
                            </div>
                        </div>

                        {/* Active Tasks */}
                        <div className="queue-section">
                            <h4>🟢 Active Tasks ({activeItems.length})</h4>
                            {activeItems.length === 0 ? (
                                <div className="empty-state">
                                    <p>No active tasks</p>
                                </div>
                            ) : (
                                <div className="queue-items">
                                    {activeItems.map((item) => (
                                        <ActiveTaskItem
                                            key={item.id}
                                            item={item}
                                            isSelected={selectedTask?.id === item.id}
                                            onSelect={() => handleTaskSelect(item)}
                                            onCancel={() => handleCancelItem(item.id)}
                                            onUpdatePriority={(priority) => handleUpdatePriority(item.id, priority)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Selected Task Step Progress */}
                        {selectedTask && stepProgress && (
                            <div className="queue-section">
                                <h4>📊 Step Progress: {selectedTask.workflow?.name || selectedTask.id}</h4>
                                <StepTimeline
                                    stepProgress={stepProgress}
                                    onToggleStepStatus={handleToggleStepStatus}
                                    taskId={selectedTask.id}
                                    projectId={projectId}
                                    workflowType={selectedTask.workflow?.type}
                                />
                            </div>
                        )}

                        {/* Completed Tasks */}
                        {completedItems.length > 0 && (
                            <div className="queue-section">
                                <div className="section-header">
                                    <h4>✅ Completed Tasks ({completedItems.length})</h4>
                                    <button 
                                        onClick={handleClearCompleted} 
                                        className="btn-clear-completed"
                                        title="Clear completed items"
                                    >
                                        🗑️ Clear
                                    </button>
                                </div>
                                <div className="queue-items">
                                    {completedItems.slice(0, 5).map((item) => (
                                        <QueueItem
                                            key={item.id}
                                            item={item}
                                            showActions={false}
                                        />
                                    ))}
                                    {completedItems.length > 5 && (
                                        <div className="more-items">
                                            <p>... and {completedItems.length - 5} more completed items</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Queue Controls */}
                        <QueueControls
                            onRefresh={handleRefresh}
                            onClearCompleted={handleClearCompleted}
                            hasCompletedItems={completedItems.length > 0}
                        />
                    </>
                )}

                {/* History Tab Content */}
                {activeTab === 'history' && (
                    <QueueHistoryPanel 
                        eventBus={eventBus}
                        activePort={activePort}
                    />
                )}
            </div>
        </div>
    );
};

export default QueueManagementPanel; 