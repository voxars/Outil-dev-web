# Guide de Déploiement - Outil de Développement Web

## 📋 Prérequis

- **Docker** et **Docker Compose** installés sur votre serveur
- **Nom de domaine** pointant vers l'IP de votre serveur (optionnel)
- **Certificat SSL** pour HTTPS (optionnel mais recommandé)

## 🚀 Options de Déploiement

### Option 1 : Déploiement Simple (sans domaine personnalisé)

```bash
# 1. Cloner le projet sur votre serveur
git clone <votre-repo> /path/to/app
cd /path/to/app

# 2. Copier la configuration d'environnement
cp .env.example .env.local

# 3. Lancer le déploiement
./deploy.sh  # Linux/Mac
# ou
deploy.bat   # Windows
```

Votre application sera accessible sur `http://votre-ip:3000`

### Option 2 : Déploiement avec Nginx et Domaine Personnalisé

```bash
# 1. Modifier nginx.conf
# Remplacez 'votre-domaine.com' par votre vrai domaine

# 2. Configurer les certificats SSL (optionnel)
mkdir ssl
# Copiez vos certificats dans le dossier ssl/

# 3. Modifier docker-compose.yml si nécessaire
# Décommentez la section nginx

# 4. Lancer le déploiement
docker-compose up -d
```

Votre application sera accessible sur `http://votre-domaine.com`

### Option 3 : Déploiement sur un Sous-Domaine

```bash
# 1. Créer un sous-domaine (ex: builder.votre-domaine.com)
# 2. Pointer le sous-domaine vers votre serveur via DNS
# 3. Modifier nginx.conf avec le bon server_name
# 4. Déployer comme dans l'option 2
```

## 📝 Configuration Personnalisée

### Variables d'Environnement

Modifiez `.env.local` selon vos besoins :

```env
NEXT_PUBLIC_BASE_URL=https://votre-domaine.com
NEXT_PUBLIC_DOMAIN=votre-domaine.com
PORT=3000
NODE_ENV=production
```

### Configuration Nginx

Pour un domaine personnalisé, modifiez `nginx.conf` :

```nginx
server_name votre-domaine.com www.votre-domaine.com;
```

### Certificats SSL

Pour HTTPS, placez vos certificats dans le dossier `ssl/` :
- `ssl/certificate.crt`
- `ssl/private.key`

## 🔧 Commandes Utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer l'application
docker-compose restart

# Arrêter l'application
docker-compose down

# Reconstruire après modifications
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Voir le statut des conteneurs
docker-compose ps
```

## 🌐 Accès par Lien Personnalisé

### Avec un nom de domaine :
- `https://votre-domaine.com`
- `https://builder.votre-domaine.com` (sous-domaine)

### Avec une IP publique :
- `http://votre-ip:3000`
- Via un reverse proxy sur le port 80/443

### Solutions d'hébergement recommandées :
- **VPS** : OVH, Scaleway, DigitalOcean
- **Cloud** : AWS EC2, Google Cloud, Azure
- **Serveur dédié** : Kimsufi, So You Start

## 🔒 Sécurité

1. **Firewall** : Ouvrez uniquement les ports 80, 443, et 22 (SSH)
2. **SSL** : Utilisez Let's Encrypt pour des certificats gratuits
3. **Updates** : Maintenez Docker et le système à jour
4. **Backup** : Sauvegardez régulièrement vos données

## 📞 Support

En cas de problème :
1. Vérifiez les logs avec `docker-compose logs`
2. Vérifiez que les ports sont ouverts
3. Vérifiez la configuration DNS
4. Vérifiez les certificats SSL

## 🎯 Exemple Complet

Pour déployer sur `builder.monsite.com` :

```bash
# 1. Configuration DNS
# A record: builder.monsite.com -> IP_DU_SERVEUR

# 2. Modifier nginx.conf
server_name builder.monsite.com;

# 3. Modifier .env.local
NEXT_PUBLIC_BASE_URL=https://builder.monsite.com
NEXT_PUBLIC_DOMAIN=builder.monsite.com

# 4. Obtenir un certificat SSL (Let's Encrypt)
certbot certonly --standalone -d builder.monsite.com

# 5. Copier les certificats
cp /etc/letsencrypt/live/builder.monsite.com/fullchain.pem ssl/certificate.crt
cp /etc/letsencrypt/live/builder.monsite.com/privkey.pem ssl/private.key

# 6. Déployer
docker-compose up -d
```

Votre application sera accessible sur `https://builder.monsite.com` ! 🎉