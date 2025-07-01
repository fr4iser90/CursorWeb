const IDEManager = require('../../infrastructure/external/IDEManager');
const BrowserManager = require('../../infrastructure/external/BrowserManager');

class IDEMirrorService {
    constructor() {
        this.ideManager = new IDEManager();
        this.browserManager = new BrowserManager();
        this.isInitialized = false;
    }

    async connectToIDE() {
        if (!this.isInitialized) {
            await this.ideManager.initialize();
            this.isInitialized = true;
        }

        const activePort = this.ideManager.getActivePort();
        if (!activePort) {
            const availableIDEs = await this.ideManager.getAvailableIDEs();
            if (availableIDEs.length === 0) {
                throw new Error('No Cursor IDE instances found. Please start Cursor IDE first.');
            }
            
            // Use first available IDE
            await this.ideManager.switchToIDE(availableIDEs[0].port);
        }

        const activeIDE = await this.ideManager.getActiveIDE();
        console.log(`🔌 Connecting to IDE on port ${activeIDE.port}...`);
        
        await this.browserManager.connect(activeIDE.port);
        console.log(`✅ Connected to IDE: Port ${activeIDE.port}`);
    }

    async captureCompleteIDEState() {
        const page = await this.browserManager.getPage();
        if (!page) {
            throw new Error('No IDE connection available');
        }

        console.log('🔍 Capturing complete IDE state...');

        try {
            // Check if page is still connected before evaluate
            if (page.isClosed()) {
                console.log('⚠️ Page is closed, reconnecting...');
                await this.browserManager.reconnect();
                const newPage = await this.browserManager.getPage();
                if (!newPage) {
                    throw new Error('Could not reconnect to IDE');
                }
                return await this.captureCompleteIDEState(); // Retry with new page
            }

            // 1. Take screenshot first
            console.log('📸 Taking IDE screenshot...');
            const screenshotBuffer = await page.screenshot({
                type: 'png',
                fullPage: false // Only visible area
            });
            
            // Convert to base64 for web transfer
            const screenshotBase64 = screenshotBuffer.toString('base64');
            const screenshotDataURL = `data:image/png;base64,${screenshotBase64}`;

            // 2. Get DOM structure for clickable areas
            const domStructure = await page.evaluate(() => {
            // First, capture ALL CSS from the page
            function captureAllCSS() {
                const cssData = {
                    external: [],
                    inline: [],
                    computed: []
                };
                
                // 1. External stylesheets
                Array.from(document.styleSheets).forEach(sheet => {
                    try {
                        if (sheet.href) {
                            // For Electron URLs, try to get the actual CSS content
                            if (sheet.href.includes('vscode-file://') || sheet.href.includes('electron://')) {
                                try {
                                    // Try to get CSS rules directly from the stylesheet
                                    const rules = Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
                                    if (rules.trim()) {
                                        cssData.inline.push(rules);
                                        console.log('✅ Extracted CSS from Electron URL:', sheet.href);
                                    }
                                } catch (e) {
                                    console.log('⚠️ Could not extract CSS from:', sheet.href);
                                }
                            } else {
                                cssData.external.push(sheet.href);
                            }
                        } else if (sheet.cssRules) {
                            // Inline stylesheets
                            const rules = Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
                            if (rules.trim()) {
                                cssData.inline.push(rules);
                            }
                        }
                    } catch (e) {
                        // CORS blocked stylesheets - capture what we can
                        if (sheet.href && !sheet.href.includes('vscode-file://')) {
                            cssData.external.push(sheet.href);
                        }
                    }
                });
                
                // 2. Inline styles from <style> tags
                Array.from(document.querySelectorAll('style')).forEach(styleEl => {
                    if (styleEl.textContent.trim()) {
                        cssData.inline.push(styleEl.textContent);
                    }
                });
                
                return cssData;
            }
            
            function serializeElement(element, depth = 0, maxDepth = 30) {
                if (!element || element.nodeType !== 1 || depth > maxDepth) return null;
                
                const rect = element.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(element);
                
                // Generate unique selector
                let selector = '';
                if (element.id) {
                    selector = `#${element.id}`;
                } else {
                    const classes = element.className.toString().trim().split(/\s+/).filter(c => c).join('.');
                    if (classes) {
                        selector = element.tagName.toLowerCase() + '.' + classes;
                    } else {
                        selector = element.tagName.toLowerCase();
                    }
                }

                // Check if element is clickable
                const isClickable = element.onclick !== null || 
                                  element.tagName === 'BUTTON' || 
                                  element.tagName === 'A' || 
                                  element.role === 'button' ||
                                  element.getAttribute('role') === 'button' ||
                                  element.classList.contains('action-item') ||
                                  element.classList.contains('action-label') ||
                                  element.classList.contains('monaco-button') ||
                                  element.classList.contains('monaco-icon-button') ||
                                  element.classList.contains('codicon') ||
                                  element.classList.contains('tab') ||
                                  computedStyle.cursor === 'pointer' ||
                                  element.tabIndex >= 0;

                const elementData = {
                    tagName: element.tagName.toLowerCase(),
                    id: element.id || '',
                    className: element.className || '',
                    textContent: element.textContent ? element.textContent.trim().substring(0, 200) : '',
                    selector: selector,
                    position: {
                        x: Math.round(rect.left),
                        y: Math.round(rect.top),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height)
                    },
                    style: {
                        display: computedStyle.display,
                        visibility: computedStyle.visibility,
                        opacity: computedStyle.opacity,
                        backgroundColor: computedStyle.backgroundColor,
                        color: computedStyle.color,
                        fontSize: computedStyle.fontSize,
                        fontFamily: computedStyle.fontFamily,
                        border: computedStyle.border,
                        padding: computedStyle.padding,
                        margin: computedStyle.margin,
                        position: computedStyle.position,
                        zIndex: computedStyle.zIndex,
                        cursor: computedStyle.cursor
                    },
                    isClickable: isClickable,
                    isVisible: rect.width >= 0 && rect.height >= 0 && 
                              computedStyle.visibility !== 'hidden' && 
                              computedStyle.display !== 'none',
                    children: []
                };

                // Recursively serialize ALL children
                if (element.children && element.children.length > 0 && depth < maxDepth) {
                    for (const child of element.children) {
                        const childData = serializeElement(child, depth + 1, maxDepth);
                        if (childData) {
                            elementData.children.push(childData);
                        }
                    }
                }

                return elementData;
            }

            const cssData = captureAllCSS();
            
            return {
                timestamp: Date.now(),
                url: window.location.href,
                title: document.title,
                body: serializeElement(document.body),
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                css: cssData
            };
                    });

            const activeIDE = await this.ideManager.getActiveIDE();
            domStructure.idePort = activeIDE ? activeIDE.port : null;
            
            // Add screenshot to the result
            domStructure.screenshot = screenshotDataURL;
            
            // Count total elements recursively
            function countElements(element) {
                if (!element) return 0;
                let count = 1;
                if (element.children) {
                    element.children.forEach(child => {
                        count += countElements(child);
                    });
                }
                return count;
            }
            
            const totalElements = countElements(domStructure.body);
            console.log(`📸✅ Captured IDE: Screenshot + ${totalElements} clickable elements`);
            return domStructure;
        } catch (error) {
            console.error('❌ Failed to capture IDE state:', error.message);
            if (error.message.includes('Target page, context or browser has been closed')) {
                console.log('🔄 Browser connection lost, attempting reconnect...');
                try {
                    await this.browserManager.reconnect();
                    return await this.captureCompleteIDEState(); // Retry once
                } catch (reconnectError) {
                    console.error('❌ Reconnect failed:', reconnectError.message);
                    throw new Error('IDE connection lost and reconnect failed');
                }
            }
            throw error;
        }
    }

    async clickElementInIDE(selector, coordinates) {
        const page = await this.browserManager.getPage();
        if (!page) {
            throw new Error('No IDE connection available');
        }

        const activeIDE = await this.ideManager.getActiveIDE();
        console.log(`🖱️ Clicking element on port ${activeIDE.port}: ${selector}`);

        try {
            // Try clicking by selector first
            const element = await page.$(selector);
            if (element) {
                const isVisible = await element.isVisible();
                if (isVisible) {
                    await element.click();
                    console.log(`✅ Clicked element by selector: ${selector}`);
                    return true;
                }
            }

            // If selector doesn't work, try coordinates
            if (coordinates && coordinates.x >= 0 && coordinates.y >= 0) {
                await page.mouse.click(coordinates.x, coordinates.y);
                console.log(`✅ Clicked at coordinates: ${coordinates.x}, ${coordinates.y}`);
                return true;
            }

            throw new Error(`Element not clickable: ${selector}`);
        } catch (error) {
            console.error(`❌ Failed to click element: ${error.message}`);
            throw error;
        }
    }

    async typeInIDE(text, selector = null) {
        const page = await this.browserManager.getPage();
        if (!page) {
            throw new Error('No IDE connection available');
        }

        try {
            if (selector) {
                await page.fill(selector, text);
            } else {
                await page.keyboard.type(text);
            }
            console.log(`✅ Typed text: ${text.substring(0, 50)}...`);
        } catch (error) {
            console.error(`❌ Failed to type text: ${error.message}`);
            throw error;
        }
    }

    async sendKeysToIDE(keys) {
        const page = await this.browserManager.getPage();
        if (!page) {
            throw new Error('No IDE connection available');
        }

        try {
            await page.keyboard.press(keys);
            console.log(`✅ Sent keys: ${keys}`);
        } catch (error) {
            console.error(`❌ Failed to send keys: ${error.message}`);
            throw error;
        }
    }

    async switchToIDE(port) {
        console.log(`🔄 Switching to IDE on port ${port}...`);
        await this.ideManager.switchToIDE(port);
        await this.browserManager.switchToPort(port);
        console.log(`✅ Switched to IDE on port ${port}`);
    }

    async getAvailableIDEs() {
        if (!this.isInitialized) {
            await this.ideManager.initialize();
            this.isInitialized = true;
        }
        return await this.ideManager.getAvailableIDEs();
    }

    async getActiveIDE() {
        return await this.ideManager.getActiveIDE();
    }

    async disconnect() {
        await this.browserManager.disconnect();
        console.log('🔌 Disconnected from IDE');
    }

    isIDEConnected() {
        return this.browserManager.isConnected();
    }

    getIDEStatus() {
        return {
            ...this.ideManager.getStatus(),
            browserConnected: this.browserManager.isConnected(),
            currentPort: this.browserManager.getCurrentPort()
        };
    }
}

module.exports = IDEMirrorService; 