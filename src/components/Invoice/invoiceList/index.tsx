import React, { useState, useEffect, useRef } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox'
import { format } from 'date-fns'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { Button } from '@mui/material'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import * as XLSX from 'xlsx'

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

interface InvoiceListProps {
  onEdit: (product?: any) => void
  onDelete: (productId: string) => void
}

const InvoiceList: React.FC<InvoiceListProps> = ({ onEdit, onDelete }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    mol: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    documentNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    accountant: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    invoiceDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bank: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    invoicePayed: { value: null, matchMode: FilterMatchMode.EQUALS },
    cancellation: { value: null, matchMode: FilterMatchMode.EQUALS },
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
  const dt = useRef<DataTable<Invoice[]>>(null)

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

  const exportCSV = () => {
    if (dt.current) {
      dt.current.exportCSV({ selectionOnly: false })
    }
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(invoices)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices')

    XLSX.writeFile(workbook, 'Invoices.xlsx')
  }

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
      <div style={{ textAlign: 'left' }}>
        <Button variant="contained" color="primary" onClick={exportCSV}>
          Export CSV
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={exportToExcel}
          style={{ marginLeft: '10px' }}
        >
          Export to Excel
        </Button>
      </div>
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

  const deleteInvoice = (id: string) => {
    confirmDialog({
      message: 'Are you sure you want to delete this invoice?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
      },
    })
  }

  const bankBodyTemplate = (rowData: Invoice) => <span>{rowData.bank?.title || 'N/A'}</span>

  return (
    <div className="bg-white p-5 shadow-lg rounded-md ">
      <ConfirmDialog />
      <DataTable
        className="p-datatable-sm p-datatable-striped p-datatable-gridlines border border-gray-300 p-6 rounded-lg"
        value={invoices}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 100]}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={['title', 'mol', 'documentNumber', 'accountant', 'invoiceDate', 'bank']}
        header={renderHeader()}
        // editMode="cell"
        // onRowEditComplete={onRowEditComplete}
        emptyMessage="No invoices found."
        ref={dt}
      >
        <Column
          field="title"
          header="Title"
          filter
          // editor={(options) => (
          //   <InputText
          //     value={options.value}
          //     onChange={(e) => {
          //       const newValue = e.target.value
          //       if (options.editorCallback) {
          //         options.editorCallback(newValue) // ✅ Ensure callback is called
          //       }
          //     }}
          //   />
          // )}
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
          filter
          filterPlaceholder="Search by Date"
          body={invoiceDateBodyTemplate}
          style={{ minWidth: '12rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="bank"
          header="Bank"
          filter
          filterPlaceholder="Search by Bank"
          body={bankBodyTemplate}
          style={{ minWidth: '10rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="invoicePayed"
          header="Paid"
          body={invoicePayedBodyTemplate}
          filter
          style={{ minWidth: '8rem' }}
          className="border-b-2 border-b-gray-300"
        />
        <Column
          field="cancellation"
          header="Canceled"
          body={cancellationBodyTemplate}
          filter
          style={{ minWidth: '8rem' }}
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
        <Column />
        <Column
          body={(rowData) => (
            <div className="flex gap-2">
              {/* Edit Button */}
              <Button variant="contained" color="primary" onClick={() => onEdit(rowData)}>
                Edit
              </Button>

              {/* Delete Button */}
              <Button variant="contained" color="error" onClick={() => onDelete(rowData.id)}>
                Delete
              </Button>
            </div>
          )}
          header="Actions"
          style={{ width: '10rem' }}
        />
        {/* <Column
          body={(rowData) => (
            <Button variant="contained" color="error" onClick={() => onDelete(rowData.id)}>
              Delete
            </Button>
          )}
          header="Actions"
          style={{ width: '10rem' }}
        /> */}
      </DataTable>
    </div>
  )
}

export default InvoiceList
