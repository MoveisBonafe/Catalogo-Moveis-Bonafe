
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

// Validate HTML files
const validateHTML = (filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Basic HTML validation
        const hasDoctype = content.includes('<!DOCTYPE html>') || content.includes('<!doctype html>');
        const hasHtmlTag = content.includes('<html') && content.includes('</html>');
        const hasHead = content.includes('<head>') && content.includes('</head>');
        const hasBody = content.includes('<body>') && content.includes('</body>');
        
        return hasDoctype && hasHtmlTag && hasHead && hasBody;
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return false;
    }
};

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
        if (validateHTML(file)) {
            console.log(`✅ ${file} - Valid HTML structure`);
        } else {
            console.log(`❌ ${file} - Invalid HTML structure`);
            buildSuccess = false;
        }
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

// Create products directory if it doesn't exist
const productsDir = 'docs/images/produtos';
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
    console.log(`✅ Created: ${productsDir}`);
}

// Create empty products.json if it doesn't exist
const productsFile = 'docs/products.json';
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, '[]');
    console.log(`✅ Created: ${productsFile}`);
} else {
    // Validate JSON
    try {
        const content = fs.readFileSync(productsFile, 'utf8');
        JSON.parse(content);
        console.log(`✅ ${productsFile} - Valid JSON`);
    } catch (error) {
        console.log(`❌ ${productsFile} - Invalid JSON`);
        // Fix invalid JSON
        fs.writeFileSync(productsFile, '[]');
        console.log(`✅ Fixed ${productsFile}`);
    }
}

if (buildSuccess) {
    console.log('\n🎉 Build completed successfully!');
    console.log('📁 Files ready for GitHub Pages deployment in docs/ folder');
    console.log('\n🚀 Next steps:');
    console.log('   1. Commit changes to GitHub');
    console.log('   2. GitHub Pages will automatically deploy from docs/ folder');
    process.exit(0);
} else {
    console.log('\n❌ Build failed - please fix the issues above');
    process.exit(1);
}
