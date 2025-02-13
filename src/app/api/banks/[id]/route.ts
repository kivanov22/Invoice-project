import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Ensure the ID is available
    const id = params.id
    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
    }

    // Delete the document by ID
    await payload.delete({
      collection: 'banks',
      id: id,
    })

    return NextResponse.json({ message: 'Bank deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting bank:', error)
    return NextResponse.json({ error: 'Failed to delete bank' }, { status: 500 })
  }
}

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   const { method } = req
//   const { id } = params
//   const payload = await getPayload({ config: configPromise })

//   try {
//     const bank = await payload.findByID({
//       collection: 'banks',
//       id,
//     })

//     if (!bank) {
//       return NextResponse.json({ error: 'Bank not found' }, { status: 404 })
//     }

//     return NextResponse.json(bank, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching bank:', error)
//     return NextResponse.json({ error: 'Failed to fetch bank' }, { status: 500 })
//   }
// }
