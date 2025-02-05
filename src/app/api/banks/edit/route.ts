import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function PUT(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const { id, data } = await req.json() // Expect `id` and `data` in request body

    const updatedBank = await payload.update({
      collection: 'banks',
      id,
      data,
    })

    return NextResponse.json(updatedBank, { status: 200 })
  } catch (error) {
    console.error('Error updating bank:', error)
    return NextResponse.json({ error: 'Failed to update bank' }, { status: 500 })
  }
}
