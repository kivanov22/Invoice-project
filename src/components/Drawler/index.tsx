'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useRouter } from 'next/navigation'
import MenuIcon from '@mui/icons-material/Menu'

export default function TemporaryDrawer({ navItems }: { navItems: any }) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleNavigation = (text?: any) => {
    let path = ''

    if (text?.link?.type === 'custom') {
      path = text.link.url
    } else if (text?.link?.type === 'reference' && text.link.reference?.value?.slug) {
      path = `/${text.link.reference.value.slug}`
    }

    if (!path) {
      console.error('Navigation path is undefined for:', text)
      return
    }

    router.push(path)
    setOpen(false)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.navItems.map((text: any, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleNavigation(text)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text.link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div className="text-white dark:text-black ">
      <Button className="text-white dark:text-black" onClick={toggleDrawer(true)}>
        <MenuIcon className="text-white" />
        <span className="text-black dark:text-white">Menu</span>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
