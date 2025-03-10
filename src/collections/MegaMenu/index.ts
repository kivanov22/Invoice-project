import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const MegaMenu: CollectionConfig = {
  slug: 'megaMenu',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: ['reference', 'custom'],
              required: true,
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: ['pages', 'posts'],
              admin: { condition: (_, data) => data.type === 'reference' },
            },
            {
              name: 'url',
              type: 'text',
              admin: { condition: (_, data) => data.type === 'custom' },
            },
            {
              name: 'newTab',
              type: 'checkbox',
            },
          ],
        },
        {
          name: 'subItems',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: ['reference', 'custom'],
                  required: true,
                },
                {
                  name: 'reference',
                  type: 'relationship',
                  relationTo: ['pages', 'posts'],
                  admin: { condition: (_, data) => data.type === 'reference' },
                },
                {
                  name: 'url',
                  type: 'text',
                  admin: { condition: (_, data) => data.type === 'custom' },
                },
                {
                  name: 'newTab',
                  type: 'checkbox',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
