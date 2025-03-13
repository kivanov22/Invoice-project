import type { CollectionConfig } from 'payload'

export const LawApplications: CollectionConfig = {
  slug: 'lawApplications',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'shortName',
      type: 'text',
    },
    {
      name: 'identifier',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  timestamps: true,
}
