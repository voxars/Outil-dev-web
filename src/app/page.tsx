'use client'

import { BuilderToolbar } from '@/components/builder/BuilderToolbar'
import { ComponentLibrary } from '@/components/builder/ComponentLibrary'
import { WebsiteCanvas } from '@/components/builder/WebsiteCanvas'
import { PropertyPanel } from '@/components/builder/PropertyPanel'

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Barre d'outils principale */}
      <BuilderToolbar />
      
      {/* Interface principale */}
      <div className="flex-1 flex overflow-hidden">
        {/* Bibliothèque de composants */}
        <ComponentLibrary />
        
        {/* Zone de travail centrale - Canvas */}
        <WebsiteCanvas />
        
        {/* Panneau de propriétés */}
        <PropertyPanel />  
      </div>
    </div>
  )
}
