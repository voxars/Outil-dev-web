'use client'

import { useBuilderStore } from '@/store/builder'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  EyeOff, 
  Undo, 
  Redo, 
  Download, 
  Upload,
  Settings,
  Palette
} from 'lucide-react'

export function BuilderToolbar() {
  const {
    isPreviewMode,
    togglePreview,
    undo,
    redo,
    history,
    historyIndex
  } = useBuilderStore()

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const handleExport = () => {
    // TODO: Implémenter l'export HTML/CSS
    console.log('Export feature coming soon!')
  }

  const handleImport = () => {
    // TODO: Implémenter l'import de template
    console.log('Import feature coming soon!')
  }

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo et titre */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">Website Builder</h1>
      </div>

      {/* Actions centrales */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          title="Annuler"
        >
          <Undo className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          title="Refaire"
        >
          <Redo className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <Button
          variant="outline"
          size="sm"
          onClick={togglePreview}
          title={isPreviewMode ? 'Mode édition' : 'Mode aperçu'}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-1" />
              Édition
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-1" />
              Aperçu
            </>
          )}
        </Button>
      </div>

      {/* Actions de droite */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleImport}
          title="Importer un template"
        >
          <Upload className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          title="Exporter le site"
        >
          <Download className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <Button
          variant="outline"
          size="sm"
          title="Paramètres du thème"
        >
          <Palette className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          title="Paramètres"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}