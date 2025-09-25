'use client'

import { useBuilderStore } from '@/store/builder'
import { Button } from '@/components/ui/button'
import { TemplateManager } from '@/lib/templateManager'
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
import { useRef, useState } from 'react'

export function BuilderToolbar() {
  const {
    isPreviewMode,
    togglePreview,
    undo,
    redo,
    history,
    historyIndex,
    components,
    theme,
    loadTemplate
  } = useBuilderStore()

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [templateDescription, setTemplateDescription] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const handleExport = () => {
    const filename = `template-${new Date().toISOString().split('T')[0]}.json`
    TemplateManager.downloadTemplate(components, theme, filename)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const { components: importedComponents, theme: importedTheme } = TemplateManager.importTemplate(content)
        loadTemplate(importedComponents, importedTheme)
        alert('Template importé avec succès!')
      } catch (error) {
        alert('Erreur lors de l\'import: ' + (error as Error).message)
      }
    }
    reader.readAsText(file)
    
    // Reset the input
    event.target.value = ''
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert('Veuillez donner un nom au template')
      return
    }

    try {
      TemplateManager.saveTemplate(templateName, templateDescription, components, theme)
      alert('Template sauvegardé avec succès!')
      setShowSaveModal(false)
      setTemplateName('')
      setTemplateDescription('')
    } catch (error) {
      alert('Erreur lors de la sauvegarde: ' + (error as Error).message)
    }
  }

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 builder-interface">
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
          <Upload className="h-4 w-4 mr-1" />
          Importer
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          title="Exporter le code"
        >
          <Download className="h-4 w-4 mr-1" />
          Exporter
        </Button>
      </div>

      {/* Input file caché pour l'import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

    </div>
  )
}