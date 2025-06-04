#!/usr/bin/env node

/**
 * Script para fazer build e preparar o projeto para GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Iniciando build para GitHub Pages...');

// 1. Fazer build do projeto
console.log('📦 Fazendo build do projeto...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erro no build:', error.message);
  process.exit(1);
}

// 2. Copiar arquivos do build para docs/
console.log('📁 Copiando arquivos para docs/...');
try {
  // Limpar pasta docs/ (exceto arquivos especiais)
  if (fs.existsSync('docs')) {
    const filesToKeep = ['.nojekyll', 'CNAME', 'robots.txt', 'sitemap.xml', 'manifest.json'];
    const files = fs.readdirSync('docs');
    
    files.forEach(file => {
      if (!filesToKeep.includes(file)) {
        const filePath = path.join('docs', file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
    });
  } else {
    fs.mkdirSync('docs', { recursive: true });
  }

  // Copiar arquivos do build
  execSync('cp -r dist/public/* docs/', { stdio: 'inherit' });
  
  console.log('✅ Arquivos copiados com sucesso!');
} catch (error) {
  console.error('❌ Erro ao copiar arquivos:', error.message);
  process.exit(1);
}

// 3. Criar página específica para gestão
console.log('🔧 Criando página de gestão...');
const gestaoHtml = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Gestão - MóveisDesign</title>
    <link rel="manifest" href="./manifest.json">
    <script type="module" crossorigin src="assets/index-DYV6__xm.js"></script>
    <link rel="stylesheet" crossorigin href="assets/index-CUUzcTvG.css">
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Redirecionar para a rota de gestão
      if (window.location.pathname.includes('gestao')) {
        history.replaceState(null, null, '/gestao');
      }
    </script>
  </body>
</html>`;

fs.writeFileSync('docs/gestao.html', gestaoHtml);

// 4. Atualizar 404.html para SPA routing
console.log('🔄 Configurando roteamento SPA...');
const notFoundHtml = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MóveisDesign - Catálogo de Móveis</title>
    <link rel="manifest" href="./manifest.json">
    <script type="module" crossorigin src="assets/index-DYV6__xm.js"></script>
    <link rel="stylesheet" crossorigin href="assets/index-CUUzcTvG.css">
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Handle client-side routing for GitHub Pages
      (function() {
        var redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        if (redirect && redirect != location.href) {
          history.replaceState(null, null, redirect);
        }
      })();
    </script>
  </body>
</html>`;

fs.writeFileSync('docs/404.html', notFoundHtml);

// 5. Criar pasta de imagens se não existir
console.log('📸 Criando estrutura de imagens...');
const imagesDir = 'docs/images/produtos';
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  
  // Criar um arquivo README na pasta de imagens
  const readmeContent = `# Imagens dos Produtos

Esta pasta contém as imagens dos produtos do catálogo.

## Estrutura
- Todas as imagens devem estar em formato JPG, PNG ou WebP
- Nomes de arquivo devem ser descritivos e únicos
- Recomenda-se usar resolução otimizada para web

## Upload Automático
O sistema de administração pode fazer upload automático das imagens para esta pasta via GitHub API.
`;
  fs.writeFileSync(path.join(imagesDir, 'README.md'), readmeContent);
}

console.log('🎉 Build concluído com sucesso!');
console.log('📋 Próximos passos:');
console.log('   1. Commit e push das alterações');
console.log('   2. Configurar GitHub Pages para usar a pasta /docs');
console.log('   3. Acessar o site em: https://SEU-USUARIO.github.io/SEU-REPO');
console.log('   4. Acessar gestão em: https://SEU-USUARIO.github.io/SEU-REPO/gestao.html');
console.log('   5. Configure as credenciais do GitHub conforme CONFIGURACAO_GITHUB.md');