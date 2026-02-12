#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts');
const degit = require('degit');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

function detectAvailablePackageManagers() {
  const { execSync } = require('child_process');
  const packageManagers = ['bun', 'yarn', 'npm'];
  const available = [];

  for (const pm of packageManagers) {
    try {
      execSync(`${pm} --version`, { stdio: 'ignore' });
      available.push(pm);
    } catch (e) {
      continue;
    }
  }
  return available.length > 0 ? available : ['npm'];
}

async function selectPackageManager(available) {
  if (available.length === 1) {
    return available[0];
  }

  console.log('');
  console.log('\x1b[36m  Which package manager would you like to use?\x1b[0m');

  const response = await prompts({
    type: 'select',
    name: 'packageManager',
    message: '',
    choices: available.map(pm => ({
      title: pm === 'npm' ? 'npm (stable ✓)' : pm === 'yarn' ? 'yarn (fast ✓)' : 'bun (experimental ⚠️)',
      value: pm
    }))
  });

  const selected = response.packageManager || 'npm';

  if (selected === 'bun') {
    console.log('\x1b[90m  Note: Bun is experimental. If you encounter issues, try npm or yarn.\x1b[0m');
    console.log('');
  }

  return selected;
}

function getInstallCommand(packageManager) {
  switch (packageManager) {
    case 'bun':
      return 'bun install';
    case 'yarn':
      return 'yarn';
    case 'npm':
    default:
      return 'npm install';
  }
}

function getRunCommand(packageManager) {
  switch (packageManager) {
    case 'bun':
      return 'bun run';
    case 'yarn':
      return 'yarn';
    case 'npm':
    default:
      return 'npm run';
  }
}

const ASCII_ART = `
\x1b[38;5;208m
              ++++++++++++++++++
             +++++++++++++++++++
             +++++++++++++++++++
            +++++++++++++++++++
            +++++++++++++++++++
           ++++++++++++++++++++
           +++++++++++++++++++
           +++++++++++++++++++
          +++++++++++++++++++
          +++++++++++++++++++
         +++++++++++++++++++

         +++++++++++++++++++++++++++++++++
        ++++++++++++++++++++++++++++++++++
        +++++++++++++++++++++++++++++++++
       ++++++++++++++++++++++++++++++++++
      ++++++++++++++++++++++++++++++++++
      ++++++++++++++++++++++++++++++++++
      +++++++++++++++++++++++++++++++++
     +++++++++++++++++++++++++++++++++
     ++++++++++++++++++++++++++++++++
\x1b[0m
`;

program
  .name('create-laju-app')
  .description('CLI to create a new project from template')
  .version('1.0.0');

async function selectTailwindVersion() {
  console.log('');
  console.log('\x1b[36m  Which TailwindCSS version would you like to use?\x1b[0m');

  const response = await prompts({
    type: 'select',
    name: 'tailwindVersion',
    message: '',
    choices: [
      { title: 'TailwindCSS 4 (latest ✓)', value: 'v4' },
      { title: 'TailwindCSS 3 (stable)', value: 'v3' }
    ]
  });

  return response.tailwindVersion || 'v4';
}

