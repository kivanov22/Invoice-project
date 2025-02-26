'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import TemporaryDrawer from '@/components/Drawler'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@payloadcms/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null) //admin or user
  const [status, setStatus] = useState(null) //logged or not

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const fetchUser = React.useCallback(async () => {
    const res = await fetch('/api/users/me', {
      credentials: 'include',
    })

    const data = await res.json()
    const { email, role } = data.user

    if (email) {
      setUser(email)
    }
    if (role) {
      setRole(role)
    }
    // setUser(email)
    // setRole(role)
    console.log('Check User', data)
  }, [])

  const handleLogout = async () => {}
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    // container
    <header className=" relative z-20 w-full" {...(theme ? { 'data-theme': theme } : {})}>
      <div className=" flex justify-evenly items-center">
        <div className="absolute top-7 left-0 z-50">
          <TemporaryDrawer navItems={data} />
        </div>
        <div className="flex items-center gap-5">
          <Link href="/">
            <Logo loading="eager" priority="high" className="w-20 h-20" />
          </Link>
          <h1 className="text-3xl text-white dark:text-white">Extreme Consulting</h1>
        </div>
        <HeaderNav data={data} />
        <div className="flex items-center gap-5 text-white dark:text-white border border-white  rounded-md h-20 min-w-[200px]">
          <div className="px-10">
            <AccountCircleIcon className="" />
          </div>
          <span className="text-white dark:text-white">{user || 'User'}</span>
          <span className="text-white dark:text-white">({role || ''})</span>
          {/* dropdown settings,your profile and sign-out little modal */}
          {user ? (
            <div
              className={
                'absolute top-16 right-13 w-40 h-20 bg-white dark:bg-gray-800 rounded-md shadow-md'
              }
            >
              <ul>
                <li className="p-2">Settings</li>
                <li className="p-2">Your Profile</li>
                <Link href="/">
                  <li className="p-2">
                    <Button onClick={handleLogout} className="mr-5">
                      Logout
                    </Button>
                  </li>
                </Link>
              </ul>
            </div>
          ) : (
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
