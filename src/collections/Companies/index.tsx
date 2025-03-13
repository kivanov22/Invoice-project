import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'identityNumber',
      type: 'text',
    },
    {
      name: 'identityNumberByDDS',
      type: 'text',
    },
    {
      name: 'bankName',
      type: 'text',
    },
    {
      name: 'companyIBAN',
      type: 'text',
    },
    {
      name: 'companyBIC',
      type: 'text',
    },
    {
      name: 'percentDDS',
      type: 'number',
    },
    {
      name: 'manager',
      type: 'text',
    },
    {
      name: 'phone',
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
