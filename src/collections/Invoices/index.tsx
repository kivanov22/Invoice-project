import type { CollectionConfig } from 'payload'

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'mol',
      type: 'text',
    },
    {
      name: 'bank',
      type: 'relationship',
      relationTo: 'banks',
    },
    {
      name: 'documentNumber',
      type: 'text',
    },
    {
      name: 'invoiceDate',
      type: 'date',
    },
    {
      name: 'accountant',
      type: 'text',
    },
    {
      name: 'invoicePayed',
      type: 'checkbox',
    },
    {
      name: 'cancellation',
      type: 'checkbox',
    },
  ],
  access: {
    read: () => true,
  },
}
