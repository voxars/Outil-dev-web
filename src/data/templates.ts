import { WebsiteTemplate, ComponentType } from '@/types'

export const componentLibrary: Array<{
  type: ComponentType
  name: string
  description: string
  icon: string
  defaultProps: Record<string, unknown>
}> = [
  {
    type: 'header',
    name: 'En-tête',
    description: 'Navigation principale du site',
    icon: 'Layout',
    defaultProps: {
      title: 'Mon Site',
      navigation: ['Accueil', 'À propos', 'Services', 'Contact'],
      showLogo: true
    }
  },
  {
    type: 'hero',
    name: 'Section Hero',
    description: 'Section principale avec titre et CTA',
    icon: 'Star',
    defaultProps: {
      title: 'Bienvenue sur mon site',
      subtitle: 'Une description captivante de votre activité',
      buttonText: 'En savoir plus',
      backgroundImage: '',
      overlay: true
    }
  },
  {
    type: 'about',
    name: 'À propos',
    description: 'Section de présentation',
    icon: 'User',
    defaultProps: {
      title: 'À propos de nous',
      content: 'Découvrez notre histoire et nos valeurs...',
      image: '',
      imagePosition: 'right'
    }
  },
  {
    type: 'services',
    name: 'Services',
    description: 'Présentation des services',
    icon: 'Grid3X3',
    defaultProps: {
      title: 'Nos Services',
      services: [
        { title: 'Service 1', description: 'Description du service', icon: 'Star' },
        { title: 'Service 2', description: 'Description du service', icon: 'Heart' },
        { title: 'Service 3', description: 'Description du service', icon: 'Zap' }
      ]
    }
  },
  {
    type: 'portfolio',
    name: 'Portfolio',
    description: 'Galerie de réalisations',
    icon: 'Image',
    defaultProps: {
      title: 'Notre Portfolio',
      projects: [
        { title: 'Projet 1', description: 'Description', image: '', url: '#' },
        { title: 'Projet 2', description: 'Description', image: '', url: '#' },
        { title: 'Projet 3', description: 'Description', image: '', url: '#' }
      ]
    }
  },
  {
    type: 'testimonials',
    name: 'Témoignages',
    description: 'Avis clients',
    icon: 'MessageSquare',
    defaultProps: {
      title: 'Ce que disent nos clients',
      testimonials: [
        { name: 'Client 1', text: 'Excellent service !', rating: 5, avatar: '' },
        { name: 'Client 2', text: 'Très professionnel', rating: 5, avatar: '' }
      ]
    }
  },
  {
    type: 'contact',
    name: 'Contact',
    description: 'Formulaire de contact',
    icon: 'Mail',
    defaultProps: {
      title: 'Contactez-nous',
      showForm: true,
      showMap: true,
      address: '123 Rue Example, Ville',
      phone: '+33 1 23 45 67 89',
      email: 'contact@example.com'
    }
  },
  {
    type: 'footer',
    name: 'Pied de page',
    description: 'Informations de fin de page',
    icon: 'Layout',
    defaultProps: {
      copyright: '© 2024 Mon Site. Tous droits réservés.',
      links: ['Mentions légales', 'Politique de confidentialité'],
      socialLinks: [
        { platform: 'facebook', url: '#' },
        { platform: 'twitter', url: '#' },
        { platform: 'linkedin', url: '#' }
      ]
    }
  },
  {
    type: 'grid',
    name: 'Grille',
    description: 'Conteneur avec système de grille flexible',
    icon: 'Grid3X3',
    defaultProps: {
      columns: 2,
      rows: 1,
      gap: '4',
      alignItems: 'start',
      justifyContent: 'start'
    }
  },
  {
    type: 'container',
    name: 'Conteneur',
    description: 'Conteneur simple pour grouper des éléments',
    icon: 'Square',
    defaultProps: {
      padding: '4',
      margin: '2',
      maxWidth: 'full'
    }
  }
]

export const templates: WebsiteTemplate[] = [
  {
    id: 'business-modern',
    name: 'Entreprise Moderne',
    description: 'Template professionnel pour entreprise',
    preview: '/templates/business-modern.jpg',
    theme: {
      name: 'Business Blue',
      colors: {
        primary: '#2563EB',
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
    },
    components: [
      {
        id: 'header-1',
        type: 'header',
        props: {
          title: 'Votre Entreprise',
          navigation: ['Accueil', 'Services', 'À propos', 'Contact'],
          showLogo: true
        }
      },
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Développez votre activité avec nous',
          subtitle: 'Solutions professionnelles adaptées à vos besoins',
          buttonText: 'Découvrir nos services'
        }
      },
      {
        id: 'services-1',
        type: 'services',
        props: {
          title: 'Nos Services',
          services: [
            { title: 'Conseil', description: 'Accompagnement stratégique', icon: 'Star' },
            { title: 'Développement', description: 'Solutions sur mesure', icon: 'Code' },
            { title: 'Support', description: 'Assistance continue', icon: 'Support' }
          ]
        }
      },
      {
        id: 'grid-1',
        type: 'grid',
        props: {
          columns: 2,
          rows: 1,
          gap: '4',
          alignItems: 'start',
          justifyContent: 'start'
        },
        styles: {
          margin: '2rem 0',
          padding: '2rem',
          borderRadius: '8px',
          height: '200px'
        },
        children: []
      },
      {
        id: 'contact-1',
        type: 'contact',
        props: {
          title: 'Contactez-nous',
          showForm: true,
          address: '123 Avenue des Entreprises, Paris',
          phone: '+33 1 23 45 67 89',
          email: 'contact@votre-entreprise.com'
        }
      },
      {
        id: 'footer-1',
        type: 'footer',
        props: {
          copyright: '© 2024 Votre Entreprise. Tous droits réservés.'
        }
      }
    ]
  },
  {
    id: 'portfolio-creative',
    name: 'Portfolio Créatif',
    description: 'Template pour artistes et créatifs',
    preview: '/templates/portfolio-creative.jpg',
    theme: {
      name: 'Creative Dark',
      colors: {
        primary: '#7C3AED',
        secondary: '#64748B',
        accent: '#F59E0B',
        background: '#111827',
        text: '#F9FAFB',
        muted: '#9CA3AF'
      },
      fonts: {
        heading: 'Playfair Display, serif',
        body: 'Inter, sans-serif'
      }
    },
    components: [
      {
        id: 'header-2',
        type: 'header',
        props: {
          title: 'Votre Nom',
          navigation: ['Portfolio', 'À propos', 'Contact'],
          showLogo: false
        }
      },
      {
        id: 'hero-2',
        type: 'hero',
        props: {
          title: 'Créateur Visuel',
          subtitle: 'Design • Art • Innovation',
          buttonText: 'Voir mes créations'
        }
      },
      {
        id: 'portfolio-1',
        type: 'portfolio',
        props: {
          title: 'Mes Réalisations',
          projects: [
            { title: 'Projet Créatif 1', description: 'Design graphique', image: '', url: '#' },
            { title: 'Projet Créatif 2', description: 'Illustration', image: '', url: '#' },
            { title: 'Projet Créatif 3', description: 'Branding', image: '', url: '#' }
          ]
        }
      },
      {
        id: 'about-1',
        type: 'about',
        props: {
          title: 'À propos',
          content: 'Passionné par la création visuelle depuis plus de 10 ans...',
          imagePosition: 'left'
        }
      },
      {
        id: 'contact-2',
        type: 'contact',
        props: {
          title: 'Travaillons ensemble',
          showForm: true,
          email: 'hello@votre-nom.com'
        }
      }
    ]
  }
]