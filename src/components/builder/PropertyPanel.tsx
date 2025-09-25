'use client'

import { useBuilderStore } from '@/store/builder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Settings } from 'lucide-react'

export function PropertyPanel() {
  const { 
    components, 
    selectedComponentId, 
    updateComponent, 
    deleteComponent,
    selectComponent
  } = useBuilderStore()

  const selectedComponent = components.find(c => c.id === selectedComponentId)

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gradient-to-b from-white to-purple-50 border-l border-purple-200 p-4 backdrop-blur-sm">
        <div className="text-center text-purple-600 mt-8">
          <Settings className="h-8 w-8 mx-auto mb-2 text-purple-400" />
          <p className="text-sm">Sélectionnez un composant pour modifier ses propriétés</p>
        </div>
      </div>
    )
  }

  const handlePropertyChange = (key: string, value: unknown) => {
    updateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [key]: value
      }
    })
  }

  const handleDelete = () => {
    deleteComponent(selectedComponent.id)
    selectComponent(null)
  }

  const renderPropertyFields = () => {
    const { type, props } = selectedComponent

    switch (type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={(props.title as string) || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Nom du site"
              />
            </div>
            <div>
              <Label htmlFor="showLogo">Afficher le logo</Label>
              <input
                id="showLogo"
                type="checkbox"
                checked={(props.showLogo as boolean) || false}
                onChange={(e) => handlePropertyChange('showLogo', e.target.checked)}
                className="ml-2"
              />
            </div>
          </div>
        )

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre principal</Label>
              <Input
                id="title"
                value={(props.title as string) || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Titre accrocheur"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Sous-titre</Label>
              <Textarea
                id="subtitle"
                value={(props.subtitle as string) || ''}
                onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                placeholder="Description captivante"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Texte du bouton</Label>
              <Input
                id="buttonText"
                value={(props.buttonText as string) || ''}
                onChange={(e) => handlePropertyChange('buttonText', e.target.value)}
                placeholder="En savoir plus"
              />
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={(props.title as string) || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="À propos de nous"
              />
            </div>
            <div>
              <Label htmlFor="content">Contenu</Label>
              <Textarea
                id="content"
                value={(props.content as string) || ''}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                placeholder="Votre histoire..."
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="imagePosition">Position de l&apos;image</Label>
              <select
                id="imagePosition"
                value={(props.imagePosition as string) || 'right'}
                onChange={(e) => handlePropertyChange('imagePosition', e.target.value)}
                className="w-full px-3 py-2 border border-purple-200 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-colors"
              >
                <option value="left">Gauche</option>
                <option value="right">Droite</option>
              </select>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={(props.title as string) || ''}
                onChange={(e) => handlePropertyChange('title', e.target.value)}
                placeholder="Contactez-nous"
              />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={(props.address as string) || ''}
                onChange={(e) => handlePropertyChange('address', e.target.value)}
                placeholder="123 Rue Example"
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={(props.phone as string) || ''}
                onChange={(e) => handlePropertyChange('phone', e.target.value)}
                placeholder="+33 1 23 45 67 89"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={(props.email as string) || ''}
                onChange={(e) => handlePropertyChange('email', e.target.value)}
                placeholder="contact@example.com"
              />
            </div>
            <div>
              <Label htmlFor="showForm">Afficher le formulaire</Label>
              <input
                id="showForm"
                type="checkbox"
                checked={(props.showForm as boolean) || false}
                onChange={(e) => handlePropertyChange('showForm', e.target.checked)}
                className="ml-2"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center text-gray-500 text-sm">
            Propriétés pour {type} à venir
          </div>
        )
    }
  }

  return (
    <div className="w-80 bg-gradient-to-b from-white to-purple-50 border-l border-purple-200 p-4 overflow-y-auto backdrop-blur-sm">
      <Card className="bg-gradient-to-br from-white to-purple-25 border-purple-200 shadow-lg">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-purple-800">Propriétés</CardTitle>
              <CardDescription className="text-purple-600">
                {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {renderPropertyFields()}
        </CardContent>
      </Card>
    </div>
  )
}

// Composants UI manquants pour le formulaire
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-purple-200 bg-white text-gray-900 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:border-purple-500 hover:border-purple-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium leading-none text-purple-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    />
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-purple-200 bg-white text-gray-900 px-3 py-2 text-sm ring-offset-background placeholder:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:border-purple-500 hover:border-purple-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}