#!/bin/bash
echo "🔧 Preparando build para GitHub Pages..."

# Verifica se os arquivos principais existem
if [ ! -f "docs/index.html" ]; then
    echo "❌ Erro: docs/index.html não encontrado"
    exit 1
fi

if [ ! -f "docs/gestao.html" ]; then
    echo "❌ Erro: docs/gestao.html não encontrado"
    exit 1
fi

echo "✅ Arquivo principal do catálogo: docs/index.html"
echo "✅ Arquivo de gestão: docs/gestao.html"
echo "✅ Diretório de imagens: docs/images/"

# Cria arquivo products.json se não existir
if [ ! -f "docs/products.json" ]; then
    echo "[]" > docs/products.json
    echo "✅ Criado arquivo products.json vazio"
fi

echo "🎉 Build concluído com sucesso!"
echo "📋 Para testar localmente:"
echo "   cd docs && python3 -m http.server 3000"
echo "🌐 Para deploy:"
echo "   Commit e push para GitHub - o GitHub Pages será atualizado automaticamente"