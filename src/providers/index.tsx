'use client'

import React from 'react'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

import translationEN from '@public/locales/en/common.json'
import translationBG from '@public/locales/bg/common.json'

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    bg: { translation: translationBG },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: { escapeValue: false },
})

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}
