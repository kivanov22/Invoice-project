import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Checkbox, MenuItem, Select, TextField } from '@mui/material'
import { ProductCategories } from '@/collections/ProductCategories'

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
  onSave: () => void
  invoice?: any | null
}

const InvoiceNoNomenclature: React.FC<InvoiceNoNomenclatureProps> = ({
  open,
  onClose,
  onSave,
  invoice,
}) => {
  //   const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    mol: '',
    bank: '',
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
        bank: invoice.bank,
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
        bank: '',
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
    const { name, value } = e.target

    const newInvoice = { ...invoice, [name]: value } //last change
    setFormData(newInvoice)
  }

  const handleSubmit = async () => {
    const endPoint = invoice ? `/api/invoices/${invoice.id}` : '/api/invoices'
    const method = invoice ? 'PUT' : 'POST'

    try {
      const response = await fetch(endPoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoice), //product
      })

      if (response.ok) {
        const newInvoice = await response.json()
        console.log('Invoice created:', newInvoice)
        onSave()
        setFormData({
          title: '',
          mol: '',
          bank: '',
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
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: 'black', mb: 5 }}
          >
            {invoice ? 'Edit Without Nomenclature' : 'Create Without Nomenclature'}
          </Typography>

          <div className="flex flex-col gap-5 items-center">
            <div className="flex  gap-5">
              <TextField
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
                value={formData.title}
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
              <TextField
                label="Bank"
                name="bank"
                variant="outlined"
                fullWidth
                value={formData.bank}
                onChange={handleInputChange}
                placeholder={`Enter Bank...`}
              />
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
              <TextField
                label="Invoice Date"
                name="invoiceDate"
                variant="outlined"
                fullWidth
                value={formData.invoiceDate}
                onChange={handleInputChange}
                placeholder={`Enter date...`}
              />
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

            {/* <div className="flex flex-col w-full">
              <Typography sx={{ color: 'black', mb: 1 }}>Category</Typography>
              <Select
                value={
                  typeof formData.category === 'object' ? formData.category.id : formData.category
                }
                onChange={handleCategoryChange}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </div> */}

            <div className="flex flex-col">
              <Typography sx={{ color: 'black', ml: 1 }}>Invoice Payed</Typography>
              <Checkbox
                name="invoicePayed"
                checked={formData.invoicePayed}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
              />
              <Typography sx={{ color: 'black', ml: 1 }}>Cancellation</Typography>
              <Checkbox
                name="cancellation"
                checked={formData.cancellation}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
              />
              <Typography sx={{ color: 'black', ml: 1 }}>IsWithNomenclature</Typography>
              <Checkbox
                name="isWithNomenclature"
                checked={formData.isWithNomenclature}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
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
