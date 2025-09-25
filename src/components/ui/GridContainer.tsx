'use client'

import { useState } from 'react'
import { Button } from './button'
import { Grid, Columns, Rows } from 'lucide-react'

interface GridSettings {
  columns: number
  rows: number
  gap: string
  alignItems: 'start' | 'center' | 'end' | 'stretch'
  justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

interface GridContainerProps {
  settings: GridSettings
  onChange: (settings: GridSettings) => void
  children: React.ReactNode
  className?: string
}

export function GridContainer({ settings, onChange, children, className }: GridContainerProps) {
  const [isEditing, setIsEditing] = useState(false)

  const gridClasses = [
    'grid',
    `grid-cols-${settings.columns}`,
    `grid-rows-${settings.rows}`,
    `gap-${settings.gap}`,
    `items-${settings.alignItems}`,
    `justify-${settings.justifyContent}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="relative group">
      {/* Bouton d'édition de la grille */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Grid className="w-4 h-4" />
      </Button>

      {/* La grille elle-même */}
      <div className={gridClasses}>
        {children}
      </div>

      {/* Panel d'édition de la grille */}
      {isEditing && (
        <div className="absolute top-12 right-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Grid className="w-4 h-4" />
            <span>Configuration de la grille</span>
          </h4>

          <div className="space-y-4">
            {/* Colonnes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Columns className="w-3 h-3" />
                <span>Colonnes: {settings.columns}</span>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={settings.columns}
                onChange={(e) => onChange({ ...settings, columns: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Lignes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                <Rows className="w-3 h-3" />
                <span>Lignes: {settings.rows}</span>
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={settings.rows}
                onChange={(e) => onChange({ ...settings, rows: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Espacement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espacement
              </label>
              <select
                value={settings.gap}
                onChange={(e) => onChange({ ...settings, gap: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">Aucun</option>
                <option value="1">Petit (4px)</option>
                <option value="2">Moyen (8px)</option>
                <option value="4">Grand (16px)</option>
                <option value="6">Très grand (24px)</option>
                <option value="8">Extra grand (32px)</option>
              </select>
            </div>

            {/* Alignement vertical */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alignement vertical
              </label>
              <select
                value={settings.alignItems}
                onChange={(e) => onChange({ ...settings, alignItems: e.target.value as GridSettings['alignItems'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="start">Haut</option>
                <option value="center">Centre</option>
                <option value="end">Bas</option>
                <option value="stretch">Étirer</option>
              </select>
            </div>

            {/* Alignement horizontal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alignement horizontal
              </label>
              <select
                value={settings.justifyContent}
                onChange={(e) => onChange({ ...settings, justifyContent: e.target.value as GridSettings['justifyContent'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="start">Gauche</option>
                <option value="center">Centre</option>
                <option value="end">Droite</option>
                <option value="between">Espacement égal</option>
                <option value="around">Espacement autour</option>
                <option value="evenly">Espacement uniforme</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function GridPicker({ 
  value, 
  onChange, 
  label = "Configuration de la grille" 
}: { 
  value: GridSettings
  onChange: (settings: GridSettings) => void
  label?: string 
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 w-full justify-start"
      >
        <Grid className="w-4 h-4" />
        <span>{value.columns}×{value.rows} colonnes</span>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-80">
          <div className="space-y-4">
            {/* Même contenu que dans GridContainer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colonnes: {value.columns}
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={value.columns}
                onChange={(e) => onChange({ ...value, columns: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lignes: {value.rows}
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={value.rows}
                onChange={(e) => onChange({ ...value, rows: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Espacement
              </label>
              <select
                value={value.gap}
                onChange={(e) => onChange({ ...value, gap: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="0">Aucun</option>
                <option value="1">Petit</option>
                <option value="2">Moyen</option>
                <option value="4">Grand</option>
                <option value="6">Très grand</option>
                <option value="8">Extra grand</option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}