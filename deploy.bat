@echo off
REM Script de déploiement Windows pour l'application Next.js

echo 🚀 Démarrage du déploiement...

REM Vérifier si Docker est installé
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

REM Vérifier si Docker Compose est installé
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord.
    pause
    exit /b 1
)

REM Arrêter les conteneurs existants
echo 🛑 Arrêt des conteneurs existants...
docker-compose down

REM Construire l'image
echo 🔨 Construction de l'image Docker...
docker-compose build --no-cache

REM Démarrer les services
echo 🟢 Démarrage des services...
docker-compose up -d

REM Vérifier le statut
echo 📊 Vérification du statut...
docker-compose ps

echo ✅ Déploiement terminé!
echo 🌐 Votre application est accessible sur :
echo    - http://localhost (si nginx est configuré)
echo    - http://localhost:3000 (accès direct)

set /p show_logs="Voulez-vous voir les logs en temps réel ? (y/N): "
if /i "%show_logs%"=="y" (
    docker-compose logs -f
)

pause