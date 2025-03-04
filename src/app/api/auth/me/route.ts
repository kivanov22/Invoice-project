// import { NextResponse } from 'next/server'
// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { cookies } from 'next/headers'

// export async function GET() {
//   const payload = await getPayload({ config: configPromise })

//   // Retrieve token from cookies
//   const cookiesStore = await cookies();
//   const token = cookiesStore.get('payload-token')?.value;

//   if (!token) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     // Validate and get user from token
//     const user = await payload.findByID({
//       collection: 'users',
//       id: (await payload.auth.me(token)).id,
//     })

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     return NextResponse.json({ user }, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching user:', error)
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
//   }
// }
