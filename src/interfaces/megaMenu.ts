interface MegaMenuItem {
  label: string
  icon?: string
  link?: {
    type: 'reference' | 'custom'
    reference?: {
      relationTo: 'pages' | 'posts'
      value: { id: string; slug: string; title: string }
    }
    url?: string
    newTab?: boolean
  }
  subItems?: MegaMenuItem[]
  url?: string
  newTab?: boolean
}
