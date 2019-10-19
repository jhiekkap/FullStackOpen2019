const loginReducer = (state = null, action) => {
  /* console.log('login state now: ', state)
  console.log('login action', action) */
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'INIT_USER':
      return action.data
    default:
      return state
  }
}

export const login = user => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export const initUser = user => {
  return async dispatch => {
    dispatch({
      type: 'INIT_USER',
      data: user,
    })
  }
}

export default loginReducer
