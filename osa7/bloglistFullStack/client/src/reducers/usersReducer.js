import userService from './../services/users'

const usersReducer = (state = null, action) => {
  /* console.log('users state now: ', state)
  console.log('users action', action) */
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default usersReducer
