import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'productCategories',
  admin: {
    useAsTitle: 'title', // Display category name instead of ID
  },
  labels: {
    singular: 'ProductCategory',
    plural: 'ProductCategories',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'productCategories', // Self-referencing relationship
      hasMany: false, // Single parent category
    },
    {
      name: 'children',
      type: 'relationship',
      relationTo: 'productCategories', // Self-referencing relationship
      hasMany: true, // Multiple subcategories
      admin: {
        condition: () => false, // Hide in admin, auto-filled based on parent
      },
    },
    {
      name: 'productCount',
      type: 'number',
      defaultValue: 0, // Number of products in the category
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
}
