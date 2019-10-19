import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const BOOKS_BY_AUTHOR = gql`
  query booksByAuthor($author: String!) {
    allBooks(author: $author) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`
const BOOKS_BY_GENRE = gql`
  query booksByAuthor($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const Books = props => {
  const client = useApolloClient(BOOKS_BY_AUTHOR)
  const [genre, setGenre] = useState('all')
  const [booksByAuthor, setBooksByAuthor] = useState([])
  const [booksByGenre, setBooksByGenre] = useState([])

  if (!props.show) {
    return null
  }

  if (props.books.loading || props.authors.loading) {
    return <div>loading...</div>
  }

  const books = props.books.data.allBooks
  const authors = props.authors.data.allAuthors

  const allGenres = []
  for (let book of books) {
    for (let genre of book.genres) {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    }
  }

  const findBooksByAuthor = async author => {
    const { data } = await client.query({
      query: BOOKS_BY_AUTHOR,
      variables: { author: author },
    })
    setBooksByAuthor(data.allBooks)
  }

  const findBooksByGenre = async genre => {
    if (genre === 'all') {
      console.log('all genres all books:', books)
      setBooksByGenre(books)
    } else {
      const { data } = await client.query({
        query: BOOKS_BY_GENRE,
        variables: { genre: genre },
      })
      setBooksByGenre(data.allBooks)
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
      {books && (
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
              <th>genres</th>
            </tr>
            {books.map(
              b =>
                (genre === 'all' || b.genres.includes(genre)) && (
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
      {allGenres.map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('all')}>all genres</button>
      <h2>GraphQL filters:</h2>
      <p>filter by author:</p>
      {authors
        .filter(author =>
          books.map(book => book.author.name).includes(author.name)
        )
        .map(author => (
          <button
            onClick={() => findBooksByAuthor(author.name)}
            key={author.name}
          >
            {author.name}
          </button>
        ))}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>

          {booksByAuthor.map(b => (
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
          ))}
        </tbody>
      </table>

      <p>filter by genre:</p>
      {allGenres.map(genre => (
        <button key={genre} onClick={() => findBooksByGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => findBooksByGenre('all')}>all genres</button>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>

          {booksByGenre.map(b => (
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
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
