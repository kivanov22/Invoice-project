import type { Metadata } from 'next/types'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  return (
    <div className="pt-24 pb-24">
      <PageClient />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Register`,
  }
}
