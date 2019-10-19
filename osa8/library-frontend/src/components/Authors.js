import React, { useState } from 'react'  

const Authors = props => {
  const [newBorn, setNewBorn] = useState('')
  const [updatedAuthor, setUpdatedAuthor] = useState('')
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors

  const submitUpdateAuthor = async e => {
    e.preventDefault()
    console.log('setting birthyear', updatedAuthor, newBorn)
    await props.editAuthor({
      variables: { name: updatedAuthor, setBornTo: newBorn },
    })
    setNewBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Update Author</h2>
      <form onSubmit={submitUpdateAuthor}>
        <input
          type='number'
          value={newBorn}
          onChange={({ target }) => setNewBorn(parseInt(target.value))}
        />
        <br />
        <select
          value={updatedAuthor}
          onChange={({ target }) => setUpdatedAuthor(target.value)}
        >
          <option>choose unborn author</option>
          {authors
            .filter(author => !author.born)
            .map((author, i) => (
              <option key={i} value={author.name}>
                {author.name}
              </option>
            ))}
        </select>
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
