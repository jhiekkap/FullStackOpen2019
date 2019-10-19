import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blogs = props => {
  const blogFormRef = React.createRef()

  const compare = (a, b) => (a.likes < b.likes ? -1 : a.likes > b.likes ? 1 : 0)

  return (
    <Container>
      <Row>
        <Col>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped>
            <tbody>
              {props.blogs.sort(compare).map(blog => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  setNotification,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
