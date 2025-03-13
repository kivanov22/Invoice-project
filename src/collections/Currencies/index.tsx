import type { CollectionConfig } from 'payload'

export const Currencies: CollectionConfig = {
  slug: 'currencies',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'fullName',
      type: 'text',
    },
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'units',
      type: 'number',
    },
    {
      name: 'rate',
      type: 'number',
    },
    {
      name: 'currencyRateDate',
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
