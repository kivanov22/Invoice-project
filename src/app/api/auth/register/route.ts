import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  const payload = await getPayload({ config: configPromise })
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const userRole = 'user'

  try {
    const user = await payload.create({
      collection: 'users',
      data: { email, password, role: userRole },
    })
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error('Error creating a user:', error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
