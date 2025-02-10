import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Handler to fetch or update a specific bank
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const payload = await getPayload({ config: configPromise })

  try {
    const product = await payload.findByID({
      collection: 'products',
      id,
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const data = await req.json()
  const payload = await getPayload({ config: configPromise })

  try {
    const updatedBank = await payload.update({
      collection: 'products',
      id,
      data,
    })

    return NextResponse.json(updatedBank, { status: 200 })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}
