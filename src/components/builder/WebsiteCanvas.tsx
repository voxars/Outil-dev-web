'use client'

import React from 'react'
import { useBuilderStore } from '@/store/builder'
import { ComponentRenderer } from '@/components/website/ComponentRenderer'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ComponentType, WebsiteComponent } from '@/types'
import { GripVertical, Plus } from 'lucide-react'

interface DropZoneProps {
  id: string
  position: 'before' | 'after' | 'start'
  targetIndex?: number
  isVisible: boolean
}

const DropZone: React.FC<DropZoneProps> = ({ id, position, targetIndex, isVisible }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'insert-zone',
      position,
      targetIndex,
      accepts: ['header', 'hero', 'about', 'services', 'portfolio', 'testimonials', 'contact', 'footer', 'grid', 'scrollable-grid']
    }
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        relative transition-all duration-200
        ${isVisible ? 'h-2 opacity-100' : 'h-0 opacity-0'}
        ${isOver ? 'h-8' : ''}
      `}
    >
      <div className={`
        absolute inset-0 flex items-center justify-center
        ${isOver 
          ? 'bg-blue-100 border-2 border-dashed border-blue-400 rounded-lg' 
          : 'border-t-2 border-dashed border-gray-300'
        }
      `}>
        {isOver && (
          <div className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            <Plus className="w-3 h-3" />
            <span>Insérer ici</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface SortableComponentProps {
  component: WebsiteComponent
  index: number
  isPreviewMode: boolean
  selectedComponentId: string | null
  selectComponent: (id: string) => void
}

const SortableComponent: React.FC<SortableComponentProps> = ({
  component,
  index,
  isPreviewMode,
  selectedComponentId,
  selectComponent
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative group sortable-component
        ${isDragging ? 'shadow-2xl z-50' : ''}
      `}
      data-dragging={isDragging}
    >
      <ComponentRenderer
        component={component}
        isPreview={isPreviewMode}
        isSelected={selectedComponentId === component.id}
        onClick={() => !isPreviewMode && selectComponent(component.id)}
      />
      
      {!isPreviewMode && (
        <>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white shadow-lg rounded-lg px-2 py-1 text-xs text-gray-600">
              {component.type} #{index + 1}
            </div>
          </div>
          <div 
            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <div className="bg-white shadow-lg rounded-lg p-1">
              <GripVertical className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function WebsiteCanvas() {
  const { 
    components, 
    selectedComponentId, 
    selectComponent, 
    isPreviewMode,
    addComponent,
    insertComponentAtIndex,
    reorderComponents 
  } = useBuilderStore()

  // Fonction pour vérifier si un composant est un enfant d'un autre
  const isChildComponent = (componentId: string): boolean => {
    const findInChildren = (comps: typeof components): boolean => {
      for (const comp of comps) {
        if (comp.children) {
          if (comp.children.some(child => child.id === componentId)) {
            return true
          }
          if (findInChildren(comp.children)) {
            return true
          }
        }
      }
      return false
    }
    return findInChildren(components)
  }

  // Filtrer pour ne garder que les composants de niveau racine
  const rootComponents = components.filter(comp => !isChildComponent(comp.id))



  // Zone droppable pour le canvas
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas',
      accepts: ['header', 'hero', 'about', 'services', 'portfolio', 'testimonials', 'contact', 'footer', 'grid', 'scrollable-grid']
    }
  })

  const componentIds = rootComponents.map(c => c.id)

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    
    if (active.id !== over?.id) {
      const oldIndex = componentIds.indexOf(active.id)
      const newIndex = componentIds.indexOf(over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderComponents(active.id, over.id)
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Barre d'outils du canvas */}
      <div className="border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isPreviewMode ? 'Aperçu' : 'Éditeur'}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {rootComponents.length} composant{rootComponents.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Zone de contenu */}
      <div className="flex-1 overflow-auto">
        <div 
          ref={setNodeRef}
          className={`
            min-h-full p-4
            ${isOver ? 'bg-blue-50' : 'bg-gray-50'}
          `}
        >
          {rootComponents.length === 0 ? (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 bg-white rounded-lg">
              <div className="text-center">
                <div className="text-gray-600 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Commencez votre site</h3>
                <p className="text-sm text-gray-500">
                  Glissez-déposez des composants depuis la bibliothèque
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Zone de drop au début */}
              <DropZone 
                id="drop-start"
                position="start"
                targetIndex={0}
                isVisible={!isPreviewMode}
              />
              
              <SortableContext 
                items={componentIds} 
                strategy={verticalListSortingStrategy}
              >
                {rootComponents.map((component, index) => (
                  <React.Fragment key={component.id}>
                    <SortableComponent
                      component={component}
                      index={index}
                      isPreviewMode={isPreviewMode}
                      selectedComponentId={selectedComponentId}
                      selectComponent={selectComponent}
                    />
                    
                    {/* Zone de drop après chaque composant */}
                    <DropZone 
                      id={`drop-after-${index}`}
                      position="after"
                      targetIndex={index + 1}
                      isVisible={!isPreviewMode}
                    />
                  </React.Fragment>
                ))}
              </SortableContext>
              
              {isOver && (
                <div className="h-20 border-2 border-dashed border-blue-400 bg-blue-50 m-4 rounded-lg flex items-center justify-center">
                  <span className="text-blue-800 text-sm font-medium">
                    Relâchez ici pour ajouter le composant
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}