'use client'

import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function SideMenu() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button label="Show Sidebar" icon="pi pi-bars" onClick={() => setVisible(true)} />

      <Sidebar visible={visible} onHide={() => setVisible(false)} className="p-sidebar-sm">
        <div className="flex flex-col justify-between items-center border-b pb-2 mb-4">
          <h1 className="text-lg font-normal">Sidebar</h1>
          <div className="flex gap-2">
            <button className="p-link" onClick={() => console.log('Print clicked')}>
              <span className="pi pi-print text-lg" />
            </button>
            <button className="p-link" onClick={() => setVisible(false)}>
              <span className="pi pi-arrow-right text-lg" />
            </button>
          </div>
          <div className="flex flex-col">
            <Button>Banks</Button>
            <Button>Invoices</Button>
            <Button>Products</Button>
          </div>
          <div className="mt-auto">
            <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <AccountCircleIcon />
              <span className="font-bold">Amy Elsner</span>
            </a>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => setVisible(false)}
            label="Save"
            className="p-button-success"
          />
          <Button
            type="button"
            onClick={() => setVisible(false)}
            label="Cancel"
            className="p-button-secondary"
          />
        </div>
      </Sidebar>
    </>
  )
}
