import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { removeBlog, likeBlog, commentBlog } from './../reducers/blogReducer'
import { initUsers } from './../reducers/usersReducer'
import Header from './Header'
import { withRouter } from 'react-router-dom'

const Blog = props => {
  const { blog, user } = props
  const [comment, setComment] = useState('')

  const handleLikeButton = async blog => {
    props.likeBlog(blog)
    console.log('UPDATED BLOG: ', blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    //borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemoveButton = async blog => {
    if (user) {
      if (user.username === blog.user.username) {
        if (
          window.confirm(
            `Are you sure you want to remove blog '${blog.title}' by ${
              blog.author
            } ? `
          )
        ) {
          let id = blog.id
          props.history.push('/')
          await props.removeBlog(id)
          props.initUsers()
          console.log('REMOVED BlOG: ', blog)
          //props.setNotification(false, `Blog: '${blog.title}' removed`)
        }
      } else {
        alert('removing not allowed')
      }
    } else {
      alert('removing possible only by logged user')
    }
  }

  const handleComment = e => {
    e.preventDefault()
    console.log('COMMENTTI: ', comment)
    props.commentBlog(blog, comment)
  }

  return (
    <Container className='blog' style={blogStyle}>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>
            {blog.title}
            {blog.author}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <a href={blog.url}>{blog.url}</a>
        </Col>
      </Row>
      <Row className='likesAndUser'>
        <Col>
          <Row>
            <Col>
              {blog.likes} likes &nbsp;&nbsp;
              <Button
                variant='outline-success'
                onClick={() => handleLikeButton(blog)}
              >
                like
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              added by {blog.user.name}&nbsp;&nbsp;
              {props.user && props.user.username === blog.user.username && (
                <Button
                  variant='outline-danger'
                  onClick={() => handleRemoveButton(blog)}
                >
                  remove
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>comments</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleComment}>
                <Form.Group>
                  <Form.Control
                    type='text'
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                  />
                </Form.Group>
                <Button variant='outline-success' type='submit'>
                  comment
                </Button>
              </Form>
            </Col>
          </Row>
          {blog.comments && (
            <Row>
              <Col>
                <ul>
                  {blog.comments.map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setNotification,
  removeBlog,
  likeBlog,
  commentBlog,
  initUsers,
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Blog)
)
