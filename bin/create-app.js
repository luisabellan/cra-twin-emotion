#! /usr/bin/env node

'use strict';

const path = require('path');
const util = require('util');
const packageJson = require('../package.json');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);

async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    error => {
      console.log('\x1b[31m', error, '\x1b[0m');
    };
  }
}

if (process.argv.length < 3) {
  console.log('\x1b[31m', 'You have to provide name to your app.');
  console.log('For example:');
  console.log('npx cra-twin-emotion my-app', '\x1b[0m');
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/luisabellan/cra-twin-emotion.git';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log(
      '\x1b[31m',
      `The file ${appName} already exist in the current directory, please give it another name.`,
      '\x1b[0m'
    );
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log('\x1b[33m', 'Downloading the project structure...', '\x1b[0m');
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);

    process.chdir(appPath);

    console.log('\x1b[34m', 'Installing dependencies...', '\x1b[0m');
    await runCmd('npm install');
    console.log();

    await runCmd('npx rimraf ./.git');

    fs.unlinkSync(path.join(appPath, 'LICENSE.MD'));
    fs.rmdirSync(path.join(appPath, 'bin'), { recursive: true });
    fs.unlinkSync(path.join(appPath, 'package.json'));

    buildPackageJson(packageJson, folderName);

    console.log(
      '\x1b[32m',
      'The installation is done, this is ready to use !',
      '\x1b[0m'
    );
    console.log();

    console.log('\x1b[34m', 'You can start by typing:');
    console.log(`cd ${folderName}`);
    console.log('npm start', '\x1b[0m');
    console.log();
    console.log('Check Readme.md for more informations');
    console.log();
  } catch (error) {
    console.log(error);
  }
}

setup();

function buildPackageJson(packageJson, folderName) {
  const { bin, keywords, license, homepage, repository, bugs, ...newPackage } =
    packageJson;

  Object.assign(newPackage, {
    name: folderName,
    version: '1.0.0',
    description: '',
    author: '',
    scripts: {
      start: 'craco start',
      build: 'craco build',
      test: 'craco test',
      eject: 'react-scripts eject',
      'lint:scss': "stylelint 'src/**/*.scss' --syntax scss",
      'lint:scss:fix': "stylelint 'src/**/*.scss' --syntax scss --fix",
      'lint:js': 'eslint . --ext .js,.jsx',
      'lint:js:fix': 'npm run lint:js -- --fix',
      lint: "eslint 'src/**/*.{js,jsx}'",
      'lint:fix': "eslint 'src/**/*.{js,jsx}' --fix",
      format: "prettier --write 'src/**/*.{js,jsx,css,scss}'",
    },

    dependencies: {
      '@babel/eslint-parser': '^7.15.8',
      '@craco/craco': '^6.3.0',
      '@emotion/react': '^11.4.1',
      '@emotion/styled': '^11.3.0',
      '@tailwindcss/aspect-ratio': '^0.3.0',
      '@tailwindcss/forms': '^0.3.4',
      '@tailwindcss/typography': '^0.4.1',
      '@testing-library/jest-dom': '^4.2.4',
      '@testing-library/react': '^9.5.0',
      '@testing-library/user-event': '^7.2.1',
      react: '^17.0.2',
      'react-dom': '^17.0.2',
      'react-router-dom': '^5.3.0',
      'react-scripts': '^4.0.3',
      'tailwindcss-children': '^2.1.0',
      'twin.macro': '^2.8.0',
    },

    eslintConfig: {
      extends: 'react-app',
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
      ],
    },
    devDependencies: {
      autoprefixer: '^9',
      'babel-eslint': '^10.1.0',
      'babel-plugin-preval': '^5.0.0',
      'eslint-config-prettier': '^6.15.0',
      'eslint-plugin-import': '^2.25.2',
      'eslint-plugin-jsx-a11y': '^6.4.1',
      'eslint-plugin-prettier': '^3.4.1',
      'eslint-plugin-react': '^7.26.1',
      'eslint-plugin-react-hooks': '^2.5.1',
      husky: '^7.0.2',
      'lint-staged': '^10.5.4',
      postcss: '^7',
      prettier: '^2.4.1',
      sass: '^1.43.2',
      tailwindcss: 'npm:@tailwindcss/postcss7-compat@^2.2.17',
    },
    babelMacros: {
      twin: {
        preset: 'emotion',
      },
      plugins: [
        'babel-plugin-macros',
        [
          '@emotion/babel-plugin-jsx-pragmatic',
          {
            export: 'jsx',
            import: '__cssprop',
            module: '@emotion/react',
          },
        ],
        [
          '@babel/plugin-transform-react-jsx',
          {
            pragma: '__cssprop',
            pragmaFrag: 'React.Fragment',
          },
        ],
      ],
      config: 'tailwind.config.js',
    },
    'lint-staged': {
      'src/**/*.{js,jsx}': ['eslint . --fix', 'git add'],
      'src/**/*.scss': ['stylelint --syntax scss --fix', 'git add'],
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
  });

  fs.writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    'utf8'
  );
}
