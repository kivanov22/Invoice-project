import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import BasicTable from '@/components/Table'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { AddBankButton } from '@/components/Bank/createButton'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const banks = await payload.find({
    collection: 'banks',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      iban: true,
      bic: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      {/* <div className="container mb-16 flex  justify-between items-center">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-white">Banks</h1>
        </div>
        <div className="">
          <AddBankButton />
        </div>
      </div>
      <BasicTable banks={banks} />

      <div className="container mb-8 mt-5 text-2xl">
        <PageRange
          collection="banks"
          currentPage={banks.page}
          limit={12}
          totalDocs={banks.totalDocs}
        />
      </div>

      <div className="container">
        {banks.totalPages > 1 && banks.page && (
          <Pagination page={banks.page} totalPages={banks.totalPages} />
        )}
      </div> */}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Banks`,
  }
}
