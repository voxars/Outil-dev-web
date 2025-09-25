'use client'

import { useBuilderStore } from '@/store/builder'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ColorPicker } from '@/components/ui/ColorPicker'
import { AnimationPicker } from '@/components/ui/AnimationPicker'
import { GridPicker } from '@/components/ui/GridContainer'
import { GridProperties } from '@/components/ui/GridProperties'
import { Trash2, Settings, Palette, Play, Grid3X3, Layers } from 'lucide-react'

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
      <div className="w-80 bg-gradient-to-b from-white to-purple-50 border-l border-purple-200 p-4 backdrop-blur-sm builder-interface">
        <div className="text-center text-purple-800 mt-8">
          <Settings className="h-8 w-8 mx-auto mb-2 text-purple-600" />
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

  const handleStyleChange = (key: string, value: unknown) => {
    updateComponent(selectedComponent.id, {
      styles: {
        ...selectedComponent.styles,
        [key]: value
      }
    })
  }

  const handleAnimationChange = (animation: { entrance?: { type: string, duration: number, delay: number, easing: string }, exit?: { type: string, duration: number, delay: number, easing: string } }) => {
    updateComponent(selectedComponent.id, {
      styles: {
        ...selectedComponent.styles,
        animation
      }
    })
  }

  const handleDelete = () => {
    deleteComponent(selectedComponent.id)
    selectComponent(null)
  }

  const renderStyleControls = () => {
    const styles = selectedComponent.styles || {}
    const animation = styles.animation || { 
      entrance: { type: 'none', duration: 300, delay: 0, easing: 'ease-out' },
      exit: { type: 'none', duration: 300, delay: 0, easing: 'ease-out' }
    }

    return (
      <div className="border-t pt-6 mt-6 space-y-6">
        <div>
          <h4 className="font-medium text-gray-900 flex items-center space-x-2 mb-4">
            <Palette className="w-4 h-4" />
            <span>Style et Couleurs</span>
          </h4>
          
          <div className="space-y-4">
            <ColorPicker
              label="Couleur de fond"
              value={styles.backgroundColor || '#FFFFFF'}
              onChange={(color) => handleStyleChange('backgroundColor', color)}
              className="w-full"
            />
            <ColorPicker
              label="Couleur du texte"
              value={styles.textColor || '#000000'}
              onChange={(color) => handleStyleChange('textColor', color)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 flex items-center space-x-2 mb-4">
            <Play className="w-4 h-4" />
            <span>Animations</span>
          </h4>
          
          <AnimationPicker
            label="Animations"
            value={animation as { entrance?: { type: string, duration: number, delay: number, easing: string }, exit?: { type: string, duration: number, delay: number, easing: string } }}
            onChange={handleAnimationChange}
            className="w-full"
          />
        </div>
      </div>
    )
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
            {renderStyleControls()}
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
            {renderStyleControls()}
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
            {renderStyleControls()}
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
            {renderStyleControls()}
          </div>
        )

      case 'grid':
        return (
          <div className="space-y-4">
            <GridPicker
              value={{
                columns: (props.columns as number) || 2,
                rows: (props.rows as number) || 1,
                gap: (props.gap as string) || '4',
                alignItems: (props.alignItems as 'start' | 'center' | 'end' | 'stretch') || 'start',
                justifyContent: (props.justifyContent as 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly') || 'start'
              }}
              onChange={(settings) => {
                handlePropertyChange('columns', settings.columns)
                handlePropertyChange('rows', settings.rows)
                handlePropertyChange('gap', settings.gap)
                handlePropertyChange('alignItems', settings.alignItems)
                handlePropertyChange('justifyContent', settings.justifyContent)
              }}
            />
            {renderStyleControls()}
          </div>
        )

      case 'container':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="padding">Espacement interne</Label>
              <select
                id="padding"
                value={(props.padding as string) || '4'}
                onChange={(e) => handlePropertyChange('padding', e.target.value)}
                className="w-full px-3 py-2 border border-purple-200 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-colors"
              >
                <option value="0">Aucun</option>
                <option value="2">Petit (8px)</option>
                <option value="4">Moyen (16px)</option>
                <option value="6">Grand (24px)</option>
                <option value="8">Très grand (32px)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="margin">Espacement externe</Label>
              <select
                id="margin"
                value={(props.margin as string) || '2'}
                onChange={(e) => handlePropertyChange('margin', e.target.value)}
                className="w-full px-3 py-2 border border-purple-200 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-colors"
              >
                <option value="0">Aucun</option>
                <option value="1">Petit (4px)</option>
                <option value="2">Moyen (8px)</option>
                <option value="4">Grand (16px)</option>
                <option value="6">Très grand (24px)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="maxWidth">Largeur maximale</Label>
              <select
                id="maxWidth"
                value={(props.maxWidth as string) || 'full'}
                onChange={(e) => handlePropertyChange('maxWidth', e.target.value)}
                className="w-full px-3 py-2 border border-purple-200 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-colors"
              >
                <option value="sm">Petit (576px)</option>
                <option value="md">Moyen (768px)</option>
                <option value="lg">Grand (1024px)</option>
                <option value="xl">Très grand (1280px)</option>
                <option value="2xl">Extra grand (1536px)</option>
                <option value="full">Pleine largeur</option>
              </select>
            </div>
            {renderStyleControls()}
          </div>
        )

      case 'grid':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Grid3X3 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Grille Simple</h3>
            </div>
            <GridProperties component={selectedComponent} />
            {renderStyleControls()}
          </div>
        )

      case 'scrollable-grid':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Grille Défilante</h3>
            </div>
            <GridProperties component={selectedComponent} />
            {renderStyleControls()}
          </div>
        )

      case 'grid-item':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Grid3X3 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Élément de Grille</h3>
            </div>
            <div>
              <Label htmlFor="content">Contenu</Label>
              <Textarea
                id="content"
                value={(props.content as string) || ''}
                onChange={(e) => handlePropertyChange('content', e.target.value)}
                placeholder="Contenu de l'élément..."
              />
            </div>
            <div>
              <Label htmlFor="minWidth">Largeur minimale</Label>
              <Input
                id="minWidth"
                value={(props.minWidth as string) || '200px'}
                onChange={(e) => handlePropertyChange('minWidth', e.target.value)}
                placeholder="200px"
              />
            </div>
            <div>
              <Label htmlFor="minHeight">Hauteur minimale</Label>
              <Input
                id="minHeight"
                value={(props.minHeight as string) || '150px'}
                onChange={(e) => handlePropertyChange('minHeight', e.target.value)}
                placeholder="150px"
              />
            </div>
            {renderStyleControls()}
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500 text-sm">
              Propriétés pour {type} à venir
            </div>
            {renderStyleControls()}
          </div>
        )
    }
  }

  return (
    <div className="w-80 bg-gradient-to-b from-white to-purple-50 border-l border-purple-200 p-4 overflow-y-auto overflow-x-visible backdrop-blur-sm property-panel builder-interface">
      <Card className="bg-gradient-to-br from-white to-purple-25 border-purple-200 shadow-lg">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-purple-800">Propriétés</CardTitle>
              <CardDescription className="text-purple-700">
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