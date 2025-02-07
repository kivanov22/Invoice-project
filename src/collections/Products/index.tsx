import type { CollectionConfig } from 'payload'
import { ObjectId } from 'mongodb'

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'brand',
      type: 'text',
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
      name: 'active',
      type: 'checkbox',
    },
    {
      name: 'totalPrice',
      type: 'number',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'productCategories',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        // const categoryId = doc.category || doc.category

        const categoryId = typeof doc.category === 'object' ? doc.category.id : doc.category

        if (categoryId) {
          if (typeof categoryId !== 'string') {
            throw new Error('Invalid category ID')
          }
          // Count how many products are in this category
          const productsInCategory = await req.payload.find({
            collection: 'products',
            where: { category: { equals: categoryId } },
          })

          // Update the product count in the category
          await req.payload.update({
            collection: 'productCategories',
            id: categoryId,
            data: { productCount: productsInCategory.docs.length },
          })
        }
      },
    ],
  },
}
