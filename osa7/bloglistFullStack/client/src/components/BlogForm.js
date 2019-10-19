import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { setNotification } from './../reducers/notificationReducer'
import { createBlog } from './../reducers/blogReducer'
import { connect } from 'react-redux'
import { initUsers } from './../reducers/usersReducer'

const BlogForm = props => {
  const { blogFormRef } = props

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateBlog = async e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    console.log(' NEW STUFF', newTitle, newAuthor, newUrl)

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    await props.createBlog(newBlog)
    props.initUsers()
    props.setNotification(
      true,
      `a new blog '${newTitle}' by ${newAuthor} added`
    )
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Container>
      <h2>create new</h2>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          title:
          <Form.Control
            type='text'
            value={newTitle}
            name='Title'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className='form-group'>
          author:
          <Form.Control
            type='text'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className='form-group'>
          url:
          <Form.Control
            type='text'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </Form.Group>
        <Button variant='outline-success' type='submit'>
          create
        </Button>
      </Form>
    </Container>
  )
}

const mapDispatchToProps = {
  setNotification,
  createBlog,
  initUsers,
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)
