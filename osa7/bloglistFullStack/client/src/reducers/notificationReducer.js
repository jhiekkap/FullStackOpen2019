const notificationReducer = (
  state = { message: '', display: 'none' },
  action
) => {
  /* console.log('Notification state now: ', state.notification)
  console.log('action', action) */

  switch (action.type) {
    case 'NOTIFY':
      console.log('NOTIFY: ', action.data.notification.message)
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (ok, message) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: {
        notification: {
          message: `${message}`,
          display: '',
          color: ok ? 'green' : 'red',
        },
      },
    })
    setTimeout(function() {
      dispatch({
        type: 'NOTIFY',
        data: {
          notification: { message: '', display: 'none' },
        },
      })
    }, 3000)
  }
}

export default notificationReducer
