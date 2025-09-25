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
          title="Exporter le template"
        >
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSaveModal(true)}
          title="Sauvegarder le template"
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

      {/* Input file caché pour l'import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Modal de sauvegarde */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Sauvegarder le template</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du template *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mon super template"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Description du template..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="ghost"
                onClick={() => setShowSaveModal(false)}
              >
                Annuler
              </Button>
              <Button onClick={handleSaveTemplate}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}