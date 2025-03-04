'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [checked, setChecked] = React.useState(true)
  const { i18n } = useTranslation()
  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      i18n.changeLanguage('en')
      setChecked(event.target.checked)
    } else {
      i18n.changeLanguage('bg')
      setChecked(false)
    }
  }

  return (
    <nav className="flex gap-3 items-center h-30">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only text-white dark:text-black">{t('Search')}</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
      <Typography sx={{ color: 'white', dark: { color: 'black' } }}>EN</Typography>
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Typography sx={{ color: 'white', dark: { color: 'black' } }}>BG</Typography>
    </nav>
  )
}
