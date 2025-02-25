import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getMeUser } from '@/utilities/getMeUser'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const user = getMeUser()
  // console.log('Check user', (await user).user.email)

  return <HeaderClient data={headerData} />
}
