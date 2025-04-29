import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({children, ...props}: Props) {
  return (
    <button
        className='inline-flex items-center justify-center rounded-md text-white px-10 py-4 text-center font-medium hover:bg-opacity-90 lg:px-8 xl:px-10'
        style={{backgroundColor: props.color ? props.color: "#00314D"}}
        {...props}
    >
        {children}
    </button>
  )
}
