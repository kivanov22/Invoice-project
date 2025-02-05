import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const productCategories = await payload.find({
    collection: 'productCategories',
    depth: 2,
  })

  return NextResponse.json(productCategories)
}
