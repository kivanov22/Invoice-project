'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header, User } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import TemporaryDrawer from '@/components/Drawler'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@payloadcms/ui'
import { OverlayPanel } from 'primereact/overlaypanel'
import { useTranslation } from 'react-i18next'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState(null) //admin or user
  const op = useRef<any>(null)
  const { t } = useTranslation()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setRole(null)

    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  }

  return (
    <header className=" relative z-20 w-full" {...(theme ? { 'data-theme': theme } : {})}>
      <div className=" flex justify-evenly items-center">
        {/* <div className="absolute top-7 left-0 z-50">
          <TemporaryDrawer navItems={data} />
        </div> */}
        <div className="flex items-center gap-5">
          <Link href="/">
            <Logo loading="eager" priority="high" className="w-20 h-20" />
          </Link>
          <h1 className="text-3xl text-black dark:text-white">Extreme Consulting</h1>
        </div>
        <HeaderNav data={data} />
        <div className="flex items-center gap-5 text-black dark:text-white rounded-md h-20 min-w-[200px]">
          <div className="px-10">
            <Button onClick={(e) => op.current.toggle(e)}>
              <AccountCircleIcon />
            </Button>
            <OverlayPanel ref={op}>
              {user ? (
                <ul>
                  <li className="p-2">
                    <SettingsIcon />
                    {t('Settings')}
                  </li>
                  <li className="p-2">
                    <AccountBoxIcon />
                    {t('Your Profile')}
                  </li>
                  <Link href="/">
                    <li className="p-2">
                      <LogoutIcon />
                      <Button onClick={handleLogout} className="mr-5">
                        {t('Logout')}
                      </Button>
                    </li>
                  </Link>
                </ul>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link href="/login">
                    <LoginIcon />
                    <Button>{t('Login')}</Button>
                  </Link>
                  <Link href="/register">
                    <Button>{t('Register')}</Button>
                  </Link>
                </div>
              )}
            </OverlayPanel>
          </div>
          <span className="text-black dark:text-white">{t(user?.email || 'User')}</span>
          <span className="text-black dark:text-white">({t(user?.role || '')})</span>
        </div>
      </div>
    </header>
  )
}
