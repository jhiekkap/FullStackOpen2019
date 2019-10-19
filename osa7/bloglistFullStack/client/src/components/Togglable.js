import React, { useState, useImperativeHandle } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Container>
      <Row>
        <Col style={hideWhenVisible}>
          <Button
            style={{ margin: '0 0 10px 0' }}
            variant='outline-primary'
            onClick={toggleVisibility}
          >
            {props.buttonLabel}
          </Button>
        </Col>
        <Col style={showWhenVisible}>
          {props.children}
          <Button
            style={{ marginLeft: '15px', marginTop: '3px' }}
            variant='outline-danger'
            onClick={toggleVisibility}
          >
            cancel
          </Button>
        </Col>
      </Row>
    </Container>
  )
})

export default Togglable
