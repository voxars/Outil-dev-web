'use client'

import { useState } from 'react'
import { Button } from './button'
import { Palette } from 'lucide-react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  className?: string
}

const predefinedColors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // yellow
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#6B7280', // gray
  '#000000', // black
  '#FFFFFF', // white
  '#F97316', // orange
  '#06B6D4', // cyan
  '#84CC16', // lime
]

export function ColorPicker({ value, onChange, label, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customColor, setCustomColor] = useState(value)

  const handleColorSelect = (color: string) => {
    onChange(color)
    setCustomColor(color)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white text-purple-700 border-purple-500 hover:bg-purple-50"
        >
          <div
            className="w-4 h-4 rounded border border-gray-400"
            style={{ 
              backgroundColor: value,
              boxShadow: value === '#FFFFFF' ? 'inset 0 0 0 1px #9ca3af' : 'none'
            }}
          />
          <Palette className="w-4 h-4 text-purple-600" />
        </Button>
        
        <input
          type="text"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          onBlur={() => onChange(customColor)}
          onKeyDown={(e) => e.key === 'Enter' && onChange(customColor)}
          className="w-20 px-2 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-xl w-56 left-0">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {predefinedColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`color-palette-button w-6 h-6 rounded border-2 hover:scale-110 transition-transform relative ${
                  value === color ? 'border-purple-600' : 'border-gray-400'
                }`}
                style={{ 
                  backgroundColor: color,
                  boxShadow: color === '#FFFFFF' ? 'inset 0 0 0 1px #e5e7eb' : 'none'
                }}
                title={color}
              />
            ))}
          </div>
          
          <div className="border-t pt-3">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Couleur personnalisée
            </label>
            <div className="space-y-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-full h-8 border-2 border-purple-300 rounded cursor-pointer bg-white"
              />
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-24 px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="#000000"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleColorSelect(customColor)}
                  className="text-xs px-2 py-1 flex-shrink-0 bg-purple-600 text-white hover:bg-purple-700"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}