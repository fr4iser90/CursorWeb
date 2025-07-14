const fs = require('fs');
const path = require('path');
const BrowserManager = require('../../backend/infrastructure/external/BrowserManager');
const IDEManager = require('../../backend/infrastructure/external/IDEManager');

const Logger = require('@logging/Logger');

const logger = new Logger('ServiceName');

class AutoDOMCollector {
  constructor() {
    this.browserManager = new BrowserManager();
    this.ideManager = new IDEManager();
    this.outputDir = path.join(__dirname, '../output/auto-collected');
    this.collectedStates = new Map();
    
    this.stateConfigs = [
      {
        name: 'default-state',
        description: 'Basis IDE-Ansicht',
        action: () => this.collectDefaultState()
      },
      {
        name: 'chat-active',
        description: 'Chat Panel aktiv',
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
        description: 'Terminal aktiv (Ctrl+Shift+`)',
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
        description: 'Settings geöffnet',
        action: () => this.openSettings()
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
    logger.info('🚀 Auto DOM Collector startet...');
    logger.info('📡 Verbinde mit Cursor IDE über CDP...\n');

    try {
      // IDE Manager initialisieren
      await this.ideManager.initialize();
      
      // Browser Manager mit aktiver IDE verbinden
      const activePort = this.ideManager.getActivePort();
      if (!activePort) {
        throw new Error('Keine aktive IDE gefunden!');
      }

      await this.browserManager.connect(activePort);
      logger.info(`✅ Verbunden mit Cursor IDE auf Port ${activePort}`);
      
      return true;
    } catch (error) {
      console.error('❌ Verbindung fehlgeschlagen:', error.message);
      throw error;
    }
  }

  async collectAllStates() {
    await this.initialize();
    
    logger.info(`\n🎯 Sammle ${this.stateConfigs.length} verschiedene IDE-Zustände...\n`);

    for (const [index, config] of this.stateConfigs.entries()) {
      try {
        logger.info(`📄 [${index + 1}/${this.stateConfigs.length}] ${config.name}`);
        logger.info(`   ${config.description}`);
        
        // State aktivieren
        await config.action();
        
        // DOM sammeln
        await this.collectCurrentState(config.name, config.description);
        
        // Kurze Pause zwischen States
        await this.wait(1500);
        
        logger.info(`   ✅ Erfolgreich gesammelt\n`);
        
      } catch (error) {
        console.error(`   ❌ Fehler bei ${config.name}:`, error.message);
      }
    }

    await this.generateReport();
    await this.cleanup();

    // AUTOMATISCH ANALYSE STARTEN
    logger.info('\n🔄 Starte automatische Analyse...');
    await this.runAutomaticAnalysis();
  }

  async runAutomaticAnalysis() {
    try {
      // 1. Bulk DOM Analyse
      logger.info('\n📊 [1/4] Bulk DOM Analyse...');
      const BulkDOMAnalyzer = require('./bulk-dom-analyzer');
      const bulkAnalyzer = new BulkDOMAnalyzer();
      await bulkAnalyzer.analyze();

      // 2. Original DOM Analyse
      logger.info('\n📊 [2/4] Original DOM Analyse...');
      const DOMAnalyzer = require('./dom-analyzer');
      const domAnalyzer = new DOMAnalyzer();
      await domAnalyzer.analyze();

      // 3. Merge Results
      logger.info('\n🔄 [3/4] Merge Analyse-Ergebnisse...');
      const { mergeAnalysisResults } = require('./merge-analysis-results');
      await mergeAnalysisResults();

      // 4. Coverage Validation
      logger.info('\n✅ [4/4] Coverage Validation...');
      const CoverageValidator = require('./coverage-validator');
      const validator = new CoverageValidator();
      await validator.validate();

      // 5. Selector Generation
      logger.info('\n🔧 [5/5] Selector Generierung...');
      const SelectorGenerator = require('./selector-generator');
      const generator = new SelectorGenerator();
      await generator.generate();

      logger.info('\n🎉 VOLLSTÄNDIGE AUTOMATION ABGESCHLOSSEN!');
      logger.info('📁 Alle Dateien generiert in: cursor-chat-agent/generated/');

    } catch (error) {
      console.error('❌ Automatische Analyse fehlgeschlagen:', error.message);
      throw error;
    }
  }

  async collectCurrentState(stateName, description) {
    const page = await this.browserManager.getPage();
    if (!page) {
      throw new Error('Keine Verbindung zur IDE');
    }

    // Warte kurz für UI-Updates
    await this.wait(800);

    // Hole komplettes DOM
    const html = await page.content();
    
    // Speichere in Datei
    const filename = `${stateName}.md`;
    const filepath = path.join(this.outputDir, filename);
    
    const content = `# ${stateName} DOM Data

## Description
${description}

## Collection Info
- Timestamp: ${new Date().toISOString()}
- Method: Direct CDP Connection
- IDE Port: ${this.browserManager.getCurrentPort()}

## DOM Content
\`\`\`html
${html}
\`\`\`
`;

    fs.writeFileSync(filepath, content);
    
    // Metadata speichern
    this.collectedStates.set(stateName, {
      description,
      filename,
      timestamp: new Date().toISOString(),
      elementCount: (html.match(/<[^>]*>/g) || []).length,
      size: html.length
    });
  }

  // === STATE ACTIVATION METHODS ===
  
  async collectDefaultState() {
    // Schließe alle Panels für sauberen Default-State
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Escape'); // Schließe eventuelle Dialoge
    await this.wait(300);
  }

  async activateChat() {
    const page = await this.browserManager.getPage();
    
    // Chat öffnen falls nicht aktiv
    try {
      const chatButton = '[aria-label*="New Chat"]';
      await page.waitForSelector(chatButton, { timeout: 2000 });
      await page.click(chatButton);
    } catch (e) {
      // Chat eventuell schon offen
    }
    
    await this.wait(1000);
  }

  async openCommandPalette() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+P');
    await page.waitForSelector('.quick-input-widget', { timeout: 3000 });
  }

  async openQuickOpen() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+P');
    await page.waitForSelector('.quick-input-widget', { timeout: 3000 });
  }

  async openGlobalSearch() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+F');
    await this.wait(1000);
  }

  async openExtensions() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+X');
    await this.wait(1000);
  }

  async openDebugPanel() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+D');
    await this.wait(1000);
  }

  async openTerminal() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+`');
    await this.wait(1000);
  }

  async openProblemsPanel() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+M');
    await this.wait(1000);
  }

  async openOutputPanel() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+Shift+U');
    await this.wait(1000);
  }

  async openSettings() {
    const page = await this.browserManager.getPage();
    await page.keyboard.press('Control+,');
    await this.wait(1000);
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generateReport() {
    const report = {
      meta: {
        generatedAt: new Date().toISOString(),
        collector: 'auto-dom-collector.js',
        method: 'Direct CDP Connection',
        idePort: this.browserManager.getCurrentPort(),
        totalStatesCollected: this.collectedStates.size
      },
      collectedStates: Object.fromEntries(this.collectedStates),
      summary: {
        totalFiles: this.collectedStates.size,
        outputDirectory: this.outputDir,
        avgElementCount: Math.round(
          Array.from(this.collectedStates.values())
            .reduce((sum, state) => sum + state.elementCount, 0) / this.collectedStates.size
        )
      }
    };

    const reportPath = path.join(this.outputDir, 'collection-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    logger.info('\n📊 SAMMLUNG ERFOLGREICH!');
    logger.info(`📁 Verzeichnis: ${this.outputDir}`);
    logger.info(`📄 Dateien: ${this.collectedStates.size}`);
    logger.info(`📊 Report: ${reportPath}`);
    
    // File-Liste anzeigen
    logger.info('\n📋 GESAMMELTE DATEIEN:');
    Array.from(this.collectedStates.entries()).forEach(([name, data]) => {
      logger.info(`  ✅ ${data.filename} (${data.elementCount} Elemente)`);
    });
  }

  async cleanup() {
    try {
      await this.browserManager.disconnect();
    } catch (error) {
      logger.info('⚠️ Cleanup warning:', error.message);
    }
  }
}

// CLI Usage
if (require.main === module) {
  const collector = new AutoDOMCollector();
  
  async function run() {
    try {
      await collector.collectAllStates();
    } catch (error) {
      console.error('❌ Sammlung fehlgeschlagen:', error.message);
      console.error(error.stack);
    }
  }
  
  run();
}

module.exports = AutoDOMCollector; 