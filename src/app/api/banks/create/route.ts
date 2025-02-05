import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await req.json() // Expect `data` in the request body
    console.log('Check data format', data)

    const createdBank = await payload.create({
      collection: 'banks',
      data,
    })

    return NextResponse.json(createdBank, { status: 201 })
  } catch (error) {
    console.error('Error creating bank:', error)
    return NextResponse.json({ error: 'Failed to create bank' }, { status: 500 })
  }
}
