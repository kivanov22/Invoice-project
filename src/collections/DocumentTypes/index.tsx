import type { CollectionConfig } from 'payload'

export const DocumentTypes: CollectionConfig = {
  slug: 'documentTypes',
  fields: [
    {
      name: 'name',
      type: 'text',
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
