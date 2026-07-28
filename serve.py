#!/usr/bin/env python3
"""Tiny static server for local preview (avoids `python -m http.server` getcwd issue)."""
import os, functools, http.server, socketserver

ROOT = "/Users/vanchhay/Documents/wedding-web"
os.chdir(ROOT)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
Handler.extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                          ".svg": "image/svg+xml"}

PORT = int(os.environ.get("PORT", "8781"))
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"serving {ROOT} on http://127.0.0.1:{PORT}")
    httpd.serve_forever()
