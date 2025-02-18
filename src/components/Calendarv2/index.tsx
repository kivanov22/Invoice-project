import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

interface CalendarProps {
  label: string
  value: Date | null
  onChange: (date: Date | null) => void
}

const CalendarMUI: React.FC<CalendarProps> = ({ label, value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value)

  const handleChange = (newValue: Date | null) => {
    setSelectedDate(newValue)
    onChange(newValue)
  }

  return (
    <DatePicker
      label={label}
      value={selectedDate}
      onChange={handleChange}
      slotProps={{ textField: { fullWidth: true } }}
    />
  )
}

export default CalendarMUI
