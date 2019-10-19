import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import Footer from './Footer'
import Blogs from './Blogs'
import Header from './Header'

const Home = props => {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>{props.user && <Blogs />}</Col>
      </Row>
      <Footer />
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
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
