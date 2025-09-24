import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { WebsiteComponent, WebsiteTheme, ComponentType } from '@/types'
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
  updateComponent: (id: string, updates: Partial<WebsiteComponent>) => void
  deleteComponent: (id: string) => void
  moveComponent: (componentId: string, targetId: string, position: 'before' | 'after' | 'inside') => void
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

export const useBuilderStore = create<BuilderState>()(
  devtools(
    (set, get) => ({
      components: [],
      selectedComponentId: null,
      theme: defaultTheme,
      isPreviewMode: false,
      history: [[]],
      historyIndex: 0,

      addComponent: (component, parentId) => {
        const newComponent: WebsiteComponent = {
          ...component,
          id: generateId()
        }

        set((state) => {
          const newComponents = [...state.components]
          
          if (parentId) {
            // Ajouter comme enfant d'un composant existant
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
            return {
              ...state,
              components: addToParent(newComponents),
              selectedComponentId: newComponent.id,
              history: [...state.history.slice(0, state.historyIndex + 1), addToParent(newComponents)],
              historyIndex: state.historyIndex + 1
            }
          } else {
            // Ajouter au niveau racine
            newComponents.push(newComponent)
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
        console.log('Moving component:', { componentId, targetId, position })
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