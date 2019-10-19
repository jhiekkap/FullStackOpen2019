import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from './Header'
import { Link } from 'react-router-dom'

const User = props => {
  console.log('USER:', props.user)
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>{props.user && props.user.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>added blogs</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {props.user.blogs &&
              props.user.blogs.map(blog => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default User
