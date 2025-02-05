'use client'
import BanksFilter from '@/components/Bank/bankFilter'
import { AddBankButton } from '@/components/Bank/createButton'
import { PageRange } from '@/components/PageRange'
import BasicTable from '@/components/Table'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Button, CircularProgress } from '@mui/material'
import { Pagination } from '@payloadcms/ui'
import React, { useCallback, useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ClearIcon from '@mui/icons-material/Clear'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const [filter, setFilter] = useState('')
  const [banks, setBanks] = useState({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
  const [loading, setLoading] = useState(true)

  const fetchBanks = useCallback(async (filter?: string) => {
    setLoading(true)

    const endPoint = filter ? `/api/banks?where[title][contains]=${filter}` : '/api/banks'

    try {
      const response = await fetch(endPoint) //'/api/banks'
      const data = await response.json()
      setBanks(data)
    } catch (error) {
      console.error('Failed to fetch banks:', error)
      setBanks({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBanks()
  }, [fetchBanks])

  const handleClear = () => {
    fetchBanks()
  }

  const handleSearch = () => {
    fetchBanks(filter)
  }

  const handleUpdate = () => {
    fetchBanks() // Refresh the table after an update or delete
  }

  if (loading) {
    return <div className="text-5xl text-center">Loading...</div>
  }

  return (
    <>
      <div className="container mb-16 flex  justify-between items-center">
        <div className="prose dark:prose-invert max-w-none ">
          <h1 className="text-white">Banks</h1>
        </div>
        <div className="">
          <AddBankButton />
        </div>
      </div>
      <div className="flex space-x-5 items-center">
        <div className="flex flex-col flex-1">
          <BanksFilter onFilterChange={setFilter} fetchBanks={fetchBanks} />
          <div className="flex items-center ml-4">
            <p className="text-4xl">Results:{banks.docs.length}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-5 p-10 flex-1">
          <Button variant="contained" onClick={handleSearch}>
            <FilterAltIcon />
            Filter
          </Button>
          <Button variant="outlined" onClick={handleClear}>
            <ClearIcon />
            Clear
          </Button>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="ml-4 mr-4">
          <BasicTable banks={banks} onEdit={handleUpdate} onDelete={handleUpdate} />
        </div>
      )}

      <div className="container mb-8 mt-5 text-2xl">
        <PageRange
          collection="banks"
          currentPage={banks.page}
          limit={12}
          totalDocs={banks.totalDocs}
        />
      </div>

      <div className="container">
        {banks.totalPages > 1 && banks.page && (
          <Pagination page={banks.page} totalPages={banks.totalPages} />
        )}
      </div>
    </>
  )
}

export default PageClient
