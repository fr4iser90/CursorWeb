
#!/usr/bin/env node
require('module-alias/register');

const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class DevSetup {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.projectRoot = path.join(__dirname, '../..');
  }

  async question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  async showMenu() {
    console.clear();
    logger.log('🚀 PIDEA Development Setup');
    logger.log('==========================');
    logger.log('1. 📊 Database Management');
    logger.log('2. 👤 User Management');
    logger.log('3. 🔧 Service Management');
    logger.log('4. 🛠️  Quick Setup (All-in-one)');
    logger.log('5. 📋 Status Check');
    logger.log('0. ❌ Exit');
    logger.log('');

    const choice = await this.question('Select an option: ');
    await this.handleMenuChoice(choice);
  }

  async handleMenuChoice(choice) {
    switch (choice.trim()) {
      case '1':
        await this.databaseMenu();
        break;
      case '2':
        await this.userMenu();
        break;
      case '3':
        await this.serviceMenu();
        break;
      case '4':
        await this.quickSetup();
        break;
      case '5':
        await this.statusCheck();
        break;
      case '0':
        logger.log('👋 Goodbye!');
        this.rl.close();
        process.exit(0);
        break;
      default:
        logger.log('❌ Invalid option. Please try again.');
        await this.waitAndReturn();
    }
  }

  async databaseMenu() {
    console.clear();
    logger.log('📊 Database Management');
    logger.log('=====================');
    logger.log('1. 🔄 Reset Database');
    logger.log('2. 🗑️  Clear All Data');
    logger.log('3. 📋 Show Database Info');
    logger.log('0. ⬅️  Back to Main Menu');
    logger.log('');

    const choice = await this.question('Select an option: ');
    
    switch (choice.trim()) {
      case '1':
        await this.resetDatabase();
        break;
      case '2':
        await this.clearDatabase();
        break;
      case '3':
        await this.showDatabaseInfo();
        break;
      case '0':
        await this.showMenu();
        return;
      default:
        logger.log('❌ Invalid option.');
    }
    
    await this.waitAndReturn();
    await this.databaseMenu();
  }

  async userMenu() {
    console.clear();
    logger.log('👤 User Management');
    logger.log('==================');
    logger.debug('1. ➕ Create Test User');
    logger.log('2. ➕ Create Custom User');
    logger.log('3. 🗑️  Clear All Users');
    logger.log('4. 📋 List Users');
    logger.log('0. ⬅️  Back to Main Menu');
    logger.log('');

    const choice = await this.question('Select an option: ');
    
    switch (choice.trim()) {
      case '1':
        await this.createTestUser();
        break;
      case '2':
        await this.createCustomUser();
        break;
      case '3':
        await this.clearUsers();
        break;
      case '4':
        await this.listUsers();
        break;
      case '0':
        await this.showMenu();
        return;
      default:
        logger.log('❌ Invalid option.');
    }
    
    await this.waitAndReturn();
    await this.userMenu();
  }

  async serviceMenu() {
    console.clear();
    logger.log('🔧 Service Management');
    logger.log('====================');
    logger.log('1. 🚀 Start Backend');
    logger.log('2. 🚀 Start Frontend');
    logger.log('3. 🚀 Start Both Services');
    logger.log('4. 🛑 Stop All Services');
    logger.log('5. 🔄 Restart Backend');
    logger.log('0. ⬅️  Back to Main Menu');
    logger.log('');

    const choice = await this.question('Select an option: ');
    
    switch (choice.trim()) {
      case '1':
        await this.startBackend();
        break;
      case '2':
        await this.startFrontend();
        break;
      case '3':
        await this.startBothServices();
        break;
      case '4':
        await this.stopServices();
        break;
      case '5':
        await this.restartBackend();
        break;
      case '0':
        await this.showMenu();
        return;
      default:
        logger.log('❌ Invalid option.');
    }
    
    await this.waitAndReturn();
    await this.serviceMenu();
  }

  async resetDatabase() {
    logger.log('🔄 Resetting database...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/reset-database.js', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      logger.log('✅ Database reset successful!');
    } catch (error) {
      logger.error('❌ Database reset failed:', error.message);
    }
  }

  async clearDatabase() {
    logger.log('🗑️ Clearing all data...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/clean-invalid-users.js', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      logger.log('✅ All data cleared!');
    } catch (error) {
      logger.error('❌ Clear failed:', error.message);
    }
  }

  async showDatabaseInfo() {
    const dbPath = path.join(__dirname, '../database/PIDEA-dev.db');
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      logger.log('📊 Database Info:');
      logger.log(`📁 Path: ${dbPath}`);
      logger.log(`📏 Size: ${(stats.size / 1024).toFixed(2)} KB`);
      logger.log(`📅 Modified: ${stats.mtime.toLocaleString()}`);
    } else {
      logger.log('❌ Database file not found');
    }
  }

  async createTestUser() {
    logger.debug('👤 Creating test user...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/create-test-user.js', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
    } catch (error) {
      logger.error('❌ Failed to create test user:', error.message);
    }
  }

  async createCustomUser() {
    logger.log('👤 Create Custom User');
    logger.log('====================');
    
    const email = await this.question('Email: ');
    const password = await this.question('Password: ');
    const username = await this.question('Username (optional): ');
    
    if (!email || !password) {
      logger.log('❌ Email and password are required!');
      return;
    }

    try {
      const sqlite3 = require('sqlite3').verbose();
      const bcrypt = require('bcryptjs');
      const { v4: uuidv4 } = require('uuid');
      
      const dbPath = path.join(__dirname, '../database/PIDEA-dev.db');
      const db = new sqlite3.Database(dbPath);
      
      const userId = uuidv4();
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const now = new Date().toISOString();

      const insertSQL = `
        INSERT INTO users (
          id, email, password_hash, role, created_at, updated_at, metadata
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      await new Promise((resolve, reject) => {
        db.run(insertSQL, [
          userId,
          email,
          passwordHash,
          'user',
          now,
          now,
          JSON.stringify({ username: username || null })
        ], function(err) {
          if (err) {
            logger.error('❌ Error creating user:', err.message);
            reject(err);
          } else {
            logger.log('✅ User created successfully!');
            logger.log(`📧 Email: ${email}`);
            logger.log(`🔑 Password: ${password}`);
            if (username) logger.log(`👤 Username: ${username}`);
            resolve();
          }
        });
      });

      db.close();
    } catch (error) {
      logger.error('❌ Failed to create user:', error.message);
    }
  }

  async clearUsers() {
    logger.log('🗑️ Clearing all users...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/clean-invalid-users.js', { 
        stdio: 'inherit',
        cwd: path.join(__dirname, '..')
      });
      logger.log('✅ All users cleared!');
    } catch (error) {
      logger.error('❌ Clear failed:', error.message);
    }
  }

  async listUsers() {
    try {
      const sqlite3 = require('sqlite3').verbose();
      const dbPath = path.join(__dirname, '../database/PIDEA-dev.db');
      const db = new sqlite3.Database(dbPath);
      
      const sql = 'SELECT id, email, role, created_at FROM users ORDER BY created_at DESC';
      
      db.all(sql, [], (err, rows) => {
        if (err) {
          logger.error('❌ Error listing users:', err.message);
        } else {
          logger.log('📋 Users:');
          logger.log('ID'.padEnd(38) + 'Email'.padEnd(25) + 'Role'.padEnd(10) + 'Created');
          logger.log('-'.repeat(80));
          
          rows.forEach(row => {
            const id = row.id.substring(0, 8) + '...';
            const email = row.email.padEnd(25);
            const role = row.role.padEnd(10);
            const created = new Date(row.created_at).toLocaleDateString();
            logger.log(`${id} ${email} ${role} ${created}`);
          });
          
          logger.log(`\nTotal users: ${rows.length}`);
        }
        db.close();
      });
    } catch (error) {
      logger.error('❌ Failed to list users:', error.message);
    }
  }

  async startBackend() {
    logger.log('🚀 Starting backend...');
    logger.log('💡 Press Ctrl+C to stop');
    
    const backendProcess = spawn('npm', ['run', 'dev:backend'], {
      cwd: this.projectRoot,
      stdio: 'inherit',
      shell: true
    });

    backendProcess.on('error', (error) => {
      logger.error('❌ Failed to start backend:', error.message);
    });
  }

  async startFrontend() {
    logger.log('🚀 Starting frontend...');
    logger.log('💡 Press Ctrl+C to stop');
    
    const frontendProcess = spawn('npm', ['run', 'dev:frontend'], {
      cwd: this.projectRoot,
      stdio: 'inherit',
      shell: true
    });

    frontendProcess.on('error', (error) => {
      logger.error('❌ Failed to start frontend:', error.message);
    });
  }

  async startBothServices() {
    logger.log('🚀 Starting both services...');
    logger.log('💡 Press Ctrl+C to stop');
    
    const bothProcess = spawn('npm', ['run', 'dev'], {
      cwd: this.projectRoot,
      stdio: 'inherit',
      shell: true
    });

    bothProcess.on('error', (error) => {
      logger.error('❌ Failed to start services:', error.message);
    });
  }

  async stopServices() {
    logger.log('🛑 Stopping services...');
    try {
      const { execSync } = require('child_process');
      execSync('pkill -f "node.*start"', { stdio: 'inherit' });
      execSync('pkill -f "npm.*dev"', { stdio: 'inherit' });
      logger.log('✅ Services stopped!');
    } catch (error) {
      logger.log('ℹ️ No services were running or already stopped');
    }
  }

  async restartBackend() {
    logger.log('🔄 Restarting backend...');
    await this.stopServices();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await this.startBackend();
  }

  async quickSetup() {
    logger.log('🛠️ Quick Setup - All-in-one');
    logger.log('==========================');
    logger.log('This will:');
    logger.log('1. Reset the database');
    logger.debug('2. Create a test user');
    logger.log('3. Show status');
    logger.log('');
    
    const confirm = await this.question('Continue? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      await this.showMenu();
      return;
    }

    logger.log('🔄 Resetting database...');
    await this.resetDatabase();
    
    logger.debug('👤 Creating test user...');
    await this.createTestUser();
    
    logger.log('📋 Checking status...');
    await this.statusCheck();
    
    logger.log('✅ Quick setup completed!');
    await this.waitAndReturn();
    await this.showMenu();
  }

  async statusCheck() {
    logger.log('📋 System Status');
    logger.log('===============');
    
    // Check database
    const dbPath = path.join(__dirname, '../database/PIDEA-dev.db');
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      logger.log(`✅ Database: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      logger.log('❌ Database: Not found');
    }
    
    // Check users
    try {
      const sqlite3 = require('sqlite3').verbose();
      const db = new sqlite3.Database(dbPath);
      
      db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
          logger.log('❌ Users: Error checking');
        } else {
          logger.log(`✅ Users: ${row.count} registered`);
        }
        db.close();
      });
    } catch (error) {
      logger.log('❌ Users: Error checking');
    }
    
    // Check ports
    const { execSync } = require('child_process');
const { logger } = require('@infrastructure/logging/Logger');
    try {
      const backendPort = execSync('lsof -i :3000', { encoding: 'utf8' });
      logger.log('✅ Backend: Running on port 3000');
    } catch {
      logger.log('❌ Backend: Not running');
    }
    
    try {
      const frontendPort = execSync('lsof -i :4005', { encoding: 'utf8' });
      logger.log('✅ Frontend: Running on port 4005');
    } catch {
      logger.log('❌ Frontend: Not running');
    }
  }

  async waitAndReturn() {
    logger.log('');
    await this.question('Press Enter to continue...');
  }

  async run() {
    logger.log('🚀 PIDEA Development Setup');
    logger.log('==========================');
    logger.log('Welcome to the PIDEA development setup!');
    logger.log('');
    
    await this.showMenu();
  }
}

// Run the setup
const setup = new DevSetup();
setup.run().catch(logger.error); 