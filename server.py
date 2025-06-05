#!/usr/bin/env python3
import http.server
import socketserver
import os

# Change to docs directory to serve GitHub Pages files
os.chdir('docs')

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando em http://localhost:{PORT}")
    print("Acesse o catálogo em: http://localhost:3000")
    print("Acesse a gestão em: http://localhost:3000/gestao.html")
    httpd.serve_forever()