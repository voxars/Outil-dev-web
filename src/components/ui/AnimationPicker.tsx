'use client'

import { useState } from 'react'
import { Button } from './button'
import { Play, Settings } from 'lucide-react'

interface AnimationConfig {
  type: string
  duration: number
  delay: number
  easing: string
}

interface AnimationPickerProps {
  value: AnimationConfig
  onChange: (animation: AnimationConfig) => void
  label?: string
  className?: string
}

const animationTypes = [
  { value: 'none', label: 'Aucune', class: '' },
  { value: 'fade-in', label: 'Apparition', class: 'animate-fade-in' },
  { value: 'slide-up', label: 'Glissement haut', class: 'animate-slide-up' },
  { value: 'slide-down', label: 'Glissement bas', class: 'animate-slide-down' },
  { value: 'slide-left', label: 'Glissement gauche', class: 'animate-slide-left' },
  { value: 'slide-right', label: 'Glissement droite', class: 'animate-slide-right' },
  { value: 'zoom-in', label: 'Zoom avant', class: 'animate-zoom-in' },
  { value: 'bounce', label: 'Rebond', class: 'animate-bounce' },
  { value: 'pulse', label: 'Pulsation', class: 'animate-pulse' },
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
  const [previewAnimation, setPreviewAnimation] = useState<string | null>(null)

  const handleAnimationChange = (newValue: Partial<AnimationConfig>) => {
    onChange({ ...value, ...newValue })
  }

  const handlePreview = (animationType: string) => {
    setPreviewAnimation(animationType)
    setTimeout(() => setPreviewAnimation(null), 1000)
  }

  const selectedAnimation = animationTypes.find(anim => anim.value === value.type) || animationTypes[0]

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 flex-1"
        >
          <Play className="w-4 h-4" />
          <span className="truncate">{selectedAnimation.label}</span>
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg min-w-80">
          <div className="space-y-4">
            {/* Type d'animation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d&apos;animation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {animationTypes.map((animation) => (
                  <div key={animation.value} className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleAnimationChange({ type: animation.value })}
                      className={`flex-1 px-3 py-2 text-sm rounded border text-left hover:bg-gray-50 ${
                        value.type === animation.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300'
                      }`}
                    >
                      {animation.label}
                    </button>
                    {animation.value !== 'none' && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(animation.value)}
                        className="p-1"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée (ms)
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={value.duration}
                onChange={(e) => handleAnimationChange({ duration: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>100ms</span>
                <span>{value.duration}ms</span>
                <span>2s</span>
              </div>
            </div>

            {/* Délai */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délai (ms)
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={value.delay}
                onChange={(e) => handleAnimationChange({ delay: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0ms</span>
                <span>{value.delay}ms</span>
                <span>2s</span>
              </div>
            </div>

            {/* Easing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transition
              </label>
              <select
                value={value.easing}
                onChange={(e) => handleAnimationChange({ easing: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {easingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Aperçu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aperçu
              </label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 h-20 flex items-center justify-center">
                <div
                  className={`w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-medium ${
                    previewAnimation ? animationTypes.find(a => a.value === previewAnimation)?.class : ''
                  }`}
                  style={{
                    animationDuration: `${value.duration}ms`,
                    animationDelay: `${value.delay}ms`
                  }}
                >
                  Demo
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
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