# 🔑 Configuração do GitHub para Upload de Imagens

Para ativar o upload automático de imagens direto para o GitHub, você precisa configurar as credenciais de acesso.

## 📋 Passo a Passo

### 1. Criar Personal Access Token

1. Acesse **GitHub.com** → **Settings** → **Developer settings**
2. Clique em **Personal access tokens** → **Tokens (classic)**
3. Clique em **Generate new token (classic)**
4. Configure:
   - **Note**: `Moveis Design - Upload Imagens`
   - **Expiration**: `No expiration` ou `1 year`
   - **Scopes**: Marque `repo` (Full control of private repositories)
5. Clique em **Generate token**
6. **IMPORTANTE**: Copie o token gerado (começa com `ghp_`)

### 2. Configurar Variáveis de Ambiente

Para desenvolvimento local, crie um arquivo `.env` na raiz do projeto:

```env
GITHUB_TOKEN=ghp_seu_token_aqui
GITHUB_OWNER=seu-usuario-github
GITHUB_REPO=nome-do-repositorio
```

### 3. Para Produção (GitHub Pages)

Como o GitHub Pages serve apenas arquivos estáticos, você precisará de um backend externo para o upload de imagens. Opções recomendadas:

#### Opção 1: Vercel (Recomendado)
1. Faça deploy do backend no Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. Atualize as URLs da API no frontend para apontar para o Vercel

#### Opção 2: Netlify Functions
1. Converta as rotas para Netlify Functions
2. Configure as variáveis no painel da Netlify
3. Deploy automático via GitHub

#### Opção 3: Firebase Functions
1. Migre o backend para Firebase Functions
2. Configure as credenciais no Firebase Console
3. Atualize as URLs da API

### 4. Configuração Manual Alternativa

Se preferir, você pode fazer upload manual das imagens:

1. Acesse `https://github.com/SEU-USUARIO/SEU-REPO`
2. Navegue até a pasta `images/produtos/`
3. Clique em **Add file** → **Upload files**
4. Arraste suas imagens
5. Commit as alterações
6. Use as URLs: `https://SEU-USUARIO.github.io/SEU-REPO/images/produtos/NOME-DA-IMAGEM.jpg`

## 🔧 Testando a Configuração

Para testar se as credenciais estão funcionando:

1. Acesse `/gestao` no seu site
2. Tente fazer upload de uma imagem
3. Se der erro de configuração, verifique as variáveis de ambiente
4. Se der erro de autenticação, regenere o token do GitHub

## 🚨 Segurança

- **NUNCA** compartilhe seu token do GitHub
- **NUNCA** faça commit do arquivo `.env`
- Use tokens com escopo mínimo necessário
- Regenere tokens periodicamente

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o token tem as permissões corretas
2. Confirme se as variáveis de ambiente estão definidas
3. Teste a conectividade com a API do GitHub