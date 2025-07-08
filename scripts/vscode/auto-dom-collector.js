const fs = require('fs');
const path = require('path');
const BrowserManager = require('../../backend/infrastructure/external/BrowserManager');
const IDEManager = require('../../backend/infrastructure/external/IDEManager');

class AutoDOMCollector {
  constructor() {
    this.browserManager = new BrowserManager();
    this.ideManager = new IDEManager();
    this.outputDir = path.join(__dirname, '../output/auto-collected');
    this.collectedStates = new Map();
    
    this.stateConfigs = [
      {
        name: 'default-state',
        description: 'Default VSCode IDE view',
        action: () => this.collectDefaultState()
      },
      {
        name: 'chat-active',
        description: 'Chat Panel active (Ctrl+Shift+I)',
        action: () => this.activateChat()
      },
      {
        name: 'command-palette',
        description: 'Command Palette (Ctrl+Shift+P)',
        action: () => this.openCommandPalette()
      },
      {
        name: 'quick-open',
        description: 'Quick Open (Ctrl+P)',
        action: () => this.openQuickOpen()
      },
      {
        name: 'global-search',
        description: 'Global Search (Ctrl+Shift+F)',
        action: () => this.openGlobalSearch()
      },
      {
        name: 'extensions-panel',
        description: 'Extensions Panel (Ctrl+Shift+X)',
        action: () => this.openExtensions()
      },
      {
        name: 'debug-panel',
        description: 'Debug Panel (Ctrl+Shift+D)',
        action: () => this.openDebugPanel()
      },
      {
        name: 'terminal-active',
        description: 'Terminal active (Ctrl+Shift+`)',
        action: () => this.openTerminal()
      },
      {
        name: 'problems-panel',
        description: 'Problems Panel (Ctrl+Shift+M)',
        action: () => this.openProblemsPanel()
      },
      {
        name: 'output-panel',
        description: 'Output Panel (Ctrl+Shift+U)',
        action: () => this.openOutputPanel()
      },
      {
        name: 'settings-open',
        description: 'Settings opened (Ctrl+,)',
        action: () => this.openSettings()
      },
      {
        name: 'file-explorer',
        description: 'File Explorer active (Ctrl+Shift+E)',
        action: () => this.openFileExplorer()
      },
      {
        name: 'source-control',
        description: 'Source Control panel (Ctrl+Shift+G)',
        action: () => this.openSourceControl()
      },
      {
        name: 'run-and-debug',
        description: 'Run and Debug panel (Ctrl+Shift+D)',
        action: () => this.openRunAndDebug()
      }
    ];

    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async initialize() {
    console.log('🚀 Auto DOM Collector starting...');
    console.log('📡 Connecting to VSCode IDE via CDP...\n');

    try {
      // Initialize IDE Manager
      await this.ideManager.initialize();
      
      // Get available IDEs and find VSCode specifically
      const availableIDEs = await this.ideManager.getAvailableIDEs();
      const vscodeIDE = availableIDEs.find(ide => ide.ideType === 'vscode' && ide.status === 'running');
      
      if (!vscodeIDE) {
        throw new Error('No running VSCode IDE found! Please start VSCode with remote debugging enabled.');
      }

      // Connect Browser Manager to VSCode IDE
      await this.browserManager.connect(vscodeIDE.port);
      console.log(`✅ Connected to VSCode IDE on port ${vscodeIDE.port}`);
      
      return true;
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      throw error;
    }
  }

  async collectAllStates() {
    await this.initialize();
    
    console.log(`\n🎯 Collecting ${this.stateConfigs.length} different VSCode IDE states...\n`);

    for (const [index, config] of this.stateConfigs.entries()) {
      try {
        console.log(`📄 [${index + 1}/${this.stateConfigs.length}] ${config.name}`);
        console.log(`   ${config.description}`);
        
        // Activate state
        await config.action();
        
        // Collect DOM
        await this.collectCurrentState(config.name, config.description);
        
        // Short pause between states
        await this.wait(1500);
        
        console.log(`   ✅ Successfully collected\n`);
        
      } catch (error) {
        console.error(`   ❌ Error in ${config.name}:`, error.message);
      }
    }

    await this.generateReport();
    await this.cleanup();

    // AUTOMATIC ANALYSIS START
    console.log('\n🔄 Starting automatic analysis...');
    await this.runAutomaticAnalysis();
  }

  async runAutomaticAnalysis() {
    try {
      // 1. Bulk DOM Analysis
      console.log('\n📊 [1/5] Bulk DOM Analysis...');
      const BulkDOMAnalyzer = require('./bulk-dom-analyzer');
      const bulkAnalyzer = new BulkDOMAnalyzer();
      await bulkAnalyzer.analyze();

      // 2. Original DOM Analysis
      console.log('\n📊 [2/5] Original DOM Analysis...');
      const DOMAnalyzer = require('./dom-analyzer');
      const domAnalyzer = new DOMAnalyzer();
      await domAnalyzer.analyze();

      // 3. Enhanced Chat Analysis
      console.log('\n📊 [3/5] Enhanced Chat Analysis...');
      const EnhancedChatAnalyzer = require('./enhanced-chat-analyzer');
      const chatAnalyzer = new EnhancedChatAnalyzer();
      await chatAnalyzer.analyze();

      // 4. Merge Results
      console.log('\n🔄 [4/5] Merge Analysis Results...');
      const { mergeAnalysisResults } = require('./merge-analysis-results');
      await mergeAnalysisResults();

      // 5. Coverage Validation
      console.log('\n✅ [5/5] Coverage Validation...');
      const CoverageValidator = require('./coverage-validator');
      const validator = new CoverageValidator();
      await validator.validate();

      console.log('\n🎉 COMPLETE AUTOMATION FINISHED!');
      console.log('📁 All files generated in: scripts/output/');

    } catch (error) {
      console.error('❌ Automatic analysis failed:', error.message);
      throw error;
    }
  }

  async collectCurrentState(stateName, description) {
    const page = await this.browserManager.getPage();
    if (!page) {
      throw new Error('No connection to VSCode IDE');
    }

    // Wait briefly for UI updates
    await this.wait(800);

    // Get complete DOM
    const html = await page.content();
    
    // Save to file
    const filename = `${stateName}.md`;
    const filepath = path.join(this.outputDir, filename);
    
    const content = `# ${stateName} DOM Data

## Description
${description}

## Collection Info
- Timestamp: ${new Date().toISOString()}
- IDE: VSCode
- Collection Method: Auto DOM Collector

## HTML Content
\`\`\`html
${html}
\`\`\`
`;

    fs.writeFileSync(filepath, content);
    this.collectedStates.set(stateName, {
      description,
      timestamp: new Date().toISOString(),
      elementCount: (html.match(/<[^>]*>/g) || []).length
    });
  }

  async collectDefaultState() {
    // Default state - just wait for VSCode to be ready
    await this.wait(1000);
  }

  async activateChat() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      // Try VSCode chat shortcuts
      await page.keyboard.press('Control+Shift+I'); // VSCode chat shortcut
      await this.wait(1000);
      
      // Alternative: Look for chat button
      const chatButton = await page.$('[aria-label*="Chat"]');
      if (chatButton) {
        await chatButton.click();
        await this.wait(1000);
      }
    } catch (error) {
      console.log('   ⚠️ Chat activation failed, continuing...');
    }
  }

  async openCommandPalette() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+P');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Command palette failed, continuing...');
    }
  }

  async openQuickOpen() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+P');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Quick open failed, continuing...');
    }
  }

  async openGlobalSearch() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+F');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Global search failed, continuing...');
    }
  }

  async openExtensions() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+X');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Extensions panel failed, continuing...');
    }
  }

  async openDebugPanel() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+D');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Debug panel failed, continuing...');
    }
  }

  async openTerminal() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+`');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Terminal failed, continuing...');
    }
  }

  async openProblemsPanel() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+M');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Problems panel failed, continuing...');
    }
  }

  async openOutputPanel() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+U');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Output panel failed, continuing...');
    }
  }

  async openSettings() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+,');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Settings failed, continuing...');
    }
  }

  async openFileExplorer() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+E');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ File explorer failed, continuing...');
    }
  }

  async openSourceControl() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+G');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Source control failed, continuing...');
    }
  }

  async openRunAndDebug() {
    const page = await this.browserManager.getPage();
    if (!page) return;

    try {
      await page.keyboard.press('Control+Shift+D');
      await this.wait(1000);
    } catch (error) {
      console.log('   ⚠️ Run and debug failed, continuing...');
    }
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generateReport() {
    const report = {
      collectionInfo: {
        timestamp: new Date().toISOString(),
        ide: 'VSCode',
        totalStates: this.stateConfigs.length,
        successfulCollections: this.collectedStates.size
      },
      states: Object.fromEntries(this.collectedStates),
      summary: {
        totalElements: Array.from(this.collectedStates.values())
          .reduce((sum, state) => sum + (state.elementCount || 0), 0),
        averageElementsPerState: Array.from(this.collectedStates.values())
          .reduce((sum, state) => sum + (state.elementCount || 0), 0) / this.collectedStates.size
      }
    };

    const reportPath = path.join(this.outputDir, 'collection-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 Collection Report Generated:');
    console.log(`   📁 Directory: ${this.outputDir}`);
    console.log(`   📄 States collected: ${this.collectedStates.size}/${this.stateConfigs.length}`);
    console.log(`   🔢 Total elements: ${report.summary.totalElements}`);
    console.log(`   📊 Average per state: ${Math.round(report.summary.averageElementsPerState)}`);
  }

  async cleanup() {
    try {
      await this.browserManager.disconnect();
      console.log('✅ Browser connection closed');
    } catch (error) {
      console.log('⚠️ Cleanup warning:', error.message);
    }
  }
}

// Auto-run if called directly
if (require.main === module) {
  async function run() {
    const collector = new AutoDOMCollector();
    try {
      await collector.collectAllStates();
      console.log('\n🎉 Auto DOM Collection completed successfully!');
    } catch (error) {
      console.error('\n❌ Auto DOM Collection failed:', error.message);
      process.exit(1);
    }
  }
  
  run();
}

module.exports = AutoDOMCollector; 