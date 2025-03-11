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
import MegaMenuComponent from '@/components/MegaMenu'

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
    <header
      className="fixed top-0 left-0 w-full h-20 bg-[#111827] dark:bg-gray-900 shadow-md z-[9999] "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-5">
          <Link href="/">
            <Logo loading="eager" priority="high" className="w-20 h-20" />
          </Link>
          <h1 className="text-3xl text-white dark:text-white">Extreme Consulting</h1>
        </div>
        <div className="relative z-[9999] ">
          <MegaMenuComponent />
        </div>

        <div className="flex items-center gap-5 text-white dark:text-white h-20 min-w-[200px]">
          <div className="px-10">
            <Button onClick={(e) => op.current.toggle(e)}>
              <AccountCircleIcon />
            </Button>
            <OverlayPanel ref={op}>
              {user ? (
                <ul>
                  <li className="p-2 flex items-center gap-2">
                    <SettingsIcon />
                    {t('Settings')}
                  </li>
                  <li className="p-2 flex items-center gap-2">
                    <AccountBoxIcon />
                    {t('Your Profile')}
                  </li>
                  <Link href="/">
                    <li className="p-2 flex items-center gap-2">
                      <LogoutIcon />
                      <Button onClick={handleLogout}>{t('Logout')}</Button>
                    </li>
                  </Link>
                </ul>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link href="/login">
                    <div className="flex items-center gap-2">
                      <LoginIcon />
                      <Button>{t('Login')}</Button>
                    </div>
                  </Link>
                  <Link href="/register">
                    <Button>{t('Register')}</Button>
                  </Link>
                </div>
              )}
            </OverlayPanel>
          </div>
          <span>{t(user?.email || 'User')}</span>
          <span>({t(user?.role || '')})</span>
        </div>
      </div>
    </header>
  )
}
