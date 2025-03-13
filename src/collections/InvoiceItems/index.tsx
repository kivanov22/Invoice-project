import type { CollectionConfig } from 'payload'

export const InvoiceItems: CollectionConfig = {
  slug: 'invoiceItems',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'articleId',
      type: 'text',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'measurementId',
      type: 'text',
    },
    {
      name: 'measurements',
      type: 'relationship',
      relationTo: 'measurements',
      required: true,
    },
    {
      name: 'totalQuantity',
      type: 'number',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'discount',
      type: 'number',
    },
    {
      name: 'discountPrice',
      type: 'number',
    },
    {
      name: 'totalPrice',
      type: 'number',
    },
    {
      name: 'VAT',
      type: 'number',
    },
    {
      name: 'boxes',
      type: 'number',
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
