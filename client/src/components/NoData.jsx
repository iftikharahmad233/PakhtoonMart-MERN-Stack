import React from 'react'
import noDataImage from '../assets/no-data.png'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img
        src={noDataImage}
        alt='no data'
        className='w-90' 
      />
      <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData