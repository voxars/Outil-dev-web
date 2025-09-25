import { WebsiteComponent, WebsiteTheme } from '@/types'

export interface SavedTemplate {
  id: string
  name: string
  description: string
  components: WebsiteComponent[]
  theme: WebsiteTheme
  createdAt: string
  thumbnail?: string
}

const STORAGE_KEY = 'website-builder-templates'

export class TemplateManager {
  static saveTemplate(
    name: string, 
    description: string, 
    components: WebsiteComponent[], 
    theme: WebsiteTheme
  ): string {
    const template: SavedTemplate = {
      id: `template-${Date.now()}`,
      name,
      description,
      components,
      theme,
      createdAt: new Date().toISOString()
    }

    const existingTemplates = this.getTemplates()
    const updatedTemplates = [...existingTemplates, template]
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTemplates))
    
    return template.id
  }

  static getTemplates(): SavedTemplate[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading templates:', error)
      return []
    }
  }

  static deleteTemplate(id: string): void {
    const templates = this.getTemplates()
    const filteredTemplates = templates.filter(t => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTemplates))
  }

  static exportTemplate(components: WebsiteComponent[], theme: WebsiteTheme): string {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      components,
      theme
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  static importTemplate(jsonData: string): { components: WebsiteComponent[], theme: WebsiteTheme } {
    try {
      const data = JSON.parse(jsonData)
      
      // Validate the structure
      if (!data.components || !data.theme) {
        throw new Error('Format de template invalide')
      }
      
      return {
        components: data.components,
        theme: data.theme
      }
    } catch (error) {
      throw new Error('Impossible de parser le template: ' + (error as Error).message)
    }
  }

  static downloadTemplate(components: WebsiteComponent[], theme: WebsiteTheme, filename: string = 'template.json'): void {
    const jsonData = this.exportTemplate(components, theme)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }
}