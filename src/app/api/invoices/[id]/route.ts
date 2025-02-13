import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const payload = await getPayload({ config: configPromise })

  try {
    const product = await payload.findByID({
      collection: 'invoices',
      id,
    })

    if (!product) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const data = await req.json()
  const payload = await getPayload({ config: configPromise })

  try {
    const updatedInvoice = await payload.update({
      collection: 'invoices',
      id,
      data,
    })

    return NextResponse.json(updatedInvoice, { status: 200 })
  } catch (error) {
    console.error('Error updating invoice:', error)
    return NextResponse.json({ error: 'Failed to invoice product' }, { status: 500 })
  }
}
