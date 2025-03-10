import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { Ripple } from 'primereact/ripple'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Logo } from '../Logo/Logo'
import SettingsIcon from '@mui/icons-material/Settings'
import ReceiptIcon from '@mui/icons-material/Receipt'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HomeIcon from '@mui/icons-material/Home'

export default function SideMenuExpand() {
  const [visible, setVisible] = useState<boolean>(false)
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MegaMenuItem[]>([])

  const icons = {
    Dashboard: HomeIcon,
    System: SettingsIcon,
    Nomenclature: ReceiptIcon,
    Invoicing: AssessmentIcon,
    User: AccountCircleIcon,
  }

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/megaMenu')
        const data = await res.json()

        console.log('Check data:', data)

        if (!data?.docs) return

        const transformedMenu = data.docs.map((menu: { items: MegaMenuItem[] }) => ({
          label: menu.items[0].label,
          icon: menu.items[0].icon || undefined,
          subItems: menu.items[0].subItems?.map((sub) => {
            let linkUrl = '#'

            if (sub.link) {
              if (sub.link.type === 'reference' && sub.link.reference?.value?.slug) {
                linkUrl = `/${sub.link.reference.value.slug}`
              } else if (sub.link.type === 'custom' && sub.link.url) {
                linkUrl = sub.link.url
              }
            }

            return {
              label: sub.label,
              url: linkUrl,
              newTab: sub.link?.newTab,
            }
          }),
        }))

        setMenuItems(transformedMenu)
      } catch (error) {
        console.error('Error fetching MegaMenu data:', error)
      }
    }

    fetchMenu()
  }, [])

  const handleNavigation = (url: string, newTab: boolean = false) => {
    if (newTab) {
      window.open(url, '_blank')
    } else {
      router.push(url)
    }
  }

  return (
    <div className="card flex  justify-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)} showCloseIcon={false}>
        <div className="flex items-center justify-between px-4 pt-3 text-center mb-3 mt-20">
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
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <div
                        className="p-ripple p-3 flex items-center gap-5 justify-between  cursor-pointer"
                        onClick={() => toggleMenu(item.label)}
                      >
                        {icons[item.label] && React.createElement(icons[item.label])}
                        {/* {(Icon && <Icon />)} */}

                        <span className="font-medium">{item.label}</span>
                        <i
                          className={`pi pi-chevron-${expandedMenus[item.label] ? 'down' : 'right'}`}
                        ></i>
                        <Ripple />
                      </div>
                      <hr />
                      {expandedMenus[item.label] && item.subItems && item.subItems.length > 0 && (
                        <ul className="list-none p-0 m-0">
                          {item.subItems.map((sub, subIndex) => (
                            <li
                              key={subIndex}
                              onClick={() => handleNavigation(sub.url!, sub.newTab)}
                            >
                              <a className="p-ripple flex items-center gap-2 cursor-pointer p-3 border-round  hover:surface-100 transition-duration-150 transition-colors w-full">
                                <i className="pi pi-bookmark mr-2"></i>
                                <span className="font-medium">{sub.label}</span>
                                <Ripple />
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
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
