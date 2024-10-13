/* eslint-disable no-undef */
// param: npm run new:comp <componentName> <componentPath>(optional)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Determine the directory of the current module.
 * @type {string}
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get command-line arguments.
 * @type {string[]}
 */
const args = process.argv.slice(2);

/**
 * The name of the component to create.
 * @type {string}
 */
const [componentName, componentPathArg] = args;

/**
 * The path where the component should be created.
 * @type {string}
 */
const componentPath = componentPathArg || '';

/**
 * Check if the component already exists.
 * @type {boolean}
 */
const componentExists = fs.existsSync(path.join(__dirname, '../src/components', componentPath, `${componentName}.vue`));
if (componentExists) {
    console.error(`❌ Component ${componentName} already exists`);
    process.exit(1);
}

/**
 * Determine the directory where the component should be created.
 * @type {string}
 */
const componentsPath = componentPath ? path.join(__dirname, '../src/components', componentPath) : path.join(__dirname, '../src/components');

/**
 * Ensure the directory exists.
 * @param {string} dirPath - The path of the directory to create.
 */
fs.mkdirSync(componentsPath, { recursive: true });

/**
 * The name of the file to create.
 * @type {string}
 */
const fileName = `${componentName}.vue`;

/**
 * The full path of the file to create.
 * @type {string}
 */
const filePath = path.join(componentsPath, fileName);

try {
    /**
     * Create the component file with a basic template.
     * @param {string} filePath - The path of the file to create.
     * @param {string} content - The content to write to the file.
     */
    fs.writeFileSync(filePath, `<template>\n  <div>${componentName}</div>\n</template>\n<script>\nexport default {\n  name: '${componentName}'\n};\n</script>`);
    console.log(`✅ Component ${fileName} created`);
} catch (error) {
    console.error(`❌ Failed to create component ${fileName}: ${error.message}`);
}
