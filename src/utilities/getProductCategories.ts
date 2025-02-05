import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getProductCategories() {
  const payload = await getPayload({ config: configPromise })

  const productCategories = await payload.find({
    collection: 'productCategories',
    depth: 2,
  })
  console.log('Product Categories in function', productCategories)
  return productCategories
}
