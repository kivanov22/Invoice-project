'use client'
import { PageRange } from '@/components/PageRange'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Button, CircularProgress } from '@mui/material'
import { Pagination } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'
import CircularWithValueLabel from '@/components/common/Loader'
import InvoiceList from '@/components/Invoice/invoiceList'
import InvoiceNomenclature from '@/components/Invoice/invoiceNomenclature'
import InvoiceNoNomenclature from '@/components/Invoice/invoiceNoNomenclature'
import { Menu, MenuItem } from '@mui/material'

interface Invoice {
  id: string
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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

  const handleOpenModal = (invoice?: any) => {
    setSelectedInvoice(invoice || null)
    setOpenModal(true)
  }

  //TEST
  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
  }

  const handleSelectInvoiceType = (type: boolean) => {
    setIsWithNomenclature(type)
    setOpenModal(true)
    handleCloseDropdown()
  }
  ///
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
      <div className="container mb-16 flex flex-end items-center "></div>

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
        <div className="flex  flex-1 gap-10 items-center">
          <div className="mb-3">
            <h1 className="ml-10 text-3xl text-black dark:text-white font-bold">Invoices</h1>
          </div>
          <div className="container mb-7 mt-5 text-2xl">
            <PageRange
              collection="invoices"
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
          <div className="mr-10 ">
            <Button variant="contained" onClick={handleOpenDropdown} className="p-3">
              Add Invoice
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseDropdown}>
              <MenuItem onClick={() => handleSelectInvoiceType(false)}>With Nomenclature</MenuItem>
              <MenuItem onClick={() => handleSelectInvoiceType(true)}>
                Without Nomenclature
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-2 mx-auto">
        <div className=" w-full flex justify-center items-center">
          <div className="w-[90%] mx-auto ">
            {loading ? (
              <CircularProgress />
            ) : (
              <InvoiceList onEdit={handleOpenModal} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageClient
