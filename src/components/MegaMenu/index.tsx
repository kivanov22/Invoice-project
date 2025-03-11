'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const MegaMenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MegaMenuItem[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/megaMenu')
        const data = await res.json()

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
    <nav className="relative z-50 bg-transparent text-white">
      <ul className="flex space-x-6 p-4">
        {menuItems.map((item, index) => (
          <li key={index} className="group relative">
            <button className="px-4 py-2">{item.label}</button>
            {item.subItems && item.subItems.length > 0 && (
              <ul className="absolute left-0 mt-1 w-48 bg-gray-900 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                {item.subItems.map((sub, subIndex) => (
                  <li key={subIndex} className="border-b border-gray-700">
                    <button
                      className="block w-full px-4 py-2 text-left hover:bg-gray-700"
                      onClick={() => handleNavigation(sub.url!, sub.newTab)}
                    >
                      {sub.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MegaMenuComponent
