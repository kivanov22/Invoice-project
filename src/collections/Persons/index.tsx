import type { CollectionConfig } from 'payload'

export const Persons: CollectionConfig = {
  slug: 'persons',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'tempId',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'employeePosition',
      type: 'text',
    },
    {
      name: 'hasPriority',
      type: 'checkbox',
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
