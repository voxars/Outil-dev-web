import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { WebsiteComponent, WebsiteTheme } from '@/types'
import { generateId } from '@/lib/utils'

interface BuilderState {
  // Composants du site en cours de construction
  components: WebsiteComponent[]
  selectedComponentId: string | null
  
  // Thème actuel
  theme: WebsiteTheme
  
  // Mode d'aperçu
  isPreviewMode: boolean
  
  // Historique pour undo/redo
  history: WebsiteComponent[][]
  historyIndex: number
  
  // Actions
  addComponent: (component: Omit<WebsiteComponent, 'id'>, parentId?: string) => void
  insertComponentAtIndex: (component: Omit<WebsiteComponent, 'id'>, index: number) => void
  updateComponent: (id: string, updates: Partial<WebsiteComponent>) => void
  deleteComponent: (id: string) => void
  moveComponent: (componentId: string, targetId: string, position: 'before' | 'after' | 'inside') => void
  reorderComponents: (activeId: string, overId: string) => void
  selectComponent: (id: string | null) => void
  setTheme: (theme: WebsiteTheme) => void
  togglePreview: () => void
  undo: () => void
  redo: () => void
  resetBuilder: () => void
  loadTemplate: (components: WebsiteComponent[], theme: WebsiteTheme) => void
}

const defaultTheme: WebsiteTheme = {
  name: 'Modern Blue',
  colors: {
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937',
    muted: '#6B7280'
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  }
}

// Import du template par défaut (désactivé pour commencer avec un canvas vide)
import { templates } from '@/data/templates'

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set) => ({
      components: [], // Commencer avec un canvas vide
      selectedComponentId: null,
      theme: defaultTheme, // Utiliser le thème par défaut simple
      isPreviewMode: false,
      history: [[]], // Historique vide
      historyIndex: 0,

      addComponent: (component, parentId) => {
        const newComponent: WebsiteComponent = {
          ...component,
          id: generateId()
        }
        


        set((state) => {
          if (parentId) {
            // Ajouter comme enfant d'un composant existant UNIQUEMENT
            const addToParent = (comps: WebsiteComponent[]): WebsiteComponent[] => {
              return comps.map(comp => {
                if (comp.id === parentId) {
                  return {
                    ...comp,
                    children: [...(comp.children || []), newComponent]
                  }
                }
                if (comp.children) {
                  return {
                    ...comp,
                    children: addToParent(comp.children)
                  }
                }
                return comp
              })
            }
            
            const updatedComponents = addToParent(state.components)
            
            return {
              ...state,
              components: updatedComponents,
              selectedComponentId: newComponent.id,
              history: [...state.history.slice(0, state.historyIndex + 1), updatedComponents],
              historyIndex: state.historyIndex + 1
            }
          } else {
            // Ajouter au niveau racine
            const newComponents = [...state.components, newComponent]
            return {
              ...state,
              components: newComponents,
              selectedComponentId: newComponent.id,
              history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
              historyIndex: state.historyIndex + 1
            }
          }
        })
      },

      insertComponentAtIndex: (component, index) => {
        const newComponent: WebsiteComponent = {
          ...component,
          id: generateId()
        }

        set((state) => {
          const newComponents = [...state.components]
          newComponents.splice(index, 0, newComponent)
          
          return {
            ...state,
            components: newComponents,
            selectedComponentId: newComponent.id,
            history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
            historyIndex: state.historyIndex + 1
          }
        })
      },

      updateComponent: (id, updates) => {
        set((state) => {
          const updateInComponents = (comps: WebsiteComponent[]): WebsiteComponent[] => {
            return comps.map(comp => {
              if (comp.id === id) {
                return { ...comp, ...updates }
              }
              if (comp.children) {
                return {
                  ...comp,
                  children: updateInComponents(comp.children)
                }
              }
              return comp
            })
          }
          
          const newComponents = updateInComponents(state.components)
          return {
            ...state,
            components: newComponents,
            history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
            historyIndex: state.historyIndex + 1
          }
        })
      },

      deleteComponent: (id) => {
        set((state) => {
          const deleteFromComponents = (comps: WebsiteComponent[]): WebsiteComponent[] => {
            return comps
              .filter(comp => comp.id !== id)
              .map(comp => ({
                ...comp,
                children: comp.children ? deleteFromComponents(comp.children) : undefined
              }))
          }
          
          const newComponents = deleteFromComponents(state.components)
          return {
            ...state,
            components: newComponents,
            selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
            history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
            historyIndex: state.historyIndex + 1
          }
        })
      },

      moveComponent: (componentId, targetId, position) => {
        // TODO: Implémenter la logique de déplacement drag & drop
        
      },

      selectComponent: (id) => {
        set({ selectedComponentId: id })
      },

      setTheme: (theme) => {
        set({ theme })
      },

      togglePreview: () => {
        set((state) => ({ isPreviewMode: !state.isPreviewMode }))
      },

      undo: () => {
        set((state) => {
          if (state.historyIndex > 0) {
            return {
              ...state,
              components: state.history[state.historyIndex - 1],
              historyIndex: state.historyIndex - 1,
              selectedComponentId: null
            }
          }
          return state
        })
      },

      redo: () => {
        set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            return {
              ...state,
              components: state.history[state.historyIndex + 1],
              historyIndex: state.historyIndex + 1,
              selectedComponentId: null
            }
          }
          return state
        })
      },

      resetBuilder: () => {
        set({
          components: [],
          selectedComponentId: null,
          theme: defaultTheme,
          isPreviewMode: false,
          history: [[]],
          historyIndex: 0
        })
      },

      reorderComponents: (activeId, overId) => {
        set((state) => {
          const oldIndex = state.components.findIndex(comp => comp.id === activeId)
          const newIndex = state.components.findIndex(comp => comp.id === overId)
          
          if (oldIndex === -1 || newIndex === -1) return state
          
          const newComponents = [...state.components]
          const [movedComponent] = newComponents.splice(oldIndex, 1)
          newComponents.splice(newIndex, 0, movedComponent)
          
          return {
            ...state,
            components: newComponents,
            history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
            historyIndex: state.historyIndex + 1
          }
        })
      },

      loadTemplate: (components, theme) => {
        set({
          components,
          theme,
          selectedComponentId: null,
          history: [components],
          historyIndex: 0
        })
      }
    }),
    {
      name: 'website-builder-store',
    }
  )
)