import React, { useState, useEffect } from 'react'
import { classNames } from 'primereact/utils'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { format } from 'date-fns'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'

interface Invoice {
  id: string
  title: string
  mol: string
  bank: { id: string; title: string } | null
  documentNumber: string
  invoiceDate: string
  accountant: string
  invoicePayed: boolean
  cancellation: boolean
  isWithNomenclature: boolean
}

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mol: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    documentNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    accountant: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    invoicePayed: { value: null, matchMode: FilterMatchMode.EQUALS },
    cancellation: { value: null, matchMode: FilterMatchMode.EQUALS },
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('/api/invoices')
        const data = await response.json()
        setInvoices(data.docs)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching invoices:', error)
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }))
    setGlobalFilterValue(value)
  }

  const renderHeader = () => (
    <div className="flex justify-end gap-5 border-t-2 border-t-gray-300 p-5">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search..."
          className="p-inputtext-sm text-center border border-gray-300"
        />
      </IconField>
    </div>
  )

  const invoicePayedBodyTemplate = (rowData: Invoice) => (
    <Checkbox checked={rowData.invoicePayed} disabled />
  )

  const isWithNomenclaturePayedBodyTemplate = (rowData: Invoice) => (
    <Checkbox checked={rowData.isWithNomenclature} disabled />
  )

  const cancellationBodyTemplate = (rowData: Invoice) => (
    <Checkbox checked={rowData.cancellation} disabled />
  )

  const invoiceDateBodyTemplate = (rowData: Invoice) => (
    <span>{format(new Date(rowData.invoiceDate), 'dd/MM/yyyy')}</span>
  )

  const bankBodyTemplate = (rowData: Invoice) => <span>{rowData.bank?.title || 'N/A'}</span>

  return (
    <div className="bg-white p-5 shadow-lg rounded-md">
      <DataTable
        className="p-datatable-sm p-datatable-striped p-datatable-gridlines border border-gray-300 p-6 rounded-lg "
        value={invoices}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={['title', 'mol', 'documentNumber', 'accountant']}
        header={renderHeader()}
        emptyMessage="No invoices found."
      >
        <Column
          field="title"
          header="Title"
          filter
          filterPlaceholder="Search by title"
          className="border-b-2 border-b-gray-300"
          style={{ minWidth: '12rem' }}
        />
        <Column
          field="mol"
          header="MOL"
          filter
          filterPlaceholder="Search by MOL"
          className="border-b-2 border-b-gray-300"
          style={{ minWidth: '12rem' }}
        />
        <Column
          field="documentNumber"
          header="Document #"
          filter
          filterPlaceholder="Search by Doc#"
          style={{ minWidth: '12rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="accountant"
          header="Accountant"
          filter
          filterPlaceholder="Search by Accountant"
          style={{ minWidth: '12rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="invoiceDate"
          header="Date"
          body={invoiceDateBodyTemplate}
          style={{ minWidth: '12rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="bank"
          header="Bank"
          body={bankBodyTemplate}
          style={{ minWidth: '10rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="invoicePayed"
          header="Paid"
          body={invoicePayedBodyTemplate}
          filter
          style={{ minWidth: '10rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="cancellation"
          header="Canceled"
          body={cancellationBodyTemplate}
          filter
          style={{ minWidth: '10rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="isWithNomenclature"
          header="IsWithNomenclature"
          body={isWithNomenclaturePayedBodyTemplate}
          filter
          style={{ minWidth: '10rem' }}
          className="border-b-2 border-b-gray-300 "
        />
      </DataTable>
    </div>
  )
}
