import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to execute a command and log the output
function executeCommand(command) {
    try {
        const output = execSync(command, { stdio: 'pipe' });
        console.log(`✅ ${output.toString()}`);
    } catch (error) {
        console.error(`❌ Error executing command: ${command}`);
        console.error(error.message);
    }
}

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Install Tailwind CSS and its peer dependencies
console.log('Installing Tailwind CSS and its peer dependencies...');
executeCommand('npm install -D tailwindcss postcss autoprefixer');

// Initialize Tailwind CSS
console.log('Initializing Tailwind CSS...');
executeCommand('npx tailwindcss init -p');

// Update the Tailwind CSS configuration file
const tailwindConfigPath = path.join(__dirname, '../tailwind.config.js');
const tailwindConfigContent = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
try {
    fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
    console.log('✅ Updated Tailwind CSS configuration file.');
} catch (error) {
    console.error('❌ Error updating Tailwind CSS configuration file.');
    console.error(error.message);
}

// Update the CSS file to import Tailwind CSS
const cssFilePath = path.join(__dirname, '../src/assets/base.css');
const cssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

// Read the existing content of the CSS file
let existingCssContent = '';
try {
    if (fs.existsSync(cssFilePath)) {
        existingCssContent = fs.readFileSync(cssFilePath, 'utf-8');
    } else {
        // Create the directory if it doesn't exist
        fs.mkdirSync(path.dirname(cssFilePath), { recursive: true });
    }

    // Prepend the new content to the existing content
    const updatedCssContent = cssContent + existingCssContent;

    // Write the updated content back to the CSS file
    fs.writeFileSync(cssFilePath, updatedCssContent);
    console.log('✅ Updated CSS file to import Tailwind CSS.');
} catch (error) {
    console.error('❌ Error updating CSS file.');
    console.error(error.message);
}

console.log('✅ Updated postcss.config.js file.');
console.log('✅ Please restart the server to see the changes.');
