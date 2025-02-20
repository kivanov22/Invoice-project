import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Bank } from '@/payload-types'

interface BankDropDownProps {
  selectedBank: Bank | null
  onBankChange: (bank: Bank | null) => void
}

const BankDropDown: React.FC<BankDropDownProps> = ({ selectedBank, onBankChange }) => {
  const [banks, setBanks] = useState<{
    docs: Bank[]
    page: number
    totalPages: number
    totalDocs: number
  }>({
    docs: [],
    page: 1,
    totalPages: 1,
    totalDocs: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchBanks = useCallback(async () => {
    setLoading(true)

    const endPoint = '/api/banks'

    try {
      const response = await fetch(endPoint)
      const data = await response.json()
      console.log('Dropdown data:', data)
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

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={banks.docs.find((bank) => bank.id === selectedBank?.id) || null}
        onChange={(e: DropdownChangeEvent) => {
          onBankChange(e.value)
        }}
        options={banks.docs}
        optionLabel="title"
        appendTo="self"
        placeholder="Select a Bank"
        className="w-full md:w-14rem"
        loading={loading}
      />
    </div>
  )
}

export default BankDropDown
