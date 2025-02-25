'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import TemporaryDrawer from '@/components/Drawler'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-evenly items-center">
        <div className="">
          <TemporaryDrawer navItems={data} />
        </div>
        <div className="flex items-center gap-5">
          <Link href="/">
            <Logo loading="eager" priority="high" className="w-20 h-20" />
          </Link>
          <h1 className="text-3xl">Extreme Consulting</h1>
        </div>
        <HeaderNav data={data} />
        <div>{/* User logic icon,email and dropdown for register,logout */}</div>
      </div>
    </header>
  )
}
