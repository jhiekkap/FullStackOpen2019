import React from 'react'
import { setNewFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    const newFilter = event.target.value

    props.setNewFilter(newFilter)
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setNewFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
