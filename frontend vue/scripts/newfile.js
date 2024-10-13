/* eslint-disable no-undef */
// param: npm run new:file <componentName> <directoryType> <register> <subDirectory>(optional)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get command-line arguments
const args = process.argv.slice(2);
const [componentName, directoryType, register, subDirectory] = args;

// Determine the directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let directory;
const viewsPath = path.join(__dirname, '../src/views');
const shellPath = path.join(__dirname, '../src/shell');

if (directoryType === 'view') {
    directory = subDirectory ? path.join(viewsPath, subDirectory) : viewsPath;
} else if (directoryType === 'shell') {
    directory = subDirectory ? path.join(shellPath, subDirectory) : shellPath;
} else if (directoryType === 'here') {
    directory = process.cwd();
} else {
    console.error('❌ Invalid directory type');
    process.exit(1);
}

// Determine the file name
const fileName = directoryType === 'shell' ? `${componentName}Shell.vue` : `${componentName}View.vue`;

// Create the file
const filePath = path.join(directory, fileName);
try {
    fs.writeFileSync(filePath, `<template>\n  <div>${componentName}</div>\n</template>\n<script>\nexport default {\n  name: '${componentName}'\n};\n</script>\n<style scoped>\n</style>\n`);
    console.log(`✅ Component ${fileName} created`);
} catch (error) {
    console.error(`❌ Failed to create component ${fileName}: ${error.message}`);
}

// Register the route if needed
if (register === 'true') {
    const routerPath = path.join(__dirname, '../src/router/index.js');
    try {
        let routerConfig = fs.readFileSync(routerPath, 'utf8');

        let routeConfig;
        if (directoryType === 'view') {
            routeConfig = `
            {
                path: "/${componentName.toLowerCase()}",
                name: "${componentName}",
                component: () => import('../views/${subDirectory ? subDirectory + '/' : ''}${componentName}View.vue')
            }`;
        } else if (directoryType === 'here') {
            const relativePath = path.relative(path.join(__dirname, '../src/router'), directory);
            routeConfig = `
            {
                path: "/${componentName.toLowerCase()}",
                name: "${componentName}",
                component: () => import('${relativePath.replace(/\\/g, '/')}/${fileName}')
            }`;
        } else if (directoryType === 'shell') {
            routeConfig = `
            {
                path: '/shell/${componentName.toLowerCase()}',
                name: '${componentName}',
                meta: { shell: true },
                component: () => import('../shell/${subDirectory ? subDirectory + '/' : ''}${componentName}Shell.vue'),
                children: []
            }`;
        }

        // Insert the new route before the last closing bracket of the routes array
        routerConfig = routerConfig.replace(/routes:\s*\[/, `routes: [${routeConfig},`);

        fs.writeFileSync(routerPath, routerConfig, 'utf8');
        console.log(`✅ Route for ${componentName} registered in router`);
    } catch (error) {
        console.error(`❌ Failed to register route for ${componentName}: ${error.message}`);
    }
}
