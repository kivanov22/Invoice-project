import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Checkbox, TextField } from '@mui/material'
import { Bank, Invoice } from '@/payload-types'
import DateField from '@/components/Calendar'
import BankDropDown from '@/components/common/Dropdowns/bankDropDown'
import { format } from 'date-fns'

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 700,
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface InvoiceNoNomenclatureProps {
  open: boolean
  onClose: () => void
  onSave: (updatedInvoice: Invoice) => void
  invoice?: any | null
}

const InvoiceNoNomenclature: React.FC<InvoiceNoNomenclatureProps> = ({
  open,
  onClose,
  onSave,
  invoice,
}) => {
  const [formData, setFormData] = useState<{
    title: string
    mol: string
    bank: Bank | null
    documentNumber: string
    invoiceDate: string
    accountant: string
    invoicePayed: boolean
    cancellation: boolean
    isWithNomenclature: boolean
  }>({
    title: '',
    mol: '',
    bank: null,
    documentNumber: '',
    invoiceDate: '',
    accountant: '',
    invoicePayed: false,
    cancellation: false,
    isWithNomenclature: false,
  })

  useEffect(() => {
    if (invoice) {
      setFormData({
        title: invoice.title,
        mol: invoice.mol,
        bank: invoice?.bank || null,
        documentNumber: invoice.documentNumber,
        accountant: invoice.accountant,
        invoiceDate: invoice.invoiceDate,
        invoicePayed: invoice.invoicePayed,
        cancellation: invoice.cancellation,
        isWithNomenclature: invoice.isWithNomenclature,
      })
    } else {
      setFormData({
        title: '',
        mol: '',
        bank: null,
        documentNumber: '',
        invoiceDate: '',
        accountant: '',
        invoicePayed: false,
        cancellation: false,
        isWithNomenclature: false,
      })
    }
  }, [invoice])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleDateChange = (value: Date) => {
    if (value) {
      setFormData((prev: any) => ({
        ...prev,
        invoiceDate: format(value, 'yyyy-MM-dd'),
      }))
    }
  }

  const handleBankChange = (bankObj: Bank | null) => {
    setFormData((prev) => ({ ...prev, bank: bankObj }))
  }

  const handleSubmit = async () => {
    const endPoint = invoice ? `/api/invoices/${invoice.id}` : '/api/invoices'
    const method = invoice ? 'PUT' : 'POST'

    try {
      // const dataToSubmit = {
      //   ...formData,
      //   invoiceDate: formData.invoiceDate ? formData.invoiceDate.toISOString() : null,
      // };

      const response = await fetch(endPoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newInvoice = await response.json()
        onSave(newInvoice)
        setFormData({
          title: '',
          mol: '',
          bank: null,
          documentNumber: '',
          invoiceDate: '',
          accountant: '',
          invoicePayed: false,
          cancellation: false,
          isWithNomenclature: false,
        })
      } else {
        console.error('Failed to create invoice', response)
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 1300 }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: 'black', mb: 5 }}
          >
            {invoice ? 'Update Invoice Nomenclature' : 'Create Invoice Nomenclature'}
          </Typography>

          <div className="flex flex-col gap-5 items-center ">
            <div className="flex  gap-5">
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={formData && formData.title ? formData.title : ''}
                onChange={handleInputChange}
                placeholder={`Enter Title...`}
              />
              <TextField
                label="MOL"
                name="mol"
                variant="outlined"
                fullWidth
                value={formData.mol}
                onChange={handleInputChange}
                placeholder={`Enter MOL...`}
              />

              <BankDropDown selectedBank={formData.bank} onBankChange={handleBankChange} />
            </div>
            <div className="flex  gap-5">
              <TextField
                label="Document Number"
                name="documentNumber"
                variant="outlined"
                fullWidth
                value={formData.documentNumber}
                onChange={handleInputChange}
                placeholder={`Enter doc number...`}
              />

              <div className="w-full border border-gray-300 rounded-lg ">
                <DateField
                  variant="outlined"
                  label="Invoice Date"
                  value={formData.invoiceDate}
                  onChange={handleDateChange}
                />
              </div>

              <TextField
                label="Accountant"
                name="accountant"
                variant="outlined"
                fullWidth
                value={formData.accountant}
                onChange={handleInputChange}
                placeholder={`Enter Accountant...`}
              />
            </div>

            <div className="flex flex-col">
              <Typography sx={{ color: 'black', ml: 1 }}>Invoice Payed</Typography>
              <Checkbox
                name="invoicePayed"
                checked={formData.invoicePayed}
                onChange={handleInputChange}
                // onChange={(e) =>
                //   setFormData((prev) => ({ ...prev, invoicePayed: e.target.checked }))
                // }
              />
              <Typography sx={{ color: 'black', ml: 1 }}>Cancellation</Typography>
              <Checkbox
                name="cancellation"
                checked={formData.cancellation}
                onChange={handleInputChange}
              />
              <Typography sx={{ color: 'black', ml: 1 }}>IsWithNomenclature</Typography>
              <Checkbox
                name="isWithNomenclature"
                checked={formData.isWithNomenclature}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <Button onClick={handleSubmit}>{invoice ? 'Update' : 'Create'}</Button>
              <Button onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default InvoiceNoNomenclature
