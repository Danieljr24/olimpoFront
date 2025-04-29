import React from 'react'

interface PropsCard {
    title: string,
    description: string,
    amount: number;
    height?: number;
}

export default function Card({title, description, amount, height=200}: PropsCard) {
  return (
    <div className="flex justify-between md:w-1/2 rounded-lg bg-white hover:bg-gray-4" style={{height: `${height}px`, width: '100%', border: '1px solid #8C8C8C'}}>
        <div className="w-2/3 pt-4 pl-9 ">
            <p className='text-darkBlue text-2xl font-bold'>{title}</p>
            <p className='text-darkBlue text-xs mt-4 '>{description}</p>
        </div>
        <div className="w-1/3 diagonal-clip bg-darkBlue rounded-r-lg flex justify-end p-4 font-bold text-3xl text-white dark:bg-green">
            <p>{(amount.toString()).length <=3 ? amount: '. . . .' }</p>
        </div>
    </div>

  )
}