program
  .argument('[project-directory]', 'Project directory name')
  .option('--package-manager <pm>', 'Package manager to use (npm, yarn, bun)')
  .option('--tailwind <version>', 'TailwindCSS version to use (v3, v4)')
  .action(async (projectDirectory, options) => {
    try {
      console.log('');
      console.log(ASCII_ART);
      console.log('\x1b[36m  Create a new project with Laju Framework\x1b[0m');
      console.log('');

      let packageManager;
      if (options.packageManager) {
        packageManager = options.packageManager;
        if (!['npm', 'yarn', 'bun'].includes(packageManager)) {
          console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Invalid package manager. Use npm, yarn, or bun.');
          process.exit(1);
        }
      } else {
        const availablePackageManagers = detectAvailablePackageManagers();
        packageManager = await selectPackageManager(availablePackageManagers);
      }
      console.log('\x1b[36m  Using ' + packageManager + '\x1b[0m');
      console.log('');

      // Select TailwindCSS version (default to v4 if not specified)
      let tailwindVersion;
      if (options.tailwind) {
        tailwindVersion = options.tailwind;
        if (!['v3', 'v4'].includes(tailwindVersion)) {
          console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Invalid TailwindCSS version. Use v3 or v4.');
          process.exit(1);
        }
      } else {
        tailwindVersion = await selectTailwindVersion();
      }
      console.log('\x1b[36m  Using TailwindCSS ' + tailwindVersion + '\x1b[0m');
      console.log('');

      // If no project name, ask user
      if (!projectDirectory) {
        console.log('\x1b[36m  Project name:\x1b[0m');
        const response = await prompts({
          type: 'text',
          name: 'projectDirectory',
          message: ''
        });
        projectDirectory = response.projectDirectory;
      }

      if (!projectDirectory) {
        console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Project name is required to continue.');
        process.exit(1);
      }

      // Validate project name (npm package name rules)
      const nameRegex = /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
      if (!nameRegex.test(projectDirectory)) {
        console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Invalid project name. Use lowercase letters, numbers, and hyphens only.');
        process.exit(1);
      }

      const targetPath = path.resolve(projectDirectory);

      // Check if directory exists
      if (fs.existsSync(targetPath)) {
        console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Directory \x1b[36m' + projectDirectory + '\x1b[0m already exists. Choose another name.');
        process.exit(1);
      }

      console.log('');
      console.log('\x1b[90m  Creating project at \x1b[36m' + targetPath + '\x1b[0m');
      console.log('');

      // Check if Git is installed
      try {
        execSync('git --version', { stdio: 'ignore' });
      } catch (e) {
        console.log('\x1b[1;31m✖\x1b[0m \x1b[1;91mError:\x1b[0m Git is not installed or not in PATH.');
        console.log('');
        console.log('\x1b[90m  Please install Git to continue:\x1b[0m');
        console.log('  - Windows: https://git-scm.com/download/win');
        console.log('  - macOS: brew install git');
        console.log('  - Linux: sudo apt install git (Ubuntu/Debian)');
        console.log('');
        process.exit(1);
      }

      // Clone template from GitHub
      const emitter = degit('maulanashalihin/laju');

      await emitter.clone(targetPath);

      // Read package.json from template
      const packageJsonPath = path.join(targetPath, 'package.json');
      const packageJson = require(packageJsonPath);

      // Update project name in package.json
      packageJson.name = projectDirectory;

      // Reset version to 0.0.1 for new project
      packageJson.version = '0.0.1';

      // Write back package.json
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );

      // Change directory and run setup commands
      const originalDir = process.cwd();
      process.chdir(targetPath);

      try {
        console.log('\x1b[36m  Installing dependencies...\x1b[0m');
        console.log('');
        execSync(getInstallCommand(packageManager), { stdio: 'inherit', timeout: 300000 });
        console.log('\x1b[32m  ✓ Dependencies installed\x1b[0m');
        console.log('');

        console.log('\x1b[36m  Setting up environment...\x1b[0m');
        execSync(process.platform === 'win32' ? 'copy .env.example .env' : 'cp .env.example .env', { stdio: 'inherit', timeout: 10000 });
        console.log('\x1b[32m  ✓ Environment configured\x1b[0m');
        console.log('');

        console.log('\x1b[36m  Preparing database...\x1b[0m');
        execSync('npm run refresh 1', { stdio: 'inherit', timeout: 60000 });
        console.log('\x1b[32m  ✓ Database ready\x1b[0m');

        // Migrate to TailwindCSS v4 if selected
        if (tailwindVersion === 'v4') {
          console.log('');
          console.log('\x1b[36m  Migrating to TailwindCSS v4...\x1b[0m');
          execSync('npm run tailwind:migrate to-v4', { stdio: 'inherit', timeout: 60000 });
          console.log('\x1b[32m  ✓ TailwindCSS v4 ready\x1b[0m');
        }
      } finally {
        process.chdir(originalDir);
      }

      console.log('');
      console.log('\x1b[1;36m  ✓ Project created successfully!\x1b[0m');
      console.log('');
      console.log('\x1b[90m  Next steps:\x1b[0m');
      console.log('');
      console.log('    cd ' + projectDirectory);
      console.log('    ' + getRunCommand(packageManager) + ' dev');
      console.log('');
      console.log('\x1b[90m  Learn more: https://laju.dev\x1b[0m');
      console.log('\x1b[90m  Docs: https://github.com/maulanashalihin/laju/tree/main/docs\x1b[0m');
      console.log('');

    } catch (error) {
      console.error('Error:', error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();