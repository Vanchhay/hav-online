#!/usr/bin/env python3
"""Tiny static server for local preview (avoids `python -m http.server` getcwd issue).

Binds all interfaces so a phone on the same Wi-Fi can reach it.
Override with HOST=127.0.0.1 to keep it local, or PORT=xxxx.
"""
import os, functools, http.server, socket, socketserver

ROOT = "/Users/vanchhay/Documents/wedding-web"
os.chdir(ROOT)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
Handler.extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                          ".svg": "image/svg+xml"}

PORT = int(os.environ.get("PORT", "8781"))
HOST = os.environ.get("HOST", "0.0.0.0")   # 0.0.0.0 = reachable from your phone on the same Wi-Fi


def lan_ip():
    """Best-effort LAN address to print, so you can type it into a phone."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("192.0.2.1", 1))        # TEST-NET-1; no packets are actually sent
        return s.getsockname()[0]
    except OSError:
        return None
    finally:
        s.close()


class Server(socketserver.TCPServer):
    allow_reuse_address = True             # restart without waiting out TIME_WAIT


with Server((HOST, PORT), Handler) as httpd:
    print(f"serving {ROOT}", flush=True)
    print(f"  this mac : http://127.0.0.1:{PORT}", flush=True)
    ip = lan_ip()
    if HOST == "0.0.0.0" and ip:
        print(f"  phone    : http://{ip}:{PORT}", flush=True)
    httpd.serve_forever()
