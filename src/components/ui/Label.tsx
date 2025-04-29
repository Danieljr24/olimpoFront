import React, { HtmlHTMLAttributes } from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({children, ...props}: Props) {
  return (
    <label 
        className="mb-2.5 block font-medium text-darkBlue"
        {...props}
    >
        {children}
    </label>
  )
}
