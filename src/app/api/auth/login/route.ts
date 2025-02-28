import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const payload = await getPayload({ config: configPromise })
  const { email, password } = await req.json()

  console.log('Check email', email)
  console.log('Check password', password)

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  try {
    const user = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    console.log('Login route user', user)

    if (!user || !user.token) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
    }

    let cookieStore = await cookies()
    cookieStore.set({
      name: 'payload-token',
      value: user.token,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json(
      {
        user: { id: user.user.id, email: user.user.email, role: user.user.role, token: user.token },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error logging in user:', error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
