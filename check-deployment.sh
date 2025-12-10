#!/bin/bash

echo "🔍 Verificando configuración del proyecto..."
echo ""

echo "✅ Verificando Backend:"
echo "  - Dockerfile: "
if [ -f "backend/Dockerfile" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - .env.example: "
if [ -f "backend/.env.example" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - Procfile: "
if [ -f "backend/Procfile" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - migrate.js: "
if [ -f "backend/migrate.js" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo ""
echo "✅ Verificando Frontend:"
echo "  - .env.example: "
if [ -f "frontend/.env.example" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - netlify.toml: "
if [ -f "netlify.toml" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - public/_redirects: "
if [ -f "frontend/public/_redirects" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo ""
echo "✅ Documentación:"
echo "  - DEPLOYMENT.md: "
if [ -f "DEPLOYMENT.md" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo "  - GUIA-RAPIDA.md: "
if [ -f "GUIA-RAPIDA.md" ]; then echo "    ✓ Existe"; else echo "    ✗ Falta"; fi

echo ""
echo "✅ Git status:"
git status --short

echo ""
echo "🚀 Listo para despliegue!"
