'use client'

import { ComponentType } from '@/types'
import { componentLibrary } from '@/data/templates'
import { useBuilderStore } from '@/store/builder'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Layout, 
  Star, 
  User, 
  Grid3X3, 
  Image, 
  MessageSquare, 
  Mail,
  Plus
} from 'lucide-react'

const iconMap = {
  Layout,
  Star,
  User,
  Grid3X3,
  Image,
  MessageSquare,
  Mail,
  Plus
}

export function ComponentLibrary() {
  const addComponent = useBuilderStore(state => state.addComponent)

  const handleAddComponent = (type: ComponentType, defaultProps: Record<string, unknown>) => {
    addComponent({
      type,
      props: defaultProps
    })
  }

  return (
    <div className="w-80 bg-gradient-to-b from-white to-purple-50 border-r border-purple-200 p-4 overflow-y-auto backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4 text-purple-800">Composants</h2>
      
      <div className="space-y-3">
        {componentLibrary.map((component) => {
          const IconComponent = iconMap[component.icon as keyof typeof iconMap] || Plus
          
          return (
            <Card key={component.type} className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 hover:border-purple-300">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-medium text-gray-900">
                      {component.name}
                    </CardTitle>
                  </div>
                </div>
                
                <CardDescription className="text-xs text-gray-500 mb-3">
                  {component.description}
                </CardDescription>
                
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddComponent(component.type, component.defaultProps)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Ajouter
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}