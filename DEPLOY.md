# 🚀 Guia de Deploy para GitHub Pages

Este guia explica como fazer o deploy do seu catálogo de móveis no GitHub Pages.

## 📋 Pré-requisitos

1. Conta no GitHub
2. Repositório criado no GitHub
3. Git instalado localmente

## 🔧 Configuração Inicial

### 1. Preparar o Repositório

```bash
# Clone ou navegue até seu repositório local
git clone https://github.com/SEU-USUARIO/NOME-DO-REPO.git
cd NOME-DO-REPO

# Adicione todos os arquivos do projeto
git add .
git commit -m "Adicionar projeto catálogo de móveis"
git push origin main
```

### 2. Fazer Build para Produção

```bash
# Execute o script de build personalizado
node build-for-github-pages.js
```

Este script irá:
- Fazer build do projeto com Vite
- Copiar arquivos para a pasta `docs/`
- Manter arquivos especiais como `.nojekyll` e `404.html`

### 3. Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione:
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/ (root)` ou `/docs`
4. Clique em **Save**

### 4. Aguardar Deploy

- O GitHub Actions irá automaticamente fazer o deploy
- Aguarde alguns minutos
- Seu site estará disponível em: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`

## 🔄 Atualizações

Para atualizar o site:

```bash
# Faça suas alterações no código
# Execute o build novamente
node build-for-github-pages.js

# Commit e push
git add .
git commit -m "Atualizar site"
git push origin main
```

## 🌐 Domínio Personalizado (Opcional)

Se você tem um domínio próprio:

1. Edite o arquivo `docs/CNAME`
2. Adicione seu domínio: `moveisdesign.com`
3. Configure o DNS do seu domínio para apontar para `SEU-USUARIO.github.io`

## 🔧 Integração com GitHub para Upload de Imagens

Para ativar o upload de imagens direto para o GitHub:

### 1. Criar Personal Access Token

1. Vá em **Settings** → **Developer settings** → **Personal access tokens**
2. Clique em **Generate new token (classic)**
3. Selecione os escopos:
   - `repo` (acesso completo aos repositórios)
4. Copie o token gerado

### 2. Configurar Variáveis de Ambiente

Para desenvolvimento local, crie um arquivo `.env`:

```env
GITHUB_TOKEN=ghp_seu_token_aqui
GITHUB_OWNER=seu-usuario
GITHUB_REPO=nome-do-repositorio
```

### 3. Atualizar Backend para Produção

O backend precisará ser adaptado para funcionar como uma função serverless ou API externa, já que o GitHub Pages só serve arquivos estáticos.

Opções recomendadas:
- **Vercel Functions**
- **Netlify Functions** 
- **Firebase Functions**
- **Supabase Edge Functions**

## 📁 Estrutura Final

```
seu-repositorio/
├── docs/                  # Arquivos do GitHub Pages
│   ├── index.html        # Página principal
│   ├── 404.html          # Página de erro 404
│   ├── .nojekyll         # Desabilita Jekyll
│   ├── CNAME             # Domínio personalizado (opcional)
│   └── assets/           # CSS, JS e outros recursos
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions para deploy automático
├── client/               # Código fonte React
├── server/               # Backend (para desenvolvimento)
├── shared/               # Tipos compartilhados
├── build-for-github-pages.js  # Script de build
└── README.md
```

## 🚨 Solução de Problemas

### Site não carrega após deploy
- Verifique se o GitHub Pages está ativo nas configurações
- Aguarde alguns minutos para propagação
- Verifique se o arquivo `index.html` existe na pasta docs

### Imagens não aparecem
- Verifique se as URLs das imagens estão corretas
- Para desenvolvimento, use URLs completas do GitHub
- Para produção, configure backend externo

### Erro 404 em rotas
- O arquivo `404.html` redireciona para a home
- Para SPA routing, todas as rotas são tratadas pelo React Router

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no GitHub Actions
2. Consulte a documentação do GitHub Pages
3. Verifique se todos os arquivos estão na pasta `docs/`

---

Seu catálogo de móveis estará online e acessível para seus clientes!