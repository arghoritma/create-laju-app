#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const degit = require('degit');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const ASCII_ART = `                      -       
           :+===+   =+        
       ++++++++++++++         
    =++++=      =+++          
   +++=        +++=           
  ++=        +++++            
 ++        ++++++         +   
 ==      =++++++++++++    -=  
 =     =++++++++++++      ++  
 =          ++++++        ++  
  -        =++++       =+=   
          =++++        +++    
         =++=       -+++=     
        ++++++++++++++=       
       ++=+++++++++=          
      ==     `;

program
  .name('create-laju-app')
  .description('CLI to create a new project from template')
  .version('1.0.0');

program
  .argument('[project-directory]', 'Project directory name')
  .action(async (projectDirectory) => {
    try {
      console.log(ASCII_ART); // Tambahkan ini
      console.log('\n'); // Tambah baris kosong setelah ASCII art
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
      // Update scripts in package.json for Windows
            if (process.platform === 'win32') {
              packageJson.scripts = {
                "dev": "cls && npx concurrently \"vite\" \"npx nodemon\"",
                "build": "if exist build rmdir /s /q build && vite build && tsc && xcopy /s /e /i dist build && xcopy /s /e /i public build"
              };
              
              // Write updated package.json
              fs.writeFileSync(
                packageJsonPath,
                JSON.stringify(packageJson, null, 2)
              );
            }
      
      console.log('🎉 Project created successfully!');
      console.log('');
      console.log('🚀 Your project is ready! You can now start developing.');
      
      console.log('');
      console.log('👉 Next steps:');
      console.log('1. 📁 cd ' + projectDirectory);
      console.log('2. 🔥 npm run dev => to start the development server.');
      console.log('3. 📦 npm run build => to build the production files.');
      console.log('');
 
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();