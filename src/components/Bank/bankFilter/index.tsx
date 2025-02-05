import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'

interface BanksFilterProps {
  onFilterChange: (filter: string) => void
  fetchBanks: (filter?: string) => void
}

const BanksFilter: React.FC<BanksFilterProps> = ({ onFilterChange, fetchBanks }) => {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilter(value)
    // setSearch(value)
    onFilterChange(value) // Send filter value to parent
  }

  const handleClear = () => {
    setSearch('')
    fetchBanks()
    // onFilterChange('') // Reset filter
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
          label="Bank name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleInputChange}
          placeholder="Enter bank name..."
        />
        <TextField
          label="Bank Iban"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleInputChange}
          placeholder="Enter bank iban..."
        />
        <TextField
          label="Bank Bic"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={handleInputChange}
          placeholder="Enter bank bic..."
        />
      </div>
      {/* <div>
        <Button variant="outlined" onClick={handleClear}>
          Clear
        </Button>
      </div> */}
    </Box>
  )
}

export default BanksFilter
