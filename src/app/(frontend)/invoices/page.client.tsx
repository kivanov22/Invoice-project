'use client'
import { PageRange } from '@/components/PageRange'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Button, CircularProgress } from '@mui/material'
import { Pagination } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'
import CircularWithValueLabel from '@/components/common/Loader'
import InvoiceList from '@/components/Invoice/invoiceList'
import InvoiceNomenclature from '@/components/Invoice/invoiceNomenclature'
import InvoiceNoNomenclature from '@/components/Invoice/invoiceNoNomenclature'
import { set } from 'date-fns'

interface Invoice {
  id: string // Assuming it's a string, update if necessary
  title: string
  mol: string
  bank: string
  documentNumber: string
  invoiceDate: string
  accountant: string
  invoicePayed: boolean
  cancellation: boolean
  isWithNomenclature: boolean
}

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const [filters, setFilters] = useState({ code: '', title: '', brand: '' })
  // const [invoices, setInvoices] = useState({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
  const [invoices, setInvoices] = useState<{
    docs: Invoice[]
    page: number
    totalPages: number
    totalDocs: number
  }>({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isWithNomenclature, setIsWithNomenclature] = useState(true)

  const fetchInvoices = useCallback(
    async (filters?: { code?: string; title?: string; brand?: string; categoryId?: string }) => {
      setLoading(true)

      const queryParams = new URLSearchParams()

      if (filters?.code) queryParams.append('where[code][contains]', filters.code)
      if (filters?.title) queryParams.append('where[title][contains]', filters.title)
      if (filters?.brand) queryParams.append('where[brand][contains]', filters.brand)
      if (filters?.categoryId) queryParams.append('where[category][equals]', filters.categoryId)

      const endPoint = queryParams.toString()
        ? `/api/invoices?${queryParams.toString()}`
        : '/api/invoices'

      try {
        const response = await fetch(endPoint)
        const data = await response.json()
        setInvoices(data)
      } catch (error) {
        console.error('Failed to fetch Invoices:', error)
        setInvoices({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const handleChangeInvoiceNomenclature = (value: boolean) => {
    setIsWithNomenclature(value)
    setOpenModal(true)
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const handleClear = () => {
    fetchInvoices()
  }

  const handleSearch = () => {
    fetchInvoices(filters)
  }

  const handleOpenModal = (invoice?: any) => {
    setSelectedInvoice(invoice || null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedInvoice(null)
  }

  const handleSaveInvoice = async (updatedInvoice: any) => {
    setInvoices((prevInvoices) => {
      const updatedInvoices = prevInvoices.docs.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice,
      )
      return { ...prevInvoices, docs: updatedInvoices }
    })

    await fetchInvoices()
    handleCloseModal()
  }

  const handleDelete = useCallback(
    async (id: string) => {
      console.log(`InvoiceId:${id}`)

      const checkProductExists = async (id: string) => {
        const response = await fetch(`/api/invoices/${id}`)
        return response.ok
      }

      const exists = await checkProductExists(id)
      if (!exists) {
        console.error('Invoice does not exist or was already deleted.')
        return
      }

      try {
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()
        console.log('Delete response:', data)

        if (response.ok) {
          console.log('Invoice deleted')
          // handleClose()
          fetchInvoices()
        } else {
          console.error('Failed to delete invoice')
        }
      } catch (error) {
        console.error('Error deleting invoice:', error)
      }
    },
    [fetchInvoices],
  )

  if (loading) {
    return (
      <div className="flex justify-center w-30">
        <CircularWithValueLabel />
      </div>
    )
  }

  return (
    <>
      <div className="container mb-16 flex  justify-between items-center ">
        <div className="prose dark:prose-invert max-w-none ">
          <h1 className="text-black dark:text-white">Invoices</h1>
        </div>
        <div className="">
          <Button variant="contained" onClick={() => handleOpenModal()}>
            Add Invoice
          </Button>
        </div>
      </div>

      {isWithNomenclature ? (
        <InvoiceNoNomenclature
          open={openModal}
          onClose={handleCloseModal}
          onSave={handleSaveInvoice}
          invoice={selectedInvoice}
        />
      ) : (
        <InvoiceNomenclature
          open={openModal}
          onClose={handleCloseModal}
          onSave={handleSaveInvoice}
          invoice={selectedInvoice}
        />
      )}

      <div className="flex space-x-5 items-center border border-black p-5 mb-5 dark:border-white">
        <div className="flex  flex-1 gap-10">
          <Button
            variant="contained"
            className="w-60"
            onClick={() => handleChangeInvoiceNomenclature(false)}
          >
            AddWithNomenclature
          </Button>
          <Button
            variant="outlined"
            className="w-60"
            onClick={() => handleChangeInvoiceNomenclature(true)}
          >
            AddWithoutNomenclature
          </Button>
        </div>
        <div className="flex justify-end space-x-5 p-10 flex-1">
          <Button variant="contained" onClick={handleSearch}>
            <FilterAltIcon />
            Filter
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            <ClearIcon />
            Clear
          </Button>
        </div>
      </div>

      <div className="flex space-x-5">
        <div className="">
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="ml-4 mr-4">
              <InvoiceList onEdit={handleOpenModal} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>

      <div className="container mb-8 mt-5 text-2xl">
        <PageRange
          collection="products"
          currentPage={invoices.page}
          limit={12}
          totalDocs={invoices.totalDocs}
        />
      </div>

      <div className="container">
        {invoices.totalPages > 1 && invoices.page && (
          <Pagination page={invoices.page} totalPages={invoices.totalPages} />
        )}
      </div>
    </>
  )
}

export default PageClient
