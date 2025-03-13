import type { CollectionConfig } from 'payload'

export const Measurements: CollectionConfig = {
  slug: 'measurements',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'shortName',
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
