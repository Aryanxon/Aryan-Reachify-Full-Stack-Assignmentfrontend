import React from 'react'

function ListItem({item, handleDelete}) {
  return (
    <div>
        <div className='flex my-4 justify-between w-[300px] md:w-[500px] bg-gray-200 rounded-2xl px-3 py-2'>
              <div className='text-xl font-bold'>{item.name}</div>
              <button onClick={() => {handleDelete(item._id)}} className='rounded-2xl bg-red-300 px-4 py-2'>Delete</button>
            </div>
      
    </div>
  )
}

export default ListItem
