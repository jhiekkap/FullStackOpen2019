const notificationReducer = (state = '', action) => {
  console.log('Notification state now: ', state.notification)
  console.log('action', action)

  switch (action.type) {
    case 'NOTIFY':
      return action.data.notification
    default:
      return state
  }
}
 
 
 

export const setNotification = (message, time) => {
  return async dispatch => {
    //set_notification(message, time)
    dispatch({
      type: 'NOTIFY',
      data: {
        notification: `${message}`,
       // display: '',
      },
    })
    setTimeout(function() {
      dispatch({
        type: 'NOTIFY',
        data: {
          notification: '',
          //display: 'none',
        },
      })
    }, time * 1000)
  }
}

export default notificationReducer
