# 🪑 MóveisDesign - Catálogo de Móveis

Um catálogo moderno de móveis com painel administrativo e integração com GitHub Pages para hospedagem de imagens.

## 🌟 Características

- **Interface Responsiva**: Design moderno que funciona perfeitamente em desktop e mobile
- **Catálogo de Produtos**: Navegação intuitiva com filtros por categoria e busca
- **Painel Administrativo**: Gerenciamento completo de produtos e imagens
- **Upload para GitHub**: Integração direta para hospedar imagens no GitHub
- **Variações de Cor**: Sistema completo para diferentes cores dos produtos
- **Galeria de Imagens**: Visualização em carrossel com miniaturas
- **Design em Português**: Interface completamente localizada

## 🚀 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Roteamento**: Wouter
- **Estado**: TanStack Query
- **Formulários**: React Hook Form + Zod
- **Backend**: Node.js + Express
- **Armazenamento**: In-memory (facilmente extensível para PostgreSQL)

## 📱 Páginas

### Catálogo Principal (`/`)
- Hero section com chamada para ação
- Filtros por categoria e busca em tempo real
- Grid responsivo de produtos
- Modal detalhado com galeria de imagens
- Footer com informações de contato

### Painel Admin (`/admin`)
- Formulário de adição de produtos
- Upload de múltiplas imagens
- Gerenciamento de variações de cor
- Lista de produtos com ações CRUD
- Confirmação de exclusão

## ⚙️ Configuração para GitHub Pages

### 1. Preparação do Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/moveis-design.git
cd moveis-design

# Instale as dependências
npm install
```

### 2. Build para Produção

```bash
# Gere os arquivos otimizados
npm run build

# Copie os arquivos para a pasta docs
cp -r dist/* docs/
```

### 3. Configuração do GitHub

1. Vá para as configurações do repositório no GitHub
2. Na seção **Pages**, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)` ou `/docs`
3. Salve as configurações

### 4. Configuração de Domínio (Opcional)

Se você tem um domínio personalizado:

1. Edite o arquivo `docs/CNAME`
2. Adicione seu domínio (ex: `moveisdesign.com`)
3. Configure o DNS do seu domínio para apontar para o GitHub Pages

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação estará disponível em http://localhost:5000
```

## 📁 Estrutura do Projeto

```
moveis-design/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── lib/            # Utilitários e configurações
│   │   └── hooks/          # Hooks customizados
├── server/                 # Backend Express
│   ├── index.ts           # Servidor principal
│   ├── routes.ts          # Rotas da API
│   └── storage.ts         # Camada de dados
├── shared/                # Tipos e esquemas compartilhados
├── docs/                  # Arquivos para GitHub Pages
└── package.json
```

## 🎨 Personalização

### Cores e Tema

As cores principais estão definidas em `client/src/index.css`:

```css
:root {
  --primary: 43 96% 56%;     /* Amarelo principal */
  --background: 39 100% 97%; /* Fundo claro */
  --accent: 45 93% 58%;      /* Amarelo de destaque */
}
```

### Categorias de Produtos

Edite as categorias em `shared/schema.ts`:

```typescript
export const categories = [
  "Sofás",
  "Poltronas", 
  "Mesas",
  "Cadeiras",
  "Estantes",
  "Camas"
] as const;
```

### Cores dos Produtos

Configure as cores disponíveis em `client/src/lib/types.ts`:

```typescript
export const defaultColors: ColorVariation[] = [
  { name: "Cinza Escuro", value: "gray", hex: "#374151" },
  // Adicione mais cores conforme necessário
];
```

## 🔌 Integração com GitHub

Para fazer upload de imagens diretamente para o GitHub, você precisará:

1. **Token de Acesso**: Crie um Personal Access Token no GitHub
2. **Configuração**: Configure as variáveis de ambiente:
   ```
   GITHUB_TOKEN=seu_token_aqui
   GITHUB_OWNER=seu_usuario
   GITHUB_REPO=nome_do_repositorio
   ```

## 📤 Deploy

### GitHub Pages (Recomendado)

1. Faça commit das suas alterações
2. Execute o build: `npm run build`
3. Copie os arquivos: `cp -r dist/* docs/`
4. Faça commit da pasta docs
5. Configure o GitHub Pages para usar a pasta docs

### Outros Serviços

O projeto também é compatível com:
- Vercel
- Netlify
- Firebase Hosting
- Surge.sh

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: contato@moveisdesign.com
- 📱 WhatsApp: (11) 9999-9999
- 🌐 Website: [moveisdesign.com](https://moveisdesign.com)

---

Desenvolvido com ❤️ para transformar ambientes com design excepcional.