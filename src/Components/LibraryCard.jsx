import React from 'react'

const LibraryCard = ({library}) => {
  return (
    <div className='m-10 border-2 bg-blue-300 rounded'>
        <h1 className='font-bold text-white'> {library.name}</h1>
        

        
    </div>
  )
}

export default LibraryCard