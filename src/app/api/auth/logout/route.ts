import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  ;(await cookies()).delete('payload-token')

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
}
