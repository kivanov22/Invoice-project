import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Handler to fetch or update a specific bank
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const payload = await getPayload({ config: configPromise })

  try {
    const bank = await payload.findByID({
      collection: 'banks',
      id,
    })

    if (!bank) {
      return NextResponse.json({ error: 'Bank not found' }, { status: 404 })
    }

    return NextResponse.json(bank, { status: 200 })
  } catch (error) {
    console.error('Error fetching bank:', error)
    return NextResponse.json({ error: 'Failed to fetch bank' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const data = await req.json()
  const payload = await getPayload({ config: configPromise })

  try {
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
