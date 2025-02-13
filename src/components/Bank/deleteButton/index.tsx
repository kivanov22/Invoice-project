'use client'

import React, { useState } from 'react'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { DeleteIcon } from 'lucide-react'

interface DeleteBankButtonProps {
  id: string
  onDelete: () => void
}

export const DeleteBankButton: React.FC<DeleteBankButtonProps> = ({ id, onDelete }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/banks/${id}`, {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        console.log('Bank deleted')
        handleClose()
        onDelete() // Refresh the bank list after deletion
      } else {
        console.error('Failed to delete bank')
      }
    } catch (error) {
      console.error('Error deleting bank:', error)
    }
  }

  return (
    <>
      <Button
        style={{ marginRight: '8px' }}
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleOpen}
      >
        DELETE
        <DeleteIcon />
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
            Are you sure you want to delete this bank?
          </Typography>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
