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

// export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
//   const params = await context.params
//   const id = params.id

//   try {
//     const payload = await getPayload({ config: configPromise })
//     // const { id } = await req.json()

//     await payload.delete({
//       collection: 'banks',
//       id: id,
//     })

//     return NextResponse.json({ message: 'Bank deleted successfully' }, { status: 200 })
//   } catch (error) {
//     console.error('Error deleting bank:', error)
//     return NextResponse.json({ error: 'Failed to delete bank' }, { status: 500 })
//   }
// }
