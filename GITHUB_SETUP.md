# 🚀 Configuração Completa do GitHub Pages

## Problema Atual
O site não está carregando no GitHub Pages devido a configurações de caminho de assets.

## Soluções Implementadas

### 1. Arquivos HTML Corrigidos
✅ Atualizei todos os arquivos HTML na pasta `docs/` com caminhos relativos
✅ Configurei meta tags em português
✅ Criei página de administração separada (`gestao.html`)

### 2. GitHub Actions (Recomendado)
✅ Criei workflow automático em `.github/workflows/deploy.yml`
Este workflow irá:
- Fazer build automaticamente
- Corrigir caminhos dos assets
- Fazer deploy no GitHub Pages

### 3. Configuração Manual Alternativa

Se o GitHub Actions não funcionar, execute estes comandos no terminal:

```bash
# 1. Fazer build
npm run build

# 2. Copiar arquivos
cp -r dist/public/* docs/

# 3. Corrigir caminhos manualmente
sed -i 's|src="/assets/|src="./assets/|g' docs/index.html
sed -i 's|href="/assets/|href="./assets/|g' docs/index.html
```

## Passos para Ativar GitHub Pages

### No seu repositório GitHub:

1. **Settings** → **Pages**
2. **Source**: "Deploy from a branch"
3. **Branch**: main (ou master)
4. **Folder**: /docs
5. **Save**

### Se usar GitHub Actions:
1. **Settings** → **Pages**
2. **Source**: "GitHub Actions"
3. O workflow será executado automaticamente

## URLs de Acesso

Após o deploy:
- **Site principal**: `https://SEU-USUARIO.github.io/SEU-REPO`
- **Administração**: `https://SEU-USUARIO.github.io/SEU-REPO/gestao.html`

## Acesso Discreto à Administração

1. **URL direta**: `/gestao.html`
2. **Sequência de teclas**: Digite "admin" na página principal

## Estrutura Final

```
docs/
├── index.html          # Site principal (caminhos relativos)
├── gestao.html         # Administração (noindex)
├── 404.html           # Roteamento SPA
├── assets/            # CSS e JavaScript
├── images/produtos/   # Imagens dos produtos
└── manifest.json      # PWA manifest
```

## Verificação

Para verificar se funciona:
1. Acesse a URL do GitHub Pages
2. Abra DevTools (F12)
3. Verifique se não há erros 404 na aba Console
4. Teste o acesso à administração

## Upload de Imagens

Para ativar o upload automático:
1. Configure credenciais GitHub conforme `CONFIGURACAO_GITHUB.md`
2. Use um backend externo (Vercel/Netlify) para produção
3. Teste primeiro em ambiente local