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
  animation?: {
    type: string
    duration: number
    delay: number
    easing: string
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
}

export interface DropResult {
  draggedId: string
  overId: string | null
  position: 'before' | 'after' | 'inside'
}