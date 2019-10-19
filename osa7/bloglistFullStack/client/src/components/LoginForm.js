import React from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import { useField } from './../hooks/index'
import loginService from './../services/login'
import blogService from './../services/blogs'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import { login } from './../reducers/loginReducer'

const LoginForm = props => {
  const username = useField('text')
  const password = useField('password')

  const omitReset = customHook => {
    const { reset, ...shorterHook } = customHook
    return shorterHook
  }

  const inputUsername = omitReset(username)
  const inputPassword = omitReset(password)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(
        'LOCALSTORAGE AFTER LOGIN: ',
        window.localStorage.getItem('loggedBlogAppUser')
      )
      props.login(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification(false, ' wrong username or password')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>Log in to application</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='username'
                placeholder='username'
                {...inputUsername}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                {...inputPassword}
              />
            </Form.Group>
            <Button variant='outline-primary' type='submit'>
              login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

/* LoginForm.propTypes = {
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
 */

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  setNotification,
  login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
