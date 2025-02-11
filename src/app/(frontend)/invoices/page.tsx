import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getProductCategories } from '@/utilities/getProductCategories'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  //   const products = await getProductCategories()
  //   console.log('Products:', products)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Invoices`,
  }
}
