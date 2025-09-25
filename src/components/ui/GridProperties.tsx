'use client'

import React from 'react'
import { WebsiteComponent, GridConfig } from '@/types'
import { useBuilderStore } from '@/store/builder'

interface GridPropertiesProps {
  component: WebsiteComponent
}

export const GridProperties: React.FC<GridPropertiesProps> = ({ component }) => {
  const { updateComponent } = useBuilderStore()

  const gridProps = component.props as {
    columns?: number
    rows?: number
    gap?: string
    maxHeight?: string
    scrollable?: boolean
  }

  const handlePropertyChange = (property: string, value: any) => {
    updateComponent(component.id, {
      props: {
        ...component.props,
        [property]: value
      }
    })
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Configuration de la grille</h4>
      
      {/* Nombre de colonnes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Colonnes
        </label>
        <select
          value={gridProps.columns || 2}
          onChange={(e) => handlePropertyChange('columns', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value={1}>1 colonne</option>
          <option value={2}>2 colonnes</option>
          <option value={3}>3 colonnes</option>
          <option value={4}>4 colonnes</option>
          <option value={5}>5 colonnes</option>
          <option value={6}>6 colonnes</option>
        </select>
      </div>

      {/* Espacement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Espacement
        </label>
        <select
          value={gridProps.gap || '1rem'}
          onChange={(e) => handlePropertyChange('gap', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="0.5rem">Petit (0.5rem)</option>
          <option value="1rem">Moyen (1rem)</option>
          <option value="1.5rem">Grand (1.5rem)</option>
          <option value="2rem">Très grand (2rem)</option>
        </select>
      </div>

      {/* Défilement */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={gridProps.scrollable || false}
            onChange={(e) => handlePropertyChange('scrollable', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Activer le défilement
          </span>
        </label>
      </div>

      {/* Hauteur max (si défilement activé) */}
      {gridProps.scrollable && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hauteur maximale
          </label>
          <select
            value={gridProps.maxHeight || '400px'}
            onChange={(e) => handlePropertyChange('maxHeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="300px">300px</option>
            <option value="400px">400px</option>
            <option value="500px">500px</option>
            <option value="600px">600px</option>
            <option value="800px">800px</option>
          </select>
        </div>
      )}

      {/* Informations */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 <strong>Conseil :</strong> Glissez des composants compatibles (Services, Portfolio, Témoignages) 
          dans cette grille pour les organiser automatiquement.
        </p>
      </div>
    </div>
  )
}