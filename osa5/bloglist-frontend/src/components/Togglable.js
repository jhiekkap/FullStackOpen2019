import React, { useState, useImperativeHandle  } from 'react'

const Togglable =  React.forwardRef((props, ref) => {
  
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  } 

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="row">
      <div style={hideWhenVisible}>
        <button className="btn btn-primary" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div  style={showWhenVisible}>
        {props.children}
        <button className="btn btn-primary" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable