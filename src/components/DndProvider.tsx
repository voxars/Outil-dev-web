'use client'

import React from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useBuilderStore } from '@/store/builder'
import { ComponentType } from '@/types'

interface DndProviderProps {
  children: React.ReactNode
}

export const DndProvider: React.FC<DndProviderProps> = ({ children }) => {
  const { addComponent, insertComponentAtIndex, reorderComponents } = useBuilderStore()
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [draggedItem, setDraggedItem] = React.useState<any>(null)

  // Configuration des capteurs pour un meilleur contrôle du drag & drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // Minimum 8px de mouvement avant d'activer le drag
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    setDraggedItem(active.data.current)
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Logique pour le drag over si nécessaire dans le futur
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event



    setActiveId(null)
    setDraggedItem(null)

    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    // Si on glisse depuis la bibliothèque et qu'on drop dans la bibliothèque, on annule
    if (activeData?.fromLibrary && over.id === 'component-library') {
      console.log('🚫 Drop annulé dans bibliothèque')
      return // Annule l'action
    }

    // Si on glisse depuis la bibliothèque vers une zone d'insertion
    if (activeData?.fromLibrary && overData?.type === 'insert-zone') {
      console.log('📍 Drop dans zone insertion')
      const componentType = activeData.type as ComponentType
      const defaultProps = activeData.defaultProps || {}
      const targetIndex = overData.targetIndex
      
      if (typeof targetIndex === 'number') {
        insertComponentAtIndex({
          type: componentType,
          props: defaultProps,
          styles: {}
        }, targetIndex)
      }
      return
    }

    // Si on glisse depuis la bibliothèque, gérer tous les cas
    if (activeData?.fromLibrary) {
      const componentType = activeData.type as ComponentType
      const defaultProps = activeData.defaultProps || {}
      const canBeInGrid = activeData.canBeInGrid

      // Cas 1: Drop via overData.type (GridDroppable)
      if (overData?.type === 'grid' && overData.parentId) {
        if (canBeInGrid) {
          addComponent({
            type: componentType,
            props: defaultProps,
            styles: {}
          }, overData.parentId)
        }
        return
      }

      // Cas 2: Drop direct sur l'ID d'une grille
      const findComponentById = (components: any[], id: string): any => {
        for (const comp of components) {
          if (comp.id === id) return comp
          if (comp.children) {
            const found = findComponentById(comp.children, id)
            if (found) return found
          }
        }
        return null
      }

      const { components } = useBuilderStore.getState()
      const targetComponent = findComponentById(components, over.id as string)
      
      if (targetComponent && (targetComponent.type === 'grid' || targetComponent.type === 'scrollable-grid')) {

        if (canBeInGrid) {
          addComponent({
            type: componentType,
            props: defaultProps,
            styles: {}
          }, over.id as string)
        }
        return
      }

      // Cas 3: Drop sur une zone d'insertion
      if (overData?.type === 'insert-zone') {
        const targetIndex = overData.targetIndex
        if (typeof targetIndex === 'number') {
          insertComponentAtIndex({
            type: componentType,
            props: defaultProps,
            styles: {}
          }, targetIndex)
        }
        return
      }

      // Cas 4: Drop sur canvas (par défaut)
      if (over.id === 'canvas') {
        addComponent({
          type: componentType,
          props: defaultProps,
          styles: {}
        })
        return
      }

      // Si aucun cas ne correspond, ne rien faire
      return
    }

    // Si on glisse depuis la bibliothèque vers le canvas
    if (activeData?.fromLibrary && over.id === 'canvas') {
      console.log('🖼️ Drop sur canvas')
      const componentType = activeData.type as ComponentType
      const defaultProps = activeData.defaultProps || {}
      
      addComponent({
        type: componentType,
        props: defaultProps,
        styles: {}
      })
      return
    }

    // Réorganisation des composants existants
    if (active.id !== over.id && 
        !activeData?.fromLibrary && 
        !overData?.fromLibrary) {
      reorderComponents(active.id as string, over.id as string)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay 
        dropAnimation={{ 
          duration: 300, 
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' 
        }}
        style={{ 
          transformOrigin: 'center center',
        }}
      >
        {activeId && draggedItem ? (
          <div className="bg-white p-3 rounded-lg shadow-2xl border-2 border-blue-400 opacity-95 transform rotate-1 scale-110 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-900 text-sm">
                {draggedItem.fromLibrary 
                  ? `Ajouter ${getComponentLabel(draggedItem.type)}` 
                  : `Déplacer ${getComponentLabel(draggedItem.type)}`
                }
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Fonction utilitaire pour obtenir les labels des composants
function getComponentLabel(type: string): string {
  const labels: Record<string, string> = {
    header: 'En-tête',
    hero: 'Section Hero',
    about: 'À Propos',
    services: 'Services',
    portfolio: 'Portfolio',
    testimonials: 'Témoignages',
    contact: 'Contact',
    footer: 'Pied de page',
    grid: 'Grille',
    'scrollable-grid': 'Grille Défilante',
    'grid-item': 'Élément de Grille'
  }
  return labels[type] || type
}