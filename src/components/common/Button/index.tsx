'use client'

import React, { useEffect, useState } from 'react'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'

interface CustomButtonProps {
  buttonName: string
  modalName: string
  Id?: string
  docs: Record<string, any>[]
  onEdit?: () => void
  onDelete?: () => void
  collection: string
  buttonAction: string
  method: 'POST' | 'GET' | 'DELETE'
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  collection,
  docs,
  method,
  buttonAction,
  buttonName,
  modalName,
}) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  console.log('Check formData', formData)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (open) {
      setFormData(buttonAction === 'edit' && docs[0] ? docs[0] : {}) // Set first product as default when opening modal
    } else {
      setFormData({}) // Reset when closing
    }
  }, [open, docs, buttonAction]) //maybe and close

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const requestOptions: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(method !== 'GET' && method !== 'DELETE' ? { body: JSON.stringify(formData) } : {}),
      }
      //   const url = `/api/${collection}${buttonAction !== 'create' ? `/${buttonAction}` : ''}`
      const response = await fetch(`/api/${collection}/${buttonAction}`, requestOptions)

      if (response.ok) {
        const result = await response.json()
        console.log(`Succesful:${buttonAction}`, result)
        handleClose()
        // setFormData({ title: '', iban: '', bic: '', slug: '' })
      } else {
        console.error(`Failed to ${buttonAction}!`)
      }
    } catch (error) {
      console.error(`Error ${buttonAction}!:`, error)
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <>
      <Button variant="contained" color="secondary" size="small" onClick={handleOpen}>
        {buttonName}
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
          <Typography variant="h6" component="h2" mb={2} className="text-black">
            {modalName}
          </Typography>

          {formData &&
            typeof formData === 'object' &&
            !Array.isArray(formData) &&
            Object.keys(formData).map((key) => (
              <TextField
                fullWidth
                margin="normal"
                key={key}
                label={capitalizeFirstLetter(key)}
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
              />
            ))}

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
