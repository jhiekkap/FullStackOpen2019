import React from 'react'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import Notification from './Notification'
import { logout } from './../reducers/loginReducer'
import LoginForm from './LoginForm'
import { Link, withRouter } from 'react-router-dom'

const Header = props => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.logout()
    props.history.push('/')
  }

  console.log('UUSERI', props.user)
  console.log('UUSERIT', props.users)
  const padding = { padding: 5 }
  return (
    <Container>
      {props.user ? (
        <div>
          <Row>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='dark'>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/'>
                      blogs
                    </Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/users'>
                      users
                    </Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    {props.user && (
                      <Link style={padding} to={`/users/${props.user.id}`}>
                        {props.user.name} logged in
                      </Link>
                    )}
                  </Nav.Link>
                  {props.user && (
                    <Nav.Link href='#' as='span' onClick={handleLogout}>
                      <Link style={padding} to='/'>
                        logout{' '}
                      </Link>
                    </Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
          <Row>
            <Col>
              <h2>blog app</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Notification />
            </Col>
          </Row>
        </div>
      ) : (
        <Row>
          <Col>
            <LoginForm />
          </Col>
        </Row>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  setNotification,
  logout,
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
