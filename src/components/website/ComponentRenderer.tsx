'use client'

import { WebsiteComponent, ComponentType } from '@/types'

interface ComponentRendererProps {
  component: WebsiteComponent
  isPreview?: boolean
  isSelected?: boolean
  onClick?: () => void
}

export function ComponentRenderer({ 
  component, 
  isPreview = false, 
  isSelected = false,
  onClick 
}: ComponentRendererProps) {
  const { type, props, styles, children } = component

  // Classes communes pour tous les composants
  const baseClasses = [
    'relative',
    isSelected && !isPreview ? 'ring-2 ring-blue-500 ring-offset-2' : '',
    !isPreview ? 'cursor-pointer' : '',
    'transition-all duration-200'
  ].filter(Boolean).join(' ')

  // Rendu spécifique par type de composant
  const renderComponent = () => {
    switch (type) {
      case 'header':
        return (
          <header className={`bg-white shadow-sm py-4 px-6 ${baseClasses}`} onClick={onClick}>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                {props.showLogo && (
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                )}
                <h1 className="text-xl font-bold text-gray-900">{props.title}</h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                {props.navigation?.map((item: string, index: number) => (
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
              <h1 className="text-5xl font-bold mb-6">{props.title}</h1>
              {props.subtitle && (
                <p className="text-xl mb-8 opacity-90">{props.subtitle}</p>
              )}
              {props.buttonText && (
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {props.buttonText}
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{props.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">{props.content}</p>
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
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{props.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {props.services?.map((service: { title: string; description: string; icon: string }, index: number) => (
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
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{props.title}</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {props.projects?.map((project: { title: string; description: string; image: string; url: string }, index: number) => (
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
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{props.title}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {props.testimonials?.map((testimonial: { name: string; text: string; rating: number; avatar: string }, index: number) => (
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
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{props.title}</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Informations de contact</h3>
                  <div className="space-y-4">
                    {props.address && (
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-600">📍</span>
                        <span className="text-gray-600">{props.address}</span>
                      </div>
                    )}
                    {props.phone && (
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">📞</span>
                        <span className="text-gray-600">{props.phone}</span>
                      </div>
                    )}
                    {props.email && (
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600">✉️</span>
                        <span className="text-gray-600">{props.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                {props.showForm && (
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
                <p className="text-gray-400 mb-4">{props.copyright}</p>
                {props.links && (
                  <div className="flex justify-center space-x-6 mb-4">
                    {props.links.map((link: string, index: number) => (
                      <a key={index} href="#" className="text-gray-400 hover:text-white">
                        {link}
                      </a>
                    ))}
                  </div>
                )}
                {props.socialLinks && (
                  <div className="flex justify-center space-x-4">
                    {props.socialLinks.map((social: { platform: string; url: string }, index: number) => (
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