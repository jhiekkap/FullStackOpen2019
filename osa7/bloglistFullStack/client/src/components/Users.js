import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import Header from './Header'
import { Link } from 'react-router-dom'

const Users = props => {
  const UserList = () => {
    return (
      props.users && (
        <Table>
          <tbody>
            <tr>
              <td />
              <td>Blogs created</td>
            </tr>
            {props.users.map(user => (
              <tr key={user.id}>
                <td>
                  {' '}
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserList />
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = {
  /* removeBlog,
  likeBlog */
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
