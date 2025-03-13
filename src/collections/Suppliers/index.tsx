import type { CollectionConfig } from 'payload'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'customId',
      type: 'text',
    },
    {
      name: 'identifier',
      type: 'text',
    },
    {
      name: 'vatNumber',
      type: 'text',
    },
    {
      name: 'state',
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
      name: 'ownerName',
      type: 'text',
    },
    {
      name: 'ownerEmail',
      type: 'text',
    },
    {
      name: 'ownerPhone',
      type: 'text',
    },
    {
      name: 'ownerBank',
      type: 'text',
    },
    {
      name: 'ownerIBAN',
      type: 'text',
    },
    {
      name: 'ownerBIC',
      type: 'text',
    },
    {
      name: 'isVATRegistered',
      type: 'checkbox',
    },
    {
      name: 'isCompany',
      type: 'checkbox',
    },
    {
      name: 'persons',
      type: 'relationship',
      relationTo: 'persons',
      required: true,
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
