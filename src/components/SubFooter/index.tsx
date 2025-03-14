import React from 'react'
import { Logo } from '../Logo/Logo'

const SubFooter: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-20 bg-gray-200 dark:bg-gray-800 gap-5">
      <Logo loading="eager" priority="high" className="bg-gray-200" />
      <h1 className="text-3xl text-black dark:text-white">Invoice App</h1>
    </div>
  )
}

export default SubFooter
