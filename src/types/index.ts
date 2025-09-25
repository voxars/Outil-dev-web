export interface WebsiteComponent {
  id: string
  type: ComponentType
  props: Record<string, unknown>
  styles?: ComponentStyles
  children?: WebsiteComponent[]
}

export type ComponentType = 
  | 'header'
  | 'hero'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'testimonials'
  | 'contact'
  | 'footer'
  | 'text'
  | 'image'
  | 'button'
  | 'container'
  | 'grid'
  | 'grid-item'
  | 'scrollable-grid'
  | 'spacer'

export interface ComponentStyles {
  backgroundColor?: string
  textColor?: string
  padding?: string
  margin?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?: string
  textAlign?: 'left' | 'center' | 'right'
  width?: string
  height?: string
  maxWidth?: string
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  display?: 'flex' | 'grid' | 'block' | 'inline-block'
  flexDirection?: 'row' | 'column'
  gap?: string
  columns?: number
  rows?: number
  animation?: {
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
}

export interface WebsiteTemplate {
  id: string
  name: string
  description: string
  preview: string
  components: WebsiteComponent[]
  theme: WebsiteTheme
}

export interface WebsiteTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export interface DragItem {
  id: string
  type: ComponentType
  index?: number
  fromLibrary?: boolean
}

export interface DropResult {
  draggedId: string
  overId: string | null
  position: 'before' | 'after' | 'inside'
}

export interface GridConfig {
  columns: number
  rows?: number
  gap: string
  scrollable: boolean
  maxHeight?: string
  itemMinWidth?: string
  itemMinHeight?: string
}

export interface DraggableComponentData {
  type: ComponentType
  label: string
  icon: string
  description: string
  defaultProps?: Record<string, unknown>
  canBeInGrid?: boolean
}