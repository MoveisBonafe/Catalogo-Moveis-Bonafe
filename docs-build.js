#!/usr/bin/env node
/**
 * Build script for GitHub Pages docs folder
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 Building GitHub Pages project...');

// Verify required files exist
const requiredFiles = [
    'docs/index.html',
    'docs/gestao.html'
];

let buildSuccess = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ Missing: ${file}`);
        buildSuccess = false;
    }
});

// Create images directory if it doesn't exist
const imagesDir = 'docs/images';
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`✅ Created: ${imagesDir}`);
}

// Create empty products.json if it doesn't exist
const productsFile = 'docs/products.json';
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, '[]');
    console.log(`✅ Created: ${productsFile}`);
}

// Validate HTML files
const validateHTML = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('<!DOCTYPE html>') && content.includes('</html>')) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        if (validateHTML(file)) {
            console.log(`✅ ${file} - Valid HTML`);
        } else {
            console.log(`⚠️  ${file} - HTML validation warning`);
        }
    }
});

if (buildSuccess) {
    console.log('\n🎉 Build completed successfully!');
    console.log('📁 Files ready for GitHub Pages deployment in docs/ folder');
    console.log('\n🚀 Next steps:');
    console.log('   1. Commit changes to GitHub');
    console.log('   2. GitHub Pages will automatically deploy from docs/ folder');
    console.log('   3. Access your site at: https://moveisbonafe.github.io/Catalogo-Moveis-Bonafe/');
    process.exit(0);
} else {
    console.log('\n❌ Build failed - missing required files');
    process.exit(1);
}