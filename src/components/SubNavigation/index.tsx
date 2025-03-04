'use client'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import Switch from '@mui/material/Switch'
import { Typography } from '@mui/material'
import { useState } from 'react'
import SideMenu from '../SideMenu'
import { useTranslation } from 'react-i18next'

export default function SubNavigation() {
  const [checked, setChecked] = useState(true)
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
    <div className="flex items-center justify-evenly bg-gray-500 relative z-20">
      <div className="flex flex-1 ml-5">
        <SideMenu />
      </div>

      <div className="flex justify-center items-center gap-5">
        <Typography sx={{ color: 'black', dark: { color: 'white' } }}>EN</Typography>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography sx={{ color: 'black', dark: { color: 'white' } }}>BG</Typography>
        <ThemeSelector />
      </div>
    </div>
  )
}
