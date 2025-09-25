'use client'

import { WebsiteComponent } from '@/types'

interface ComponentRendererProps {
  component: WebsiteComponent
  isPreview?: boolean
  isSelected?: boolean
  onClick?: () => void
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
  onClick 
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
      animationDuration: styles.animation?.duration ? `${styles.animation.duration}ms` : undefined,
      animationDelay: styles.animation?.delay ? `${styles.animation.delay}ms` : undefined,
    }
  }

  // Classes d'animation
  const getAnimationClass = () => {
    if (!styles?.animation || styles.animation.type === 'none') return ''
    
    const animationTypeMap: Record<string, string> = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'slide-left': 'animate-slide-left',
      'slide-right': 'animate-slide-right',
      'zoom-in': 'animate-zoom-in',
      'bounce': 'animate-bounce',
      'pulse': 'animate-pulse',
    }
    
    return animationTypeMap[styles.animation.type] || ''
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
            className={`bg-white shadow-sm py-4 px-6 ${baseClasses}`} 
            onClick={onClick}
            style={customStyles}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                {(props.showLogo as boolean) && (
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                )}
                <h1 className="text-xl font-bold text-gray-900">{(props.title as string)}</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                {(props.navigation as string[])?.map((item: string, index: number) => (
                  <a key={index} href="#" className="text-gray-600 hover:text-gray-900">
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </header>
        )

      case 'hero':
        return (
          <section className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">{(props.title as string)}</h1>
              {(props.subtitle as string) && (
                <p className="text-xl mb-8 opacity-90">{(props.subtitle as string)}</p>
              )}
              {(props.buttonText as string) && (
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {(props.buttonText as string)}
                </button>
              )}
            </div>
          </section>
        )

      case 'about':
        return (
          <section className={`py-16 px-6 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-6xl mx-auto">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${props.imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{(props.title as string)}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{(props.content as string)}</p>
                </div>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <span className="text-gray-500">Image placeholder</span>
                </div>
              </div>
            </div>
          </section>
        )

      case 'services':
        return (
          <section className={`py-16 px-6 bg-gray-50 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {(props.services as Service[])?.map((service: { title: string; description: string; icon: string }, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-xl">⭐</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'portfolio':
        return (
          <section className={`py-16 px-6 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {(props.projects as Project[])?.map((project: { title: string; description: string; image: string; url: string }, index: number) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-gray-200 rounded-lg h-48 mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-semibold">Image</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'testimonials':
        return (
          <section className={`py-16 px-6 bg-gray-50 ${baseClasses}`} onClick={onClick}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{(props.title as string)}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {(props.testimonials as Testimonial[])?.map((testimonial: { name: string; text: string; rating: number; avatar: string }, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
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
          <footer className={`bg-gray-900 text-white py-8 px-6 ${baseClasses}`} onClick={onClick}>
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
        
        const gridClasses = [
          'grid',
          `grid-cols-${gridProps.columns || 2}`,
          `gap-${gridProps.gap || '4'}`,
          `items-${gridProps.alignItems || 'start'}`,
          `justify-${gridProps.justifyContent || 'start'}`,
          baseClasses
        ].join(' ')
        
        return (
          <div 
            className={gridClasses}
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
              <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
                <p>Ajoutez des composants à cette grille</p>
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
      {children && children.length > 0 && (
        <div className="space-y-0">
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
}