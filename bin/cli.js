#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const degit = require('degit');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

program
  .name('create-laju-app')
  .description('CLI to create a new project from template')
  .version('1.0.0');

program
  .argument('[project-directory]', 'Project directory name')
  .action(async (projectDirectory) => {
    try {
      // If no project name, ask user
      if (!projectDirectory) {
        const response = await prompts({
          type: 'text',
          name: 'projectDirectory',
          message: 'Enter project name:'
        });
        projectDirectory = response.projectDirectory;
      }

      if (!projectDirectory) {
        console.log('Project name is required to continue.');
        process.exit(1);
      }

      const targetPath = path.resolve(projectDirectory);

      // Check if directory exists
      if (fs.existsSync(targetPath)) {
        console.log(`Directory ${projectDirectory} already exists. Choose another name.`);
        process.exit(1);
      }

      console.log(`Creating a new project in ${targetPath}...`);

      // Clone template from GitHub
      const emitter = degit('maulanashalihin/laju');
      
      await emitter.clone(targetPath);

      // Read package.json from template
      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = require(packageJsonPath);

      // Update project name in package.json
      packageJson.name = projectDirectory;

      // Write back package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );

      // Change directory and run setup commands
      process.chdir(targetPath);
      console.log('📦 Installing dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      console.log('📝 Copying environment file...');

      execSync(process.platform === 'win32' ? 'copy .env.example .env' : 'cp .env.example .env', { stdio: 'inherit' });
      console.log('🔄 Running migrations...');
      execSync('npx knex migrate:latest', { stdio: 'inherit' });
      console.log('🎉 Project created successfully!');
      console.log('');
      console.log('🚀 Your project is ready! You can now start developing.');
      
      console.log('');
      console.log('🔴 Redis Server Setup:');
      console.log('1. Download Redis:');
      console.log('   Windows: https://github.com/microsoftarchive/redis/releases');
      console.log('   Mac: brew install redis');
      console.log('   Linux: sudo apt-get install redis-server');
      console.log('');
      console.log('2. Start Redis Server:');
      console.log('   Windows: redis-server');
      console.log('   Mac/Linux: sudo service redis-server start');
      console.log('');
      console.log('📁 cd ' + targetPath);
      console.log('🔥 npm run dev to start the development server.');
      console.log('📦 npm run build to build the production files.');
      console.log('� Build Faster with Laju - Happy Coding!');
      
      
      
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();