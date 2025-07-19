# Prompt: Create Comprehensive Development Task Plan (Database-First)

## Goal
Generate a complete, actionable development plan that will be parsed into a database task with all necessary details for AI auto-implementation, tracking, and execution.

## Phase
Check Plan against codebase, collect all data u need!
Create new Plan/Implementation [Name]-implementation.md in docs/09_roadmap/features/[category]/[name]/ with the following structure:
**Note**: The system automatically creates a hierarchical folder structure: Category → Task Name → Implementation files

## Template Structure

> **File Pattern Requirement:**  
> All Index, Implementation and Phase files must always be created using this pattern:
> - **Index**: docs/09_roadmap/features/[category]/[name]/[name]-index.md  
> If a file is missing, it must be created automatically. This pattern is required for orchestration and grouping in the system.  
> - **Implementation**: docs/09_roadmap/features/[category]/[name]/[name]-implementation.md  
> - **Phase**: docs/09_roadmap/features/[category]/[name]/[name]-phase-[number].md  


### 1. Project Overview
- **Feature/Component Name**: Preview Port Configuration
- **Priority**: High
- **Category**: frontend
- **Estimated Time**: 4 hours
- **Dependencies**: Existing PreviewComponent, IDEStore, APIChatRepository
- **Related Issues**: Port detection currently returns null when package.json ports are removed

### 2. Technical Requirements
- **Tech Stack**: React, Zustand, CSS, JavaScript
- **Architecture Pattern**: Component-based with state management
- **Database Changes**: None required (uses existing project commands in database)
- **API Changes**: Extend APIChatRepository with project command execution methods
- **Frontend Changes**: PreviewComponent header modification, IDEStore enhancement, CSS styling, new command buttons
- **Backend Changes**: None required (uses existing terminal execution services)

### 3. File Impact Analysis
#### Files to Modify:
- [ ] `frontend/src/presentation/components/chat/main/PreviewComponent.jsx` - Add port input field and configuration logic
- [ ] `frontend/src/infrastructure/stores/IDEStore.jsx` - Add custom port management functionality
- [ ] `frontend/src/css/main/preview.css` - Add styling for port configuration UI
- [ ] `frontend/src/infrastructure/repositories/APIChatRepository.jsx` - Add port validation method and project command methods

#### Files to Create:
- [ ] `frontend/src/presentation/components/chat/main/PortConfigInput.jsx` - Reusable port input component
- [ ] `frontend/src/hooks/usePortConfiguration.js` - Custom hook for port management
- [ ] `frontend/src/presentation/components/chat/main/ProjectCommandButtons.jsx` - Start/Stop command buttons

#### Files to Delete:
- [ ] None

### 4. Implementation Phases

#### Phase 1: Foundation Setup (1 hour)
- [ ] Create PortConfigInput component
- [ ] Create usePortConfiguration hook
- [ ] Create ProjectCommandButtons component
- [ ] Add port configuration methods to IDEStore
- [ ] Set up basic styling structure

#### Phase 2: Core Implementation (2 hours)
- [ ] Integrate port input field into PreviewComponent header
- [ ] Implement port validation logic
- [ ] Add port persistence in IDEStore
- [ ] Connect port configuration with preview loading
- [ ] Integrate start/stop command buttons
- [ ] Add project command execution functionality

#### Phase 3: Integration (0.5 hours)
- [ ] Test port configuration with existing preview system
- [ ] Ensure proper error handling
- [ ] Validate port input with backend endpoints
- [ ] Test fallback behavior
- [ ] Test start/stop command execution

#### Phase 4: Testing & Documentation (0.5 hours)
- [ ] Write unit tests for new components
- [ ] Test port configuration scenarios
- [ ] Test command execution scenarios
- [ ] Update component documentation
- [ ] Create user guide for port configuration

#### Phase 5: Deployment & Validation (0 hours)
- [ ] No deployment required (frontend-only change)
- [ ] Validate in development environment
- [ ] Test with different port scenarios
- [ ] Test with different project commands
- [ ] Ensure no breaking changes

### 5. Code Standards & Patterns
- **Coding Style**: ESLint with existing project rules, Prettier formatting
- **Naming Conventions**: camelCase for variables/functions, PascalCase for classes, kebab-case for files
- **Error Handling**: Try-catch with specific error types, proper error logging
- **Logging**: Winston logger with structured logging, different levels for operations
- **Testing**: Jest framework, 90% coverage requirement
- **Documentation**: JSDoc for all public methods, README updates

### 6. Security Considerations
- [ ] Input validation for port numbers (1-65535 range)
- [ ] Sanitization of port input to prevent XSS
- [ ] Rate limiting for port validation requests
- [ ] Audit logging for port configuration changes
- [ ] Protection against malicious port inputs

### 7. Performance Requirements
- **Response Time**: < 100ms for port validation
- **Throughput**: Handle multiple port changes per minute
- **Memory Usage**: < 1MB additional memory
- **Database Queries**: None (localStorage-based)
- **Caching Strategy**: Cache validated ports in IDEStore

### 8. Testing Strategy

#### Unit Tests:
- [ ] Test file: `tests/unit/PortConfigInput.test.jsx`
- [ ] Test cases: Port validation, input formatting, error states
- [ ] Mock requirements: IDEStore, APIChatRepository

#### Integration Tests:
- [ ] Test file: `tests/integration/PreviewComponent.test.jsx`
- [ ] Test scenarios: Port configuration integration, preview loading with custom port
- [ ] Test data: Various port numbers, invalid inputs

#### E2E Tests:
- [ ] Test file: `tests/e2e/preview-port-configuration.test.js`
- [ ] User flows: Setting custom port, preview loading, error handling
- [ ] Browser compatibility: Chrome, Firefox compatibility

### 9. Documentation Requirements

#### Code Documentation:
- [ ] JSDoc comments for PortConfigInput component
- [ ] JSDoc comments for usePortConfiguration hook
- [ ] README updates with port configuration feature
- [ ] Component usage examples

#### User Documentation:
- [ ] User guide for port configuration feature
- [ ] Troubleshooting guide for port issues
- [ ] Feature documentation for developers
- [ ] Migration guide (if applicable)

### 10. Deployment Checklist

#### Pre-deployment:
- [ ] All tests passing (unit, integration, e2e)
- [ ] Code review completed and approved
- [ ] Documentation updated and reviewed
- [ ] Security scan passed
- [ ] Performance benchmarks met

#### Deployment:
- [ ] No database migrations required
- [ ] No environment variables needed
- [ ] No configuration updates required
- [ ] No service restarts needed
- [ ] Health checks remain unchanged

#### Post-deployment:
- [ ] Monitor preview functionality
- [ ] Verify port configuration works
- [ ] Performance monitoring active
- [ ] User feedback collection enabled

### 11. Rollback Plan
- [ ] No database rollback needed
- [ ] Component rollback procedure documented
- [ ] Service rollback procedure documented
- [ ] Communication plan for stakeholders

### 12. Success Criteria
- [ ] Port input field appears in preview header when no port is detected
- [ ] Users can enter custom port numbers
- [ ] Port validation works correctly
- [ ] Preview loads with custom port
- [ ] Port configuration persists across sessions
- [ ] Error handling works for invalid ports
- [ ] All tests pass (unit, integration, e2e)
- [ ] Performance requirements met
- [ ] Security requirements satisfied
- [ ] Documentation complete and accurate

### 13. Risk Assessment

#### High Risk:
- [ ] Port conflicts with existing services - Mitigation: Validate port availability before use
- [ ] Breaking existing preview functionality - Mitigation: Thorough testing and fallback mechanisms

#### Medium Risk:
- [ ] User confusion with port configuration - Mitigation: Clear UI and documentation
- [ ] Performance impact from port validation - Mitigation: Efficient validation logic

#### Low Risk:
- [ ] Styling inconsistencies - Mitigation: Follow existing design patterns
- [ ] Browser compatibility issues - Mitigation: Test across major browsers

### 14. AI Auto-Implementation Instructions

#### Task Database Fields:
- **source_type**: 'markdown_doc'
- **source_path**: 'docs/09_roadmap/features/frontend/preview-port-configuration/preview-port-configuration-implementation.md'
- **category**: 'frontend'
- **automation_level**: 'semi_auto'
- **confirmation_required**: true
- **max_attempts**: 3
- **git_branch_required**: true
- **new_chat_required**: false

#### AI Execution Context:
```json
{
  "requires_new_chat": false,
  "git_branch_name": "feature/preview-port-configuration",
  "confirmation_keywords": ["fertig", "done", "complete"],
  "fallback_detection": true,
  "max_confirmation_attempts": 3,
  "timeout_seconds": 300
}
```

#### Success Indicators:
- [ ] Port input field appears in preview header
- [ ] Port validation works correctly
- [ ] Preview loads with custom port
- [ ] All tests pass
- [ ] No build errors
- [ ] Code follows standards
- [ ] Documentation updated

### 15. References & Resources
- **Technical Documentation**: Existing PreviewComponent.jsx, IDEStore.jsx
- **API References**: APIChatRepository.jsx for port validation
- **Design Patterns**: React hooks pattern, Zustand state management
- **Best Practices**: React component composition, error handling patterns
- **Similar Implementations**: Existing port management in IDEStore
- **Database Schema**: Projects table with start_command, dev_command, build_command fields
- **Terminal Services**: Existing terminal execution services for command execution

---

## New Component: ProjectCommandButtons

### Component Overview
The `ProjectCommandButtons` component provides start/stop functionality for development servers using commands stored in the project database.

### Database Integration
The component uses existing project data from the database:
- `start_command`: Primary start command (e.g., "npm start", "yarn dev")
- `dev_command`: Development command (e.g., "npm run dev", "yarn dev")
- `build_command`: Build command (e.g., "npm run build", "yarn build")
- `test_command`: Test command (e.g., "npm test", "yarn test")

### Component Structure
```jsx
// ProjectCommandButtons.jsx
import { logger } from "@/infrastructure/logging/Logger";
import React, { useState, useEffect } from 'react';
import APIChatRepository from '@/infrastructure/repositories/APIChatRepository.jsx';

const ProjectCommandButtons = ({ 
  projectId, 
  activePort, 
  onCommandExecute,
  className = '' 
}) => {
  const [projectCommands, setProjectCommands] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(null);
  const [error, setError] = useState(null);
  
  // Component implementation
};
```

### API Integration
```javascript
// New methods in APIChatRepository.jsx
async getProjectCommands(projectId = null) {
  const currentProjectId = projectId || await this.getCurrentProjectId();
  return apiCall(`/api/projects/${currentProjectId}/commands`);
}

async executeProjectCommand(projectId = null, commandType, options = {}) {
  const currentProjectId = projectId || await this.getCurrentProjectId();
  return apiCall(`/api/projects/${currentProjectId}/execute-command`, {
    method: 'POST',
    body: JSON.stringify({ commandType, ...options })
  });
}
```

### Command Types
- **start**: Execute start_command from database
- **dev**: Execute dev_command from database  
- **build**: Execute build_command from database
- **test**: Execute test_command from database
- **stop**: Stop running development server
- **restart**: Stop and restart development server

### UI Integration
The component will be integrated into the PreviewComponent header alongside the port configuration, providing:
- Start/Stop buttons with loading states
- Command selection dropdown
- Real-time execution status
- Error handling and user feedback
- Integration with existing preview refresh functionality

---

## Validation Results - 2024-12-19

### ✅ Completed Items
- [x] File: `frontend/src/presentation/components/chat/main/PreviewComponent.jsx` - Status: Exists and properly structured
- [x] File: `frontend/src/infrastructure/stores/IDEStore.jsx` - Status: Exists with Zustand store pattern
- [x] File: `frontend/src/infrastructure/repositories/APIChatRepository.jsx` - Status: Exists with proper API configuration
- [x] File: `frontend/src/css/main/preview.css` - Status: Exists with comprehensive styling
- [x] Directory: `frontend/src/hooks/` - Status: Exists and follows project patterns
- [x] Import Pattern: `@/` alias imports - Status: Correctly configured in vite.config.js
- [x] Database Schema: Projects table with command fields - Status: Exists with start_command, dev_command, build_command, test_command
- [x] Terminal Services: Existing execution infrastructure - Status: Available in backend

### ⚠️ Issues Found
- [ ] File: `frontend/src/presentation/components/chat/main/PortConfigInput.jsx` - Status: Not found, needs creation
- [ ] File: `frontend/src/hooks/usePortConfiguration.js` - Status: Not found, needs creation
- [ ] File: `frontend/src/presentation/components/chat/main/ProjectCommandButtons.jsx` - Status: Not found, needs creation
- [ ] API Endpoint: Port validation endpoint - Status: Not implemented in APIChatRepository
- [ ] API Endpoint: Project command execution endpoints - Status: Not implemented in APIChatRepository

### 🔧 Improvements Made
- Updated file paths to match actual project structure
- Corrected import patterns to use `@/` alias consistently
- Added proper integration with existing IDEStore methods
- Aligned with existing component patterns and styling
- Updated to use existing APIChatRepository patterns
- **Added ProjectCommandButtons component** for start/stop functionality
- **Integrated with existing database schema** for project commands
- **Leveraged existing terminal execution services** for command execution

### 📊 Code Quality Metrics
- **Coverage**: 0% (new feature)
- **Security Issues**: 0 (proper validation planned)
- **Performance**: Good (localStorage-based, minimal overhead)
- **Maintainability**: Excellent (follows existing patterns)
- **Database Integration**: Excellent (uses existing schema)

### 🚀 Next Steps
1. Create missing files: `PortConfigInput.jsx`, `usePortConfiguration.js`, `ProjectCommandButtons.jsx`
2. Add port validation method to APIChatRepository
3. Add project command execution methods to APIChatRepository
4. Extend IDEStore with custom port methods
5. Update PreviewComponent with port input and command button integration
6. Add CSS styles for port configuration and command buttons UI

### 📋 Task Splitting Recommendations
- **Main Task**: Preview Port Configuration (4 hours) → No splitting needed
- **Phase 1**: Foundation Setup (1 hour) - Components and hooks
- **Phase 2**: Core Implementation (2 hours) - Integration, validation, and command execution
- **Phase 3**: Integration (0.5 hours) - Testing and error handling
- **Phase 4**: Testing & Documentation (0.5 hours) - Final validation 