import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { Ripple } from 'primereact/ripple'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Logo } from '../Logo/Logo'
import SettingsIcon from '@mui/icons-material/Settings'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HomeIcon from '@mui/icons-material/Home'

export default function HeadlessDemo() {
  const [visible, setVisible] = useState<boolean>(false)
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({})

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="card flex  justify-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)} showCloseIcon={false}>
        <div className="flex items-center justify-between px-4 pt-3 text-center mb-3">
          <div className="flex items-center gap-5 ">
            <Logo />
            <span className="font-semibold text-xl text-primary text-cyan-500">InvoiceApp</span>
          </div>

          <Button
            icon="pi pi-times"
            onClick={() => setVisible(false)}
            className="p-button-text p-button-rounded p-button-plain border rounder-lg border-cyan-500 text-cyan-500"
          />
        </div>
        <hr />
        <div className="min-h-screen flex  relative lg:static surface-ground ">
          <div
            id="app-sidebar-2"
            className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style={{ width: '280px' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex gap-10 items-center mt-4 mb-5 p-3 cursor-pointer ">
                <HomeIcon className="ml-3" />
                <span className="ml-3 font-medium">Dashboard</span>
              </div>
              <hr />
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <div
                      className="p-ripple p-3 flex items-center gap-5 justify-between  cursor-pointer"
                      onClick={() => toggleMenu('system')}
                    >
                      <SettingsIcon />
                      <span className="font-medium">System</span>
                      <i
                        className={`pi pi-chevron-${expandedMenus['system'] ? 'down' : 'right'}`}
                      ></i>
                      <Ripple />
                    </div>
                    {expandedMenus['system'] && (
                      <ul className="list-none p-0 m-0">
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Users</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Logs</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Companies</span>
                            <Ripple />
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
                <hr />
              </div>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <div
                      className="p-ripple p-3 flex items-center gap-5 justify-between  cursor-pointer"
                      onClick={() => toggleMenu('nomenclature')}
                    >
                      <ReceiptIcon />
                      <span className="font-medium">Nomenclature</span>
                      <i
                        className={`pi pi-chevron-${expandedMenus['nomenclature'] ? 'down' : 'right'}`}
                      ></i>
                      <Ripple />
                    </div>
                    {expandedMenus['nomenclature'] && (
                      <ul className="list-none p-0 m-0">
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Products</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Clients</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Currencies</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Measurements</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Document Types</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Banks</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Payments</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Law Applications</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Delivery</span>
                            <Ripple />
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
                <hr />
              </div>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <div
                      className="p-ripple p-3 flex items-center gap-5 justify-between text-600 cursor-pointer"
                      onClick={() => toggleMenu('invoicing')}
                    >
                      <AssessmentIcon />
                      <span className="font-medium">Invoicing</span>
                      <i
                        className={`pi pi-chevron-${expandedMenus['invoicing'] ? 'down' : 'right'}`}
                      ></i>
                      <Ripple />
                    </div>
                    {expandedMenus['invoicing'] && (
                      <ul className="list-none p-0 m-0">
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Invoices</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-bookmark mr-2"></i>
                            <span className="font-medium">Reports</span>
                            <Ripple />
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
                <hr />
              </div>
              {/* User */}
              <div className="mt-auto items-center text-center">
                <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round  hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <AccountCircleIcon />
                  <span className="font-bold">Amy Elsner</span>
                  <span className="font-bold">(User)</span>
                </a>
                <Button>Logout</Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} className="flex gap-2">
        Menu
      </Button>
    </div>
  )
}
