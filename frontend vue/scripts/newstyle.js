/* eslint-disable no-undef */
// param: npm run new:style <stylename> <subfolder>(optional)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Determine the directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command-line arguments
const args = process.argv.slice(2);
const [componentName, componentPathArg] = args;
const componentPath = componentPathArg || '';

// Check if the component already exists
const componentExists = fs.existsSync(path.join(__dirname, '../src/assets', componentPath, `${componentName}.css`));
if (componentExists) {
    console.error(`❌ Style ${componentName} already exists`);
    process.exit(1);
}

// Determine the directory
const componentsPath = componentPath ? path.join(__dirname, '../src/assets', componentPath) : path.join(__dirname, '../src/assets');

// Ensure the directory exists
fs.mkdirSync(componentsPath, { recursive: true });

// Determine the file name
const fileName = `${componentName}.css`;

// Create the file
const filePath = path.join(componentsPath, fileName);
try {
    fs.writeFileSync(filePath, `/* Add your styles here */`);
    console.log(`✅ Style ${fileName} created`);
} catch (error) {
    console.error(`❌ Failed to create style ${fileName}: ${error.message}`);
    process.exit(1);
}

// Add @import statement to main.css
const mainCssPath = path.join(__dirname, '../src/assets/main.css');
const importStatement = `@import './${componentPath ? componentPath + '/' : ''}${fileName}';\n`;

try {
    // Read the current contents of main.css
    const mainCssContent = fs.readFileSync(mainCssPath, 'utf8');

    // Add the import statement at the top
    const updatedMainCssContent = importStatement + mainCssContent;

    // Write the updated content back to main.css
    fs.writeFileSync(mainCssPath, updatedMainCssContent, 'utf8');
    console.log(`✅ Added import statement to main.css`);
} catch (error) {
    console.error(`❌ Failed to update main.css: ${error.message}`);
}
