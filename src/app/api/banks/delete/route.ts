import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function DELETE(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id } = await req.json() // Expect `id` in the request body

    await payload.delete({
      collection: 'banks',
      id,
    })

    return NextResponse.json({ message: 'Bank deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting bank:', error)
    return NextResponse.json({ error: 'Failed to delete bank' }, { status: 500 })
  }
}
