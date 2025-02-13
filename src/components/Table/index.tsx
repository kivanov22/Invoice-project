'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Button from '@mui/material/Button'
import { EditBankButton } from '../Bank/editButton'
import { DeleteBankButton } from '../Bank/deleteButton'
import { Typography } from '@mui/material'
import { format, isValid } from 'date-fns'

interface BasicTableProps {
  banks: any
  onEdit: any
  onDelete: any
}

// /const CustomTable: React.FC<CustomTableProps> = ({ collection, onEdit, onDelete }) => {
const BasicTable: React.FC<BasicTableProps> = ({ banks, onEdit, onDelete }) => {
  if (banks.length === 0) {
    return <Typography>No banks found.</Typography>
  }

  //TEst
  const handleEdit = async (id: string) => {
    try {
      const response = await fetch('/api/banks/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          data: {
            title: 'Updated Title',
            iban: 'Updated IBAN',
          },
        }),
      })

      if (response.ok) {
        const updatedBank = await response.json()
        console.log('Bank updated:', updatedBank)
      } else {
        console.error('Failed to update bank')
      }
    } catch (error) {
      console.error('Error:', error)
    }
    // console.log(`Edit bank with ID: ${id}`)
    // Add your edit logic here
  }

  const handleDelete = (id: string) => {
    console.log(`Delete bank with ID: ${id}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">IBAN</TableCell>
            <TableCell align="right">BIC</TableCell>
            <TableCell align="right">Slug</TableCell>
            <TableCell align="right">Created On</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banks.docs.map((bank) => (
            <TableRow key={bank.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {bank.title}
              </TableCell>
              {/* <TableCell align="right">{bank.id}</TableCell> */}
              <TableCell align="right">{bank.iban}</TableCell>
              <TableCell align="right">{bank.bic}</TableCell>
              <TableCell align="right">{bank.slug}</TableCell>
              <TableCell align="right">
                {bank.createdOn && isValid(new Date(bank.createdOn))
                  ? `${format(new Date(bank.createdOn), 'dd.MM.yyyy')} г.`
                  : '-'}
              </TableCell>
              <TableCell align="right">
                <EditBankButton bankId={bank.id} onEdit={onEdit}></EditBankButton>
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(bank.id)}
                  style={{ marginRight: '8px' }}
                >
                  Edit
                </Button> */}
                <DeleteBankButton id={bank.id} onDelete={onDelete}></DeleteBankButton>
                {/* <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(bank.id)}
                >
                  Delete
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
