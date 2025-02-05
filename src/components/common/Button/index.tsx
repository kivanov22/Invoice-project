'use client'

import React, { useState } from 'react'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'

export const AddBankButton: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', iban: '', bic: '', slug: '' })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/banks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newBank = await response.json()
        console.log('Bank created:', newBank)
        handleClose()
        setFormData({ title: '', iban: '', bic: '', slug: '' })
      } else {
        console.error('Failed to create bank')
      }
    } catch (error) {
      console.error('Error creating bank:', error)
    }
  }

  return (
    <>
      <Button variant="contained" color="secondary" size="small" onClick={handleOpen}>
        Add Bank
        <AddBoxIcon />
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Add New Bank
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="IBAN"
            name="iban"
            value={formData.iban}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="BIC"
            name="bic"
            value={formData.bic}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
