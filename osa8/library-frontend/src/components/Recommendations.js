import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const RECOMMENDATIONS_BY_USER = gql`
  query findBooksByUsername($username: String!) {
    allBooks(username: $username) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const Recommendations = props => {
  const client = useApolloClient(RECOMMENDATIONS_BY_USER)
  const [booksByUsername, setBooksByUsername] = useState([])

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const findBooksByUsername = async user => {
    const { data } = await client.query({
      query: RECOMMENDATIONS_BY_USER,
      variables: { username: props.user.username },
    })
    setBooksByUsername(data.allBooks)
  }

  findBooksByUsername(props.user.username)

  return (
    <div>
      <h2>GraphQL recommendations</h2>
      {props.user && <h2>USER: {props.user.username}</h2>}
      <p>
        books in your favorite genre <b>{props.user.favoriteGenre}</b>
      </p>
      {booksByUsername && (
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
              <th>genres</th>
            </tr>
            {booksByUsername.map(
              b =>
                b.genres.includes(props.user.favoriteGenre) && (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                    <td>
                      {b.genres.map(genre => (
                        <span key={genre}>{genre}</span>
                      ))}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Recommendations
