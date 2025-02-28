import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Clear the authentication cookie
  ;(
    await // Clear the authentication cookie
    cookies()
  ).delete('payload-token')

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
}
