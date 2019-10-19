import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const notification = props.notification

  return (
    <div
      style={{
        padding: '5px',
        backgroundColor: '#d3d3d3',
        color: notification.color,
        borderRadius: 98,
        border: notification.color,
        borderStyle: 'solid',
        display: notification.display,
      }}
      className='notification'
    >
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
