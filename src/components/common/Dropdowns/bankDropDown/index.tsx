import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Bank } from '@/payload-types'

interface BankDropDownProps {}

const BankDropDown: React.FC<BankDropDownProps> = ({}) => {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [banks, setBanks] = useState({ docs: [], page: 1, totalPages: 1, totalDocs: 0 })
  const [loading, setLoading] = useState(true)

  const fetchBanks = useCallback(async () => {
    setLoading(true)

    const endPoint = '/api/banks'

    try {
      const response = await fetch(endPoint)
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

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedBank}
        onChange={(e: DropdownChangeEvent) => setSelectedBank(e.value)}
        options={banks.docs}
        optionLabel="name"
        placeholder="Select a Bank"
        className="w-full md:w-14rem"
      />
    </div>
  )
}

export default BankDropDown
