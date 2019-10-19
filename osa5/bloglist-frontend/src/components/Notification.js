import React from 'react'
 
const Notification = ({ notification }) => {


  if (notification === null) {
    return null
  }
  let color = notification.slice(0, 8) === 'positive' ? 'green' : 'red'

  return (
    <div style={{ padding: "5px", backgroundColor: "#d3d3d3", color: color, borderRadius: 98, border: color, borderStyle: "solid" }} className="notification">
      {color === 'green' ? notification.substring(8) : notification}
    </div>
  )
}

export default Notification 