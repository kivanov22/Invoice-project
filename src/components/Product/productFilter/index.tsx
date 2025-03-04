import React, { useState } from 'react'
import { TextField, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ProductFilterProps {
  onFilterChange: (filters: { code: string; title: string; brand: string }) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    code: '',
    title: '',
    brand: '',
  })
  const { t } = useTranslation()

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
      }}
    >
      <div className="flex gap-2">
        <TextField
          label={t('Code')}
          name="code"
          variant="outlined"
          fullWidth
          value={filters.code}
          onChange={handleInputChange}
          placeholder={`Enter code...`}
        />
        <TextField
          label={t('Title')}
          name="title"
          variant="outlined"
          fullWidth
          value={filters.title}
          onChange={handleInputChange}
          placeholder={`Enter title...`}
        />
        <TextField
          label={t('Brand')}
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
