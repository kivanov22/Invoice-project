import React, { useState } from 'react'
import { TextField, Box } from '@mui/material'

interface BanksFilterProps {
  onFilterChange: (filters: { title: string; iban: string; bic: string }) => void
}

const BanksFilter: React.FC<BanksFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: '',
    iban: '',
    bic: '',
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <Box
      sx={{
        marginBottom: 2,
        marginLeft: 2,
        background: 'white',
        padding: 2,
        width: '60%',
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black',
      }}
    >
      <div className="flex gap-2">
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          fullWidth
          value={filters.title}
          onChange={handleInputChange}
          placeholder="Title..."
        />
        <TextField
          label="Iban"
          variant="outlined"
          name="iban"
          fullWidth
          value={filters.iban}
          onChange={handleInputChange}
          placeholder="Iban..."
        />
        <TextField
          label="Bic"
          name="bic"
          variant="outlined"
          fullWidth
          value={filters.bic}
          onChange={handleInputChange}
          placeholder="Bic..."
        />
      </div>
    </Box>
  )
}

export default BanksFilter
