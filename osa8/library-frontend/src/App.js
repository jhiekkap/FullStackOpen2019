import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NewAuthor from './components/NewAuthor'
import Recommendations from './components/Recommendations'
import { gql } from 'apollo-boost'
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from '@apollo/react-hooks'
import LoginForm from './components/LoginForm'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

/* const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
    }
  } 
` */

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String
    $published: Int
    $genres: [String]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        bookCount
      }
    }
  }
`

const ADD_AUTHOR = gql`
  mutation addAuthor($name: String!, $born: Int) {
    addAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      user {
        username
        favoriteGenre
      }
    }
  }
`

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = error => {
    //setErrorMessage(error.graphQLErrors[0].message)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore,
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.title} added`)
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
  })

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const [login] = useMutation(LOGIN, {
    onError: handleError,
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () =>
    errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>

  return (
    <div>
      {errorNotification()}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('addBook')}>add book</button>}
        {token && (
          <button onClick={() => setPage('addAuthor')}>add author</button>
        )}
        {token && (
          <button onClick={() => setPage('recommendations')}>recommend</button>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>
      <Authors
        editAuthor={editAuthor}
        result={authors}
        show={page === 'authors'}
      />
      <Books authors={authors} books={books} show={page === 'books'} />
      <NewBook addBook={addBook} result={authors} show={page === 'addBook'} />
      <Recommendations
        user={user}
        result={books}
        show={page === 'recommendations'}
      />
      <NewAuthor addAuthor={addAuthor} show={page === 'addAuthor'} />
      <LoginForm
        setUser={setUser}
        login={login}
        show={page === 'login'}
        setToken={token => setToken(token)}
      />
    </div>
  )
}

export default App
