import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { initUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = props => {
  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    props.initUsers()
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      props.initUser(user)
    }
  }, [])

  const userById = id => props.users && props.users.find(user => user.id === id)
  const blogById = id => props.blogs && props.blogs.find(blog => blog.id === id)

  return (
    <Container>
      <Row>
        <Col xs={6}>
          <Router>
            <Route exact path='/' render={() => <Home />} />
            <Route exact path='/users' render={() => <Users />} />
            <Route
              exact
              path='/users/:id'
              render={({ match }) => <User user={userById(match.params.id)} />}
            />
            <Route
              exact
              path='/blogs/:id'
              render={({ match }) => <Blog blog={blogById(match.params.id)} />}
            />
          </Router>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = state => {
  return {
    users: state.users,
    blogs: state.blogs,
  }
}
const mapDispatchToProps = {
  initBlogs,
  initUser,
  initUsers,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
