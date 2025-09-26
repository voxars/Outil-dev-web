#!/bin/bash

# Script de déploiement pour l'application Next.js
echo "🚀 Démarrage du déploiement..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose down

# Construire l'image
echo "🔨 Construction de l'image Docker..."
docker-compose build --no-cache

# Démarrer les services
echo "🟢 Démarrage des services..."
docker-compose up -d

# Vérifier le statut
echo "📊 Vérification du statut..."
docker-compose ps

echo "✅ Déploiement terminé!"
echo "🌐 Votre application est accessible sur :"
echo "   - http://localhost (si nginx est configuré)"
echo "   - http://localhost:3000 (accès direct)"

# Afficher les logs en temps réel (optionnel)
read -p "Voulez-vous voir les logs en temps réel ? (y/N): " show_logs
if [[ $show_logs =~ ^[Yy]$ ]]; then
    docker-compose logs -f
fi