import type { CollectionConfig } from 'payload'

export const MolDropDown: CollectionConfig = {
  slug: 'molDropDown',
  fields: [
    {
      name: 'clientId',
      type: 'text',
    },
    {
      name: 'persons',
      type: 'relationship',
      relationTo: 'persons',
      required: true,
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
