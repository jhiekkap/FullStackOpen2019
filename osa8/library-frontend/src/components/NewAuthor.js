import React, { useState } from 'react'

const NewAuthor = props => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submitCreateAuthor = async e => {
    e.preventDefault()
    console.log('new author:', name, born)
    await props.addAuthor({
      variables: { name: name, born: born },
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={submitCreateAuthor}>
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder='name'
        />
        <br />
        <input
          type='number'
          value={born}
          placeholder='born year'
          onChange={({ target }) => setBorn(parseInt(target.value))}
        />
        <br />
        <button type='submit'>create author</button>
      </form>
    </div>
  )
}

export default NewAuthor
