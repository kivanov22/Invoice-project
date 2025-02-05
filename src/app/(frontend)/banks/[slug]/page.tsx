import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Bank } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import BasicTable from '@/components/Table'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const banks = await payload.find({
    collection: 'banks',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = banks.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Bank({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  // const { pageNumber } = await paramsPromise
  const { slug = '' } = await paramsPromise
  const url = '/banks/' + slug
  const bank = await queryBankBySlug({ slug })
  const payload = await getPayload({ config: configPromise })
  //  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const banks = await payload.find({
    collection: 'banks',
    depth: 1,
    limit: 12,
    // page: sanitizedPageNumber,
    overrideAccess: false,
  })

  if (!bank) return <PayloadRedirects url={url} />

  return <BasicTable banks={banks} /> //bank prop
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const bank = await queryBankBySlug({ slug })

  return generateMeta({ doc: bank })
}

const queryBankBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'banks',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
