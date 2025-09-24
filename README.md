# Website Builder - Créateur de Sites Vitrine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

Une application web moderne permettant de créer facilement des sites internet vitrine avec une interface drag & drop intuitive.

> 🎉 **Projet Open Source** - Libre d'utilisation, modification et distribution !

## 🚀 Fonctionnalités Principales

- **Interface Drag & Drop** : Glissez-déposez des composants pour construire votre site
- **Composants Pré-construits** : Header, Hero, Services, Portfolio, Contact, Footer...
- **Prévisualisation en Temps Réel** : Voyez vos modifications instantanément
- **Éditeur de Propriétés** : Personnalisez chaque composant facilement
- **Templates Prêts à l'Emploi** : Modèles pour différents types d'activités
- **Export HTML/CSS** : Téléchargez votre site généré
- **Thèmes Personnalisables** : Couleurs, polices et styles modulables

## 🛠 Technologies Utilisées

- **Framework** : Next.js 14+ avec App Router
- **Langage** : TypeScript
- **UI/UX** : Tailwind CSS + Headless UI
- **Drag & Drop** : @dnd-kit/core
- **Icônes** : Lucide React
- **Gestion d'État** : Zustand
- **Validation** : Zod

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/voxars/Outil-dev-web
   cd website-builder
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

### Commandes disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Production  
npm run build        # Compile l'application
npm run start        # Lance l'application compilée

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
npm run type-check   # Vérifie les types TypeScript
```

### Structure du projet

```
src/
├── app/              # App Router Next.js
├── components/       # Composants réutilisables
│   ├── ui/          # Composants UI de base
│   ├── builder/     # Composants de l'éditeur
│   └── website/     # Composants de site vitrine
├── lib/             # Utilitaires et configuration
├── hooks/           # Hooks React personnalisés
├── types/           # Types TypeScript
├── store/           # Store Zustand
└── data/           # Templates et données par défaut
```

## 🎯 Utilisation

1. **Ajout de composants** : Utilisez la bibliothèque de composants à gauche
2. **Édition** : Cliquez sur un composant pour le sélectionner et modifier ses propriétés
3. **Prévisualisation** : Basculez en mode aperçu pour voir le rendu final
4. **Export** : Générez et téléchargez votre site web

## 🎨 Composants Disponibles

- **Header** : Navigation principale avec logo
- **Hero** : Section d'accueil avec titre et CTA
- **About** : Section de présentation
- **Services** : Grille de services/prestations
- **Portfolio** : Galerie de réalisations
- **Testimonials** : Témoignages clients
- **Contact** : Formulaire et informations de contact
- **Footer** : Pied de page avec liens et mentions

## 🔧 Personnalisation

### Modifier les couleurs de l'interface

1. **Couleurs globales** : Éditez `tailwind.config.ts`
2. **Composants UI** : Modifiez `src/components/ui/`
3. **Interface builder** : Personnalisez `src/components/builder/`

### Ajouter un nouveau composant

1. Définir le type dans `src/types/index.ts`
2. Ajouter les propriétés par défaut dans `src/data/templates.ts`
3. Implémenter le rendu dans `src/components/website/ComponentRenderer.tsx`
4. Ajouter l'éditeur de propriétés dans `src/components/builder/PropertyPanel.tsx`

### Créer un nouveau template

1. Définir la structure dans `src/data/templates.ts`
2. Configurer le thème et les composants
3. Ajouter l'aperçu et la description

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
# Puis déployez sur Vercel
```

### Netlify
```bash
npm run build
# Puis déployez le dossier 'out'
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Dépannage

### Erreurs courantes

**Port déjà utilisé**
```bash
# Changer le port
npm run dev -- -p 3001
```

**Erreurs de compilation TypeScript**
```bash
# Vérifier les types
npm run type-check
```

**Problèmes de cache**
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run dev
```

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créer une branche : `git checkout -b feature/nouvelle-fonctionnalite`
3. Commit : `git commit -m 'Ajout nouvelle fonctionnalité'`
4. Push : `git push origin feature/nouvelle-fonctionnalite`
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous **licence MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

### Qu'est-ce que cela signifie ?
✅ **Utilisation commerciale** - Vous pouvez l'utiliser dans vos projets commerciaux  
✅ **Modification** - Vous pouvez modifier le code comme vous le souhaitez  
✅ **Distribution** - Vous pouvez partager et redistribuer  
✅ **Usage privé** - Vous pouvez l'utiliser dans vos projets privés  
✅ **Pas de garantie** - Le logiciel est fourni "tel quel"

## 📞 Support

- 🐛 **Issues** : [GitHub Issues](https://github.com/voxars/Outil-dev-web/issues)
- 📧 **Email** : voxarsa@gmail.com
---

**Développé avec ❤️ pour simplifier la création de sites web**

