<!-- Instructions Copilot pour l'utilisation des agents GitHub -->

# Projet : Outil de Développement Web - Créateur de Sites Vitrine

## État du Projet
- [x] ✅ Clarifier les Exigences du Projet - Next.js avec TypeScript sélectionné
- [ ] Structurer le Projet
- [ ] Personnaliser le Projet
- [ ] Installer les Extensions Requises
- [ ] Compiler le Projet
- [ ] Créer et Exécuter une Tâche
- [ ] Lancer le Projet
- [ ] Assurer une Documentation Complète

## Contexte du Projet
Ce projet est un outil de création de sites internet vitrine avec les fonctionnalités suivantes :
- Interface drag & drop pour créer des sites
- Composants pré-construits (header, hero, services, contact, etc.)
- Prévisualisation en temps réel
- Export de code HTML/CSS/JS
- Templates prêts à l'emploi
- Système de thèmes et couleurs

## Stack Technique
- **Framework** : Next.js 14+ avec App Router
- **Langage** : TypeScript
- **UI/UX** : Tailwind CSS + Headless UI
- **Drag & Drop** : @dnd-kit/core
- **Icônes** : Lucide React
- **Gestion d'état** : Zustand
- **Validation** : Zod

## Architecture Cible
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
└── data/           # Templates et données par défaut
```

## Fonctionnalités Principales
1. **Éditeur Visual** : Interface drag & drop intuitive
2. **Bibliothèque de Composants** : Sections pré-construites
3. **Système de Templates** : Modèles de sites complets
4. **Prévisualisation** : Aperçu en temps réel
5. **Export** : Génération de code propre
6. **Responsive Design** : Support mobile/tablet/desktop