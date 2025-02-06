import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material'
import { Product } from '@/payload-types'

interface ProductFilterProps {
  onFilterChange: (filters: { code: string; title: string; brand: string }) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    code: '',
    title: '',
    brand: '',
  })
  const [search, setSearch] = useState('')

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
          label="Code"
          name="code"
          variant="outlined"
          fullWidth
          value={filters.code}
          onChange={handleInputChange}
          placeholder={`Enter code...`}
        />
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={filters.title}
          onChange={handleInputChange}
          placeholder={`Enter title...`}
        />
        <TextField
          label="Brand"
          name="title"
          variant="outlined"
          fullWidth
          value={filters.brand}
          onChange={handleInputChange}
          placeholder={`Enter brand...`}
        />
      </div>
    </Box>
  )
}

export default ProductFilter
