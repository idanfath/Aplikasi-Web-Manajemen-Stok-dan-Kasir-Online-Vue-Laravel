import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define file paths
const baseCssPath = path.join(__dirname, '..', 'src', 'assets', 'base.css');
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');
const postcssConfigPath = path.join(__dirname, '..', 'postcss.config.js');

// CSS reset to be added
const cssReset = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;

// Remove Tailwind CSS directives from base.css and add CSS reset if not already present
if (fs.existsSync(baseCssPath)) {
    fs.readFile(baseCssPath, 'utf8', (err, data) => {
        if (err) throw err;
        if (!data.includes(cssReset.trim())) {
            const result = cssReset + data.replace(/@tailwind base;\s*@tailwind components;\s*@tailwind utilities;/g, '');
            fs.writeFile(baseCssPath, result, 'utf8', (err) => {
                if (err) throw err;
                console.log('✅ Updated base.css with CSS reset and removed Tailwind CSS directives');
            });
        } else {
            const result = data.replace(/@tailwind base;\s*@tailwind components;\s*@tailwind utilities;/g, '');
            fs.writeFile(baseCssPath, result, 'utf8', (err) => {
                if (err) throw err;
                console.log('✅ Removed Tailwind CSS directives from base.css');
            });
        }
    });
} else {
    console.log('❌ base.css does not exist, skipping update.');
}

// Delete tailwind.config.js
if (fs.existsSync(tailwindConfigPath)) {
    fs.unlink(tailwindConfigPath, (err) => {
        if (err) throw err;
        console.log('✅ Deleted tailwind.config.js');
    });
} else {
    console.log('❌ tailwind.config.js does not exist, skipping deletion.');
}

// Delete postcss.config.js
if (fs.existsSync(postcssConfigPath)) {
    fs.unlink(postcssConfigPath, (err) => {
        if (err) throw err;
        console.log('✅ Deleted postcss.config.js');
    });
} else {
    console.log('❌ postcss.config.js does not exist, skipping deletion.');
}

// Run npm uninstall command
exec('npm uninstall tailwindcss postcss autoprefixer', (err, stdout, stderr) => {
    if (err) {
        console.error(`❌ Error: ${err}`);
        return;
    }
    console.log(`✅ stdout: ${stdout}`);
    console.error(`❌ stderr: ${stderr}`);
});
