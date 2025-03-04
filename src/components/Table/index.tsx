'use client'

import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { EditBankButton } from '../Bank/editButton'
import { DeleteBankButton } from '../Bank/deleteButton'
import { Typography } from '@mui/material'
import { format, isValid } from 'date-fns'
import { useTranslation } from 'react-i18next'

interface BasicTableProps {
  banks: any
  onEdit: any
  onDelete: any
}

// /const CustomTable: React.FC<CustomTableProps> = ({ collection, onEdit, onDelete }) => {
const BasicTable: React.FC<BasicTableProps> = ({ banks, onEdit, onDelete }) => {
  const { t } = useTranslation()
  if (banks.length === 0) {
    return <Typography>{t('No banks found')}.</Typography>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">{t('IBAN')}</TableCell>
            <TableCell align="right">{t('BIC')}</TableCell>
            <TableCell align="right">Slug</TableCell>
            <TableCell align="right">{t('Created On')}</TableCell>
            <TableCell align="right">{t('Actions')}</TableCell>
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
                <DeleteBankButton id={bank.id} onDelete={onDelete}></DeleteBankButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
