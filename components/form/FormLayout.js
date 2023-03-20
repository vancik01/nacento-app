import React from 'react'

function FormLayout({ children }) {
  return (
    <div className="flex flex-col gap-12 pt-10">
        {children}
    </div>
  )
}

export default FormLayout
