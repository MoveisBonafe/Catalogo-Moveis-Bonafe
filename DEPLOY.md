# 🚀 Guia de Deploy - GitHub Pages

Este guia explica como fazer o deploy do seu catálogo de móveis no GitHub Pages.

## 📋 Pré-requisitos

1. Conta no GitHub
2. Repositório criado no GitHub
3. Código do projeto commitado no repositório

## 🔧 Configuração do GitHub Pages

### Passo 1: Configurar o Repositório

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione **main** (ou master)
5. Em **Folder**, selecione **/docs**
6. Clique em **Save**

### Passo 2: Fazer o Build

Execute o script de build para GitHub Pages:

```bash
node build-for-github-pages.js
```

Este script irá:
- Fazer build do projeto
- Copiar arquivos para a pasta docs/
- Configurar roteamento para SPA
- Criar página de gestão separada
- Configurar estrutura de imagens

### Passo 3: Commit e Push

```bash
git add .
git commit -m "Deploy para GitHub Pages"
git push origin main
```

## 🌐 URLs de Acesso

Após o deploy, seu site estará disponível em:

- **Site principal**: `https://SEU-USUARIO.github.io/SEU-REPO`
- **Administração**: `https://SEU-USUARIO.github.io/SEU-REPO/gestao.html`

## 🔑 Configuração de Upload de Imagens

Para ativar o upload automático de imagens:

1. Siga o guia em `CONFIGURACAO_GITHUB.md`
2. Configure as variáveis de ambiente
3. Deploy o backend em um serviço como Vercel ou Netlify

## 🎯 Acesso à Administração

### Método 1: URL Direta
Acesse diretamente: `https://SEU-USUARIO.github.io/SEU-REPO/gestao.html`

### Método 2: Sequência de Teclas
Na página principal, digite "admin" para acessar automaticamente

## 🛠️ Troubleshooting

### Problema: 404 Error
- Verifique se GitHub Pages está configurado para usar a pasta /docs
- Confirme que os arquivos estão na pasta docs/
- Aguarde alguns minutos para propagação

### Problema: CSS/JS não carrega
- Verifique se os caminhos nos arquivos HTML são relativos (./assets/)
- Execute o script de build novamente

### Problema: Roteamento não funciona
- Confirme que o arquivo 404.html está na pasta docs/
- Verifique se o script de roteamento SPA está presente

## 📱 Domínio Personalizado (Opcional)

Para usar um domínio personalizado:

1. Crie um arquivo `CNAME` na pasta docs/ com seu domínio
2. Configure o DNS do seu domínio para apontar para GitHub Pages
3. Em Settings → Pages, configure o domínio personalizado

## 🔄 Atualizações

Para atualizar o site:

1. Faça as alterações no código
2. Execute `node build-for-github-pages.js`
3. Commit e push das alterações

O GitHub Pages atualizará automaticamente em alguns minutos.