'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  const { t } = useTranslation()

  return (
    <nav className="flex gap-3 items-center h-30">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only text-white dark:text-black">{t('Search')}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
