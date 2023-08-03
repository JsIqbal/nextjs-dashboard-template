import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Toaster } from '@/components/ui/toaster'

import React from 'react'

const DashboardLayout = ({children}) => {
  return (
    <div className='h-full relative p-0'>
        <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900'>
            <Sidebar/>
        </div>
        <main className='md:pl-72 flex flex-col h-full'>
            <Navbar/>
            {children}
            <Toaster/>
        </main>
    </div>
  )
}

export default DashboardLayout