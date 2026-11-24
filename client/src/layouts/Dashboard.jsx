import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.user)

  return (
    <section className='min-h-[78vh] bg-slate-50'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10'>
            <div className='grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8'>
                <aside className='h-fit lg:sticky lg:top-24'>
                    <UserMenu/>
                </aside>
                <div className='min-w-0'>
                    <Outlet/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Dashboard