// import { Container } from '@chakra-ui/react'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import code_editor from '../../assets/images/code_editor.png'
import { Container } from 'react-bootstrap'
const Landing = () => {
  return (
    <div>
      <Container style={{marginTop:"10%"}}>
        <Row>
          <Col className='mt-5'>
            <Row><h1 className='text-white'>Explore</h1></Row>
            <Row><h1 className='text-muted'>Contribute</h1></Row>
            <Row><h1 className='text-danger'>Help grow the community</h1></Row>

          </Col>
          <Col>
            <Image src={code_editor} fluid rounded/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Landing
