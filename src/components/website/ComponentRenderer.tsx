'use client'

import React from 'react'
import { WebsiteComponent } from '@/types'
import { useDroppable } from '@dnd-kit/core'

interface GridDroppableProps {
  component: WebsiteComponent
  style: React.CSSProperties
  className: string
  onClick?: () => void
  isPreview?: boolean
  accepts: string[]
}

const GridDroppable: React.FC<GridDroppableProps> = ({
  component,
  style,
  className,
  onClick,
  isPreview = false,
  accepts
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: component.id,
    data: {
      type: 'grid',
      parentId: component.id,
      accepts
    }
  })

  const { children } = component

  return (
    <div 
      ref={setNodeRef}
      className={`${className} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children && children.length > 0 ? (
        children.map((child) => (
          <div key={child.id} className="grid-item min-w-[200px] min-h-[150px] bg-white rounded-lg shadow-sm border p-4">
            <div className="text-gray-900">
              <ComponentRenderer
                component={child}
                isPreview={isPreview}
                inGrid={true}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center p-8 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📋</div>
            <p>Glissez des éléments ici</p>
            <p className="text-sm">Services, Portfolio, Témoignages...</p>
          </div>
        </div>
      )}
      
      {isOver && children && children.length > 0 && (
        <div className="h-20 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg flex items-center justify-center min-w-[200px] min-h-[150px]">
          <span className="text-blue-800 text-sm font-medium">
            Relâcher pour ajouter à la grille
          </span>
        </div>
      )}
    </div>
  )
}

interface ComponentRendererProps {
  component: WebsiteComponent
  isPreview?: boolean
  isSelected?: boolean
  onClick?: () => void
  inGrid?: boolean
}

interface Service {
  title: string
  description: string
  icon: string
}

interface Project {
  title: string
  description: string
  image: string
  url: string
}

interface Testimonial {
  name: string
  text: string
  rating: number
  avatar: string
  company?: string
}

interface SocialLink {
  platform: string
  url: string
}

export function ComponentRenderer({
  component,
  isPreview = false,
  isSelected = false,
  onClick,
  inGrid = false
}: ComponentRendererProps) {
  const { type, props, styles, children } = component



  // Application des styles personnalisés
  const getCustomStyles = () => {
    if (!styles) return {}
    
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.textColor,
      padding: styles.padding,
      margin: styles.margin,
      borderRadius: styles.borderRadius,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      textAlign: styles.textAlign,
      width: styles.width,
      height: styles.height,
      maxWidth: styles.maxWidth,
      animationDuration: styles.animation?.entrance?.duration ? `${styles.animation.entrance.duration}ms` : undefined,
      animationDelay: styles.animation?.entrance?.delay ? `${styles.animation.entrance.delay}ms` : undefined,
    }
  }

  // Styles pour les éléments enfants (hérite de la couleur du parent)
  const getTextStyles = () => {
    if (styles?.textColor) {
      return {
        color: styles.textColor
      }
    }
    return {}
  }

  // Classes pour forcer l'héritage de couleur avec fallback noir
  const getTextClasses = () => {
    if (styles?.textColor) {
      return 'component-custom-text'
    }
    // Force du texte sombre pour une meilleure lisibilité
    if (inGrid) {
      return 'text-gray-900 font-medium' // Texte plus foncé et gras dans les grilles
    }
    return 'text-gray-900' // Texte sombre par défaut
  }

  // Classes d'animation
  const getAnimationClass = () => {
    if (!styles?.animation?.entrance || styles.animation.entrance.type === 'none') return ''
    
    const animationTypeMap: Record<string, string> = {
      'fade-in': 'animate-fade-in',
      'fade-out': 'animate-fade-out',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'slide-left': 'animate-slide-left',
      'slide-right': 'animate-slide-right',
      'zoom-in': 'animate-zoom-in',
      'zoom-out': 'animate-zoom-out',
      'rotate-in': 'animate-rotate-in',
      'rotate-out': 'animate-rotate-out',
      'bounce-in': 'animate-bounce-in',
      'bounce-out': 'animate-bounce-out',
      'flip-in': 'animate-flip-in',
      'flip-out': 'animate-flip-out',
      'shake': 'animate-shake',
      'bounce': 'animate-bounce',
      'pulse': 'animate-pulse',
    }
    
    return animationTypeMap[styles.animation.entrance.type] || ''
  }

  // Classes communes pour tous les composants
  const baseClasses = [
    'relative',
    isSelected && !isPreview ? 'ring-2 ring-blue-500 ring-offset-2' : '',
    !isPreview ? 'cursor-pointer' : '',
    'transition-all duration-200',
    getAnimationClass()
  ].filter(Boolean).join(' ')

  const customStyles = getCustomStyles()

  // Rendu spécifique par type de composant
  const renderComponent = () => {
    switch (type) {
      case 'header':
        return (
          <header 
            className={`shadow-sm py-4 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`flex items-center justify-between max-w-7xl mx-auto ${getTextClasses()}`} style={getTextStyles()}>
              <div className="flex items-center space-x-4">
                {(props.showLogo as boolean) && (
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                )}
                <h1 className="text-xl font-bold">{(props.title as string)}</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                {(props.navigation as string[])?.map((item: string, index: number) => (
                  <a key={index} href="#" className="opacity-75 hover:opacity-100">
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </header>
        )

      case 'hero':
        return (
          <section 
            className={`py-20 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`max-w-4xl mx-auto text-center ${getTextClasses()}`} style={getTextStyles()}>
              <h1 className="text-5xl font-bold mb-6">{(props.title as string)}</h1>
              {(props.subtitle as string) && (
                <p className="text-xl mb-8 opacity-90">{(props.subtitle as string)}</p>
              )}
              {(props.buttonText as string) && (
                <button className="bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" style={{ color: styles?.backgroundColor || '#3B82F6' }}>
                  {(props.buttonText as string)}
                </button>
              )}
            </div>
          </section>
        )

      case 'about':
        return (
          <section 
            className={`py-16 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`max-w-6xl mx-auto ${getTextClasses()}`} style={getTextStyles()}>
              <div className={`grid md:grid-cols-2 gap-12 items-center ${props.imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
                <div>
                  <h2 className="text-3xl font-bold mb-6">{(props.title as string)}</h2>
                  <p className="text-lg leading-relaxed opacity-90">{(props.content as string)}</p>
                </div>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500">Image placeholder</span>
                </div>
              </div>
            </div>
          </section>
        )

      case 'services':
        // Rendu adapté pour les grilles
        if (inGrid) {
          return (
            <div 
              className={`${baseClasses} ${getTextClasses()}`} 
              onClick={onClick}
              style={customStyles}
            >
              <div className="text-center" style={getTextStyles()}>
                <h3 className="text-lg font-bold mb-4">{(props.title as string)}</h3>
                <div className="space-y-3">
                  {(props.services as Service[])?.slice(0, 3).map((service: { title: string; description: string; icon: string }, index: number) => (
                    <div key={index} className="text-left">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-blue-600 text-sm">⭐</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{service.title}</h4>
                          <p className="text-xs mt-1 opacity-75">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        // Rendu normal pour la page
        return (
          <section 
            className={`py-16 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`max-w-6xl mx-auto ${getTextClasses()}`} style={getTextStyles()}>
              <h2 className="text-3xl font-bold text-center mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {(props.services as Service[])?.map((service: { title: string; description: string; icon: string }, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center" style={getTextStyles()}>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-xl">⭐</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="opacity-75">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'portfolio':
        return (
          <section 
            className={`py-16 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`max-w-6xl mx-auto ${getTextClasses()}`} style={getTextStyles()}>
              <h2 className="text-3xl font-bold text-center mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {(props.projects as Project[])?.map((project: { title: string; description: string; image: string; url: string }, index: number) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-gray-200 rounded-lg h-48 mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold">Image</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="opacity-75">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'testimonials':
        return (
          <section 
            className={`py-16 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className={`max-w-4xl mx-auto ${getTextClasses()}`} style={getTextStyles()}>
              <h2 className="text-3xl font-bold text-center mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {(props.testimonials as Testimonial[])?.map((testimonial: { name: string; text: string; rating: number; avatar: string }, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="opacity-75 italic">&quot;{testimonial.text}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'contact':
        return (
          <section className={`py-16 px-6 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Informations de contact</h3>
                  <div className="space-y-4">
                    {(props.address as string) && (
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600">📍</span>
                        <span className="text-gray-600">{(props.address as string)}</span>
                      </div>
                    )}
                    {(props.phone as string) && (
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📞</span>
                        <span className="text-gray-600">{(props.phone as string)}</span>
                      </div>
                    )}
                    {(props.email as string) && (
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">✉️</span>
                        <span className="text-gray-600">{(props.email as string)}</span>
                      </div>
                    )}
                  </div>
                </div>
                {(props.showForm as boolean) && (
                  <div>
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Votre nom"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Votre email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        rows={4}
                        placeholder="Votre message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Envoyer le message
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </section>
        )

      case 'footer':
        return (
          <footer 
            className={`py-8 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center">
                <p className="text-gray-400 mb-4">{(props.copyright as string)}</p>
                {(props.links as string[]) && (
                  <div className="flex justify-center space-x-6 mb-4">
                    {(props.links as string[]).map((link: string, index: number) => (
                      <a key={index} href="#" className="text-gray-400 hover:text-white">
                        {link}
                      </a>
                    ))}
                  </div>
                )}
                {(props.socialLinks as SocialLink[]) && (
                  <div className="flex justify-center space-x-4">
                    {(props.socialLinks as SocialLink[]).map((social: { platform: string; url: string }, index: number) => (
                      <a key={index} href={social.url} className="text-gray-400 hover:text-white">
                        {social.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </footer>
        )

      case 'grid':
        const gridProps = props as {
          columns: number
          rows: number
          gap: string
          alignItems: string
          justifyContent: string
        }
        
        // Adapter le nombre de colonnes selon le nombre d'enfants
        const childrenCount = component.children?.length || 0
        const adaptiveColumns = childrenCount === 0 
          ? gridProps.columns || 2  // Garder la config par défaut si vide
          : childrenCount === 1 
            ? 1  // 1 colonne pour 1 élément
            : childrenCount === 2 
              ? 2  // 2 colonnes pour 2 éléments
              : childrenCount <= 4 
                ? Math.min(childrenCount, 3)  // 3 colonnes max pour 3-4 éléments
                : 4  // 4 colonnes pour 5+ éléments
        const gridStyles = {
          ...customStyles,
          display: 'grid' as const,
          gridTemplateColumns: `repeat(${adaptiveColumns}, 1fr)`,
          gap: gridProps.gap || '1rem',
          alignItems: gridProps.alignItems || 'start',
          justifyContent: gridProps.justifyContent || 'start'
        }
        
        // Adapter la hauteur minimale selon le contenu
        const minHeightClass = childrenCount === 0 
          ? 'min-h-48'  // Hauteur par défaut si vide
          : childrenCount <= 2 
            ? 'min-h-32'  // Plus petite si peu d'éléments
            : 'min-h-40'  // Hauteur moyenne pour plus d'éléments

        return (
          <GridDroppable
            component={component}
            style={gridStyles}
            className={`border-2 border-dashed border-gray-300 rounded-lg p-4 ${minHeightClass} ${baseClasses} ${getTextClasses()}`}
            onClick={onClick}
            isPreview={isPreview}
            accepts={['services', 'portfolio', 'testimonials', 'grid-item']}
          />
        )

      case 'scrollable-grid':
        const scrollableGridProps = props as {
          columns: number
          rows?: number
          gap: string
          maxHeight: string
          scrollable: boolean
        }
        
        // Adapter le nombre de colonnes selon le nombre d'enfants pour les grilles scrollables
        const scrollableChildrenCount = component.children?.length || 0
        const adaptiveScrollableColumns = scrollableChildrenCount === 0 
          ? scrollableGridProps.columns || 3  // Garder la config par défaut si vide
          : scrollableChildrenCount === 1 
            ? 1  // 1 colonne pour 1 élément
            : scrollableChildrenCount === 2 
              ? 2  // 2 colonnes pour 2 éléments
              : scrollableChildrenCount <= 6 
                ? 3  // 3 colonnes pour 3-6 éléments
                : 4  // 4 colonnes pour 7+ éléments
        
        const scrollableGridStyles = {
          ...customStyles,
          display: 'grid' as const,
          gridTemplateColumns: `repeat(${adaptiveScrollableColumns}, 1fr)`,
          gap: scrollableGridProps.gap || '1rem',
          maxHeight: scrollableGridProps.maxHeight || '400px',
          overflowY: (scrollableGridProps.scrollable ? 'auto' : 'visible') as 'auto' | 'visible',
          overflowX: 'hidden' as const,
          padding: '1rem'
        }
        
        return (
          <GridDroppable
            component={component}
            style={scrollableGridStyles}
            className={`scrollable-grid border-2 border-dashed border-gray-300 rounded-lg scroll-smooth ${baseClasses} ${getTextClasses()}`}
            onClick={onClick}
            isPreview={isPreview}
            accepts={['services', 'portfolio', 'testimonials', 'grid-item']}
          />
        )

      case 'grid-item':
        const gridItemProps = props as {
          minWidth: string
          minHeight: string
          content: string
        }
        
        const gridItemStyles = {
          ...customStyles,
          minWidth: gridItemProps.minWidth || '200px',
          minHeight: gridItemProps.minHeight || '150px'
        }
        
        return (
          <div 
            className={`grid-item p-4 border rounded-lg bg-white shadow-sm ${baseClasses} ${getTextClasses()}`}
            onClick={onClick}
            style={gridItemStyles}
          >
            {gridItemProps.content || 'Élément de grille'}
            {children && children.length > 0 && (
              <div className="mt-2">
                {children.map((child) => (
                  <ComponentRenderer
                    key={child.id}
                    component={child}
                    isPreview={isPreview}
                  />
                ))}
              </div>
            )}
          </div>
        )

      case 'container':
        const containerProps = props as {
          padding: string
          margin: string
          maxWidth: string
        }
        
        const containerClasses = [
          'container',
          `p-${containerProps.padding || '4'}`,
          `m-${containerProps.margin || '2'}`,
          `max-w-${containerProps.maxWidth || 'full'}`,
          baseClasses
        ].join(' ')
        
        return (
          <div 
            className={containerClasses}
            onClick={onClick}
            style={customStyles}
          >
            {children && children.length > 0 ? (
              children.map((child) => (
                <ComponentRenderer
                  key={child.id}
                  component={child}
                  isPreview={isPreview}
                />
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <p>Ajoutez des composants à ce conteneur</p>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className={`p-4 bg-gray-100 border-2 border-dashed border-gray-300 ${baseClasses}`} onClick={onClick}>
            <p className="text-gray-500 text-center">Composant {type} non implémenté</p>
          </div>
        )
    }
  }

  return (
    <div className="w-full">
      {renderComponent()}
    </div>
  )
}