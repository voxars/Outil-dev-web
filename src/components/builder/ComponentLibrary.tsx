'use client'

import { DraggableComponentData, ComponentType } from '@/types'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { 
  Layout, 
  Star, 
  User, 
  Grid3X3, 
  Image, 
  MessageSquare, 
  Mail,
  Plus,
  Layers,
  Square,
  AlignJustify,
  Move
} from 'lucide-react'

const componentLibrary: DraggableComponentData[] = [
  {
    type: 'header',
    label: 'En-tête',
    icon: 'Layout',
    description: 'Navigation et logo du site',
    defaultProps: { title: 'Mon Site', showNavigation: true },
    canBeInGrid: false
  },
  {
    type: 'hero',
    label: 'Section Hero',
    icon: 'Star',
    description: 'Section principale d\'accueil',
    defaultProps: { title: 'Bienvenue', subtitle: 'Description' },
    canBeInGrid: false
  },
  {
    type: 'about',
    label: 'À Propos',
    icon: 'User',
    description: 'Section de présentation',
    defaultProps: { title: 'À Propos', content: 'Notre histoire...' },
    canBeInGrid: false
  },
  {
    type: 'services',
    label: 'Services',
    icon: 'Grid3X3',
    description: 'Liste des services proposés',
    defaultProps: { title: 'Nos Services', items: [] },
    canBeInGrid: true
  },
  {
    type: 'portfolio',
    label: 'Portfolio',
    icon: 'Image',
    description: 'Galerie de projets',
    defaultProps: { title: 'Portfolio', items: [] },
    canBeInGrid: true
  },
  {
    type: 'testimonials',
    label: 'Témoignages',
    icon: 'MessageSquare',
    description: 'Avis clients',
    defaultProps: { title: 'Témoignages', items: [] },
    canBeInGrid: true
  },
  {
    type: 'contact',
    label: 'Contact',
    icon: 'Mail',
    description: 'Formulaire de contact',
    defaultProps: { title: 'Contactez-nous', showForm: true },
    canBeInGrid: false
  },
  {
    type: 'footer',
    label: 'Pied de page',
    icon: 'Square',
    description: 'Informations du pied de page',
    defaultProps: { copyright: '© 2024 Mon Site' },
    canBeInGrid: false
  },
  {
    type: 'scrollable-grid',
    label: 'Grille Défilante',
    icon: 'Layers',
    description: 'Conteneur avec défilement pour plusieurs éléments',
    defaultProps: { 
      columns: 3, 
      gap: '1rem', 
      scrollable: true, 
      maxHeight: '400px' 
    },
    canBeInGrid: false
  },
  {
    type: 'grid',
    label: 'Grille Simple',
    icon: 'Grid3X3',
    description: 'Conteneur en grille pour organiser les éléments',
    defaultProps: { columns: 2, gap: '1rem' },
    canBeInGrid: false
  }
]

const iconMap = {
  Layout,
  Star,
  User,
  Grid3X3,
  Image,
  MessageSquare,
  Mail,
  Plus,
  Layers,
  Square,
  AlignJustify,
  Move
}

interface DraggableComponentProps {
  component: DraggableComponentData
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ component }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `library-${component.type}`,
    data: {
      type: component.type,
      fromLibrary: true,
      defaultProps: component.defaultProps,
      canBeInGrid: component.canBeInGrid
    }
  })

  const style = {
    opacity: isDragging ? 0.6 : 1,
    // Pas de transform pour garder l'élément à sa place
    zIndex: 'auto',
    pointerEvents: isDragging ? 'none' as const : undefined
  }

  const IconComponent = iconMap[component.icon as keyof typeof iconMap] || Plus

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        cursor-grab active:cursor-grabbing
        hover:shadow-lg transition-all duration-200 
        bg-gradient-to-br from-purple-50 to-blue-50 
        border-purple-200 hover:border-purple-300
        ${isDragging ? 'shadow-2xl border-blue-400' : ''}
      `}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex-shrink-0">
            <IconComponent className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium text-gray-900">
              {component.label}
            </CardTitle>
          </div>
          <Move className="h-4 w-4 text-gray-400" />
        </div>
        
        <CardDescription className="text-xs text-gray-500 mb-2">
          {component.description}
        </CardDescription>

        {component.canBeInGrid && (
          <div className="text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded font-medium">
            📋 Compatible grille
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ComponentLibrary() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'component-library',
    data: {
      type: 'library'
    }
  })

  return (
    <div 
      ref={setNodeRef}
      className={`w-80 bg-gradient-to-b from-white to-purple-50 border-r border-purple-200 p-4 overflow-y-auto backdrop-blur-sm component-library builder-interface transition-all duration-200 ${
        isOver ? 'bg-red-50 border-red-300' : ''
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 text-purple-800">
        Composants
      </h2>
      <p className="text-sm text-purple-600 mb-4">
        Glissez et déposez les éléments sur votre site
      </p>
      
      {isOver && (
        <div className="mb-4 p-3 bg-red-100 border-2 border-dashed border-red-300 rounded-lg text-center">
          <span className="text-red-600 font-medium text-sm">
            ❌ Relâchez ici pour annuler l'ajout
          </span>
        </div>
      )}
      
      <div className="space-y-3">
        {componentLibrary.map((component) => (
          <DraggableComponent 
            key={component.type} 
            component={component} 
          />
        ))}
      </div>
    </div>
  )
}