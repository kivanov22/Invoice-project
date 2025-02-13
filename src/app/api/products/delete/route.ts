import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const params = await context.params
  const id = params.id
  const payload = await getPayload({ config: configPromise })

  try {
    // const { id } = await req.json()

    const deletedProduct = await payload.delete({
      collection: 'products',
      id,
    })

    if (!deletedProduct) {
      throw new Error('Product not found or could not be deleted')
    }
    console.log('Delete result:', deletedProduct)

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
