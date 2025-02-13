import type { CollectionConfig } from 'payload'

export const Banks: CollectionConfig = {
  slug: 'banks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'iban', 'bic', 'createdOn', 'slug', 'createdOn'],
    group: 'Financial Data',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      // unique: true,
    },
    {
      name: 'iban',
      type: 'text',
    },
    {
      name: 'bic',
      type: 'text',
    },
    {
      name: 'createdOn',
      type: 'date',
    },
  ],
}
