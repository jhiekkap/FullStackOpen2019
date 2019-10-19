const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', config.MONGODB_URI)

mongoose.set('useFindAndModify', false)

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    user: User!
  }

  type Query {
    bookCount: Int!
    allBooks(username: String, author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book

    addAuthor(name: String!, born: Int): Author

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      console.log('ALLBOOKS ARGS: ', args)
      const books = await Book.find({}).populate('author')
      if (args.username) {
        const user = await User.findOne({ username: args.username })
        const booksByUsername = await books.filter(book =>
          book.genres.includes(user.favoriteGenre)
        )
        console.log('booksByUsername: ', booksByUsername)
        return booksByUsername
      } else if (args.author) {
        const booksByAuthor = await books.filter(
          book => book.author.name === args.author
        )
        console.log('booksByAuthor: ', booksByAuthor)
        return booksByAuthor
      } else if (args.genre) {
        const booksByGenre = await books.filter(book =>
          book.genres.includes(args.genre)
        )
        console.log('booksByGenre: ', booksByGenre)
        return booksByGenre
      } else {
        return books
      }
    },

    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  /* Author: {
    bookCount: async root => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name === root.name).length
    },
  }, */
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          bookCount: 0,
        })
        author.bookCount += 1
        await author.save()
        console.log('new author created: ', author)
      }
      console.log('args: ', args)
      console.log('author: ', author)
      const book = new Book({ ...args, author })
      try {
        await book.save()
        console.log('new book added: ', book)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    addAuthor: (root, args) => {
      try {
        const author = new Author({ ...args, bookCount: 0 })
        console.log('new author: ', author)
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      //console.log('args: ', args)
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      console.log('trying to login..')
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'test') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      const value = jwt.sign(userForToken, JWT_SECRET)
      const result = { value, user }
      console.log('RESULT:', result)
      return result
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
