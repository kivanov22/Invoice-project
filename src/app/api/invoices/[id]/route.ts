import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { method } = req
  const { id } = params
  const payload = await getPayload({ config: configPromise })

  try {
    const invoice = await payload.findByID({
      collection: 'invoices',
      id,
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json(invoice, { status: 200 })
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json()

    const updatedInvoice = await payload.update({
      collection: 'invoices',
      id: params.id,
      data,
    })

    return NextResponse.json(updatedInvoice, { status: 200 })
  } catch (error) {
    console.error('Error updating invoice:', error)
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayload({ config: configPromise })

    const id = params.id
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
    }

    await payload.delete({
      collection: 'invoices',
      id: id,
    })

    return NextResponse.json({ message: 'Invoice deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 })
  }
}
