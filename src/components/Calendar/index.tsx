import React from 'react'
import { Calendar } from 'primereact/calendar'
import Typography from '@mui/material/Typography'

interface DateFieldProps {
  label: string
  value: string | Date | null
  onChange: (date: Date | null) => void
  required?: boolean
  variant?: 'outlined' | 'filled'
}

const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  variant,
}) => {
  return (
    <div className="flex flex-col gap-2 relative  ">
      <Typography sx={{ color: 'gray' }}>{label}</Typography>
      <Calendar
        variant={variant}
        value={value ? new Date(value) : null}
        onChange={(e) => onChange(e.value as Date | null)}
        dateFormat="dd/mm/yy"
        showButtonBar
        showIcon
        className={`${required && !value ? 'p-invalid' : ''}`}
        // panelClassName="custom-calendar"
        appendTo="self"
        // appendTo={() => document.body}
        panelClassName="z-[9999]"
        pt={{
          panel: { className: 'z-[9999]' },
        }}
      />
    </div>
  )
}

export default DateField
