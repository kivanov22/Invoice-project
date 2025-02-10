import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })

    const data = await req.json()

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 })
    }

    const { category, ...productData } = data

    if (typeof category !== 'string') {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    console.log('Category ID:', category)
    console.log('Product Data:', productData)

    const createdProduct = await payload.create({
      collection: 'products',
      data: {
        ...productData,
        category, //: new ObjectId(category),
      },
    })

    return NextResponse.json(createdProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product', details: error?.message },
      { status: 500 },
    )
  }
}
