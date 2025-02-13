import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await req.json()

    await payload.delete({
      collection: 'invoices',
      id,
    })

    return NextResponse.json({ message: 'Invoice deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 })
  }
}
