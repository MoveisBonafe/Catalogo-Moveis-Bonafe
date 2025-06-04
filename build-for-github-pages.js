#!/usr/bin/env node

/**
 * Script para fazer build e preparar o projeto para GitHub Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Iniciando build para GitHub Pages...');

try {
  // 1. Fazer build do projeto
  console.log('📦 Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. Criar diretório docs se não existir
  const docsDir = path.join(__dirname, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }

  // 3. Limpar arquivos antigos (exceto arquivos especiais)
  console.log('🧹 Limpando arquivos antigos...');
  const filesToKeep = ['.nojekyll', 'CNAME', '404.html'];
  const files = fs.readdirSync(docsDir);
  
  files.forEach(file => {
    if (!filesToKeep.includes(file)) {
      const filePath = path.join(docsDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });

  // 4. Copiar arquivos do build
  console.log('📋 Copiando arquivos do build...');
  const distDir = path.join(__dirname, 'dist');
  
  if (fs.existsSync(distDir)) {
    const copyRecursive = (src, dest) => {
      const stat = fs.statSync(src);
      if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest);
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
          copyRecursive(path.join(src, file), path.join(dest, file));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };
    
    const files = fs.readdirSync(distDir);
    files.forEach(file => {
      const srcPath = path.join(distDir, file);
      const destPath = path.join(docsDir, file);
      copyRecursive(srcPath, destPath);
    });
  }

  // 5. Verificar se o arquivo index.html foi copiado corretamente
  const indexPath = path.join(docsDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ Build concluído com sucesso!');
    console.log('📁 Arquivos preparados na pasta docs/');
    console.log('🚀 Agora você pode fazer commit e push para o GitHub');
    console.log('⚙️  Configure o GitHub Pages para usar a pasta docs/');
  } else {
    console.error('❌ Erro: index.html não foi encontrado no build');
  }

} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}