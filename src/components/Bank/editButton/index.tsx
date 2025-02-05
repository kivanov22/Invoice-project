'use client'

import React, { useState } from 'react'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'

interface EditBankButtonProps {
  bankId: string
  onEdit: () => void
  //   refreshBanks: () => void
}

export const EditBankButton: React.FC<EditBankButtonProps> = ({ bankId, onEdit }) => {
  //refreshBanks
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', iban: '', bic: '', slug: '' })

  const handleOpen = async () => {
    setOpen(true)

    try {
      const response = await fetch(`/api/banks/${bankId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const bank = await response.json()
        console.log('Bank:', bank)
        setFormData(bank)
      } else {
        console.error('Failed to get bank')
      }
    } catch (error) {
      console.error('Error getting bank:', error)
    }
  }
  const handleClose = () => setOpen(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/banks/${bankId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const editBank = await response.json()
        console.log('Bank edited:', editBank)
        handleClose()
        onEdit()
        // refreshBanks()
      } else {
        console.error('Failed to edit bank')
      }
    } catch (error) {
      console.error('Error editing bank:', error)
    }
  }

  return (
    <>
      <Button
        style={{ marginRight: '8px' }}
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        EDIT
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
            EDIT
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
