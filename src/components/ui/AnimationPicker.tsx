'use client'

import { useState } from 'react'
import { Button } from './button'
import { Play, Settings } from 'lucide-react'

interface AnimationConfig {
  entrance?: {
    type: string
    duration: number
    delay: number
    easing: string
  }
  exit?: {
    type: string
    duration: number
    delay: number
    easing: string
  }
}

interface AnimationPickerProps {
  value: AnimationConfig
  onChange: (animation: AnimationConfig) => void
  label?: string
  className?: string
}

const animationTypes = [
  { value: 'none', label: 'Aucune' },
  { value: 'fade-in', label: 'Apparition fondu' },
  { value: 'fade-out', label: 'Disparition fondu' },
  { value: 'slide-up', label: 'Glissement vers le haut' },
  { value: 'slide-down', label: 'Glissement vers le bas' },
  { value: 'slide-left', label: 'Glissement vers la gauche' },
  { value: 'slide-right', label: 'Glissement vers la droite' },
  { value: 'zoom-in', label: 'Zoom avant' },
  { value: 'zoom-out', label: 'Zoom arrière' },
  { value: 'rotate-in', label: 'Rotation entrée' },
  { value: 'rotate-out', label: 'Rotation sortie' },
  { value: 'bounce-in', label: 'Rebond entrée' },
  { value: 'bounce-out', label: 'Rebond sortie' },
  { value: 'flip-in', label: 'Retournement entrée' },
  { value: 'flip-out', label: 'Retournement sortie' },
  { value: 'shake', label: 'Tremblement' },
  { value: 'pulse', label: 'Pulsation' }
]

const easingOptions = [
  { value: 'ease-linear', label: 'Linéaire' },
  { value: 'ease-in', label: 'Entrée' },
  { value: 'ease-out', label: 'Sortie' },
  { value: 'ease-in-out', label: 'Entrée-Sortie' },
  { value: 'ease-bounce', label: 'Rebond' },
]

export function AnimationPicker({ value, onChange, label, className }: AnimationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'entrance' | 'exit'>('entrance')

  const handleEntranceChange = (newValue: Partial<{ type: string, duration: number, delay: number, easing: string }>) => {
    onChange({
      ...value,
      entrance: {
        type: 'none',
        duration: 300,
        delay: 0,
        easing: 'ease-out',
        ...value.entrance,
        ...newValue
      }
    })
  }

  const handleExitChange = (newValue: Partial<{ type: string, duration: number, delay: number, easing: string }>) => {
    onChange({
      ...value,
      exit: {
        type: 'none',
        duration: 300,
        delay: 0,
        easing: 'ease-out',
        ...value.exit,
        ...newValue
      }
    })
  }

  const currentAnimation = activeTab === 'entrance' ? value.entrance : value.exit
  const currentSelectedAnimation = animationTypes.find(anim => anim.value === currentAnimation?.type) || animationTypes[0]

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
          className="flex items-center space-x-2 px-3 py-2 flex-1 rounded-md"
        >
          <Play className="w-4 h-4" />
          <span className="truncate">{currentSelectedAnimation.label}</span>
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-xl w-72 -left-6 transform">
          <div className="space-y-3">
            {/* Onglets */}
            <div className="flex border-b">
              <button
                type="button"
                onClick={() => setActiveTab('entrance')}
                className={`flex-1 py-2 px-3 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'entrance'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Entrée
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('exit')}
                className={`flex-1 py-2 px-3 text-sm font-medium text-center border-b-2 ${
                  activeTab === 'exit'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Sortie
              </button>
            </div>

            {/* Type d'animation */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Type d&apos;animation
              </label>
              <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                {animationTypes.map((animation) => (
                  <button
                    key={animation.value}
                    type="button"
                    onClick={() => {
                      if (activeTab === 'entrance') {
                        handleEntranceChange({ type: animation.value })
                      } else {
                        handleExitChange({ type: animation.value })
                      }
                    }}
                    className={`px-2 py-1 text-xs rounded border text-left hover:bg-gray-50 ${
                      currentAnimation?.type === animation.value
                        ? 'border-purple-500 bg-purple-100 text-purple-800'
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    {animation.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Durée (ms)
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={currentAnimation?.duration || 300}
                onChange={(e) => {
                  if (activeTab === 'entrance') {
                    handleEntranceChange({ duration: parseInt(e.target.value) })
                  } else {
                    handleExitChange({ duration: parseInt(e.target.value) })
                  }
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-900 mt-1">
                <span>100ms</span>
                <span className="font-medium">{currentAnimation?.duration || 300}ms</span>
                <span>2s</span>
              </div>
            </div>

            {/* Délai */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Délai (ms)
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={currentAnimation?.delay || 0}
                onChange={(e) => {
                  if (activeTab === 'entrance') {
                    handleEntranceChange({ delay: parseInt(e.target.value) })
                  } else {
                    handleExitChange({ delay: parseInt(e.target.value) })
                  }
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-900 mt-1">
                <span>0ms</span>
                <span className="font-medium">{currentAnimation?.delay || 0}ms</span>
                <span>2s</span>
              </div>
            </div>

            {/* Easing */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Transition
              </label>
              <select
                value={currentAnimation?.easing || 'ease-out'}
                onChange={(e) => {
                  if (activeTab === 'entrance') {
                    handleEntranceChange({ easing: e.target.value })
                  } else {
                    handleExitChange({ easing: e.target.value })
                  }
                }}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {easingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-900 hover:bg-gray-50"
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