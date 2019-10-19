const filterReducer = (state = '', action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)

  switch (action.type) {
    case 'FILTER':
      return action.data.newFilter
    default:
      return state
  }
}

export const setNewFilter = newFilter => {
  return {
    type: 'FILTER',
    data: {
      newFilter: newFilter,
    },
  }
}

export default filterReducer
