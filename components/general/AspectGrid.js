import React from 'react'

function AspectGrid({ ratio, className, children }) {

    let add = ""

    if(children.length < 4)
        add = `w-[${children.length*400}px]`

  return (
    <div className={`aspect-grid ${className} ${add}`}>
        {React.Children.map(children, child =>
            // React.cloneElement(child, {
            // className: `${child.props.className ? child.props.className : ''} aspect-item aspect-3/4`
            // })
            React.cloneElement(child, { style: { aspectRatio: ratio} })
            
        )}
    </div>
  )
}

export default AspectGrid
