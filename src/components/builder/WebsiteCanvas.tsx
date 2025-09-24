'use client'

import { useBuilderStore } from '@/store/builder'
import { ComponentRenderer } from '@/components/website/ComponentRenderer'

export function WebsiteCanvas() {
  const { 
    components, 
    selectedComponentId, 
    selectComponent, 
    isPreviewMode 
  } = useBuilderStore()

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div className="min-h-full">
        {components.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Créez votre site web</h3>
              <p className="text-sm text-gray-500">
                Commencez par ajouter des composants depuis la bibliothèque
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg mx-auto" style={{ maxWidth: '1200px' }}>
            {components.map((component) => (
              <ComponentRenderer
                key={component.id}
                component={component}
                isPreview={isPreviewMode}
                isSelected={selectedComponentId === component.id}
                onClick={() => !isPreviewMode && selectComponent(component.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}