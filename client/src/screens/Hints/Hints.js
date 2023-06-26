import React from 'react'
import NavBar from "../../components/Navbar";
import { Container, Row } from 'react-bootstrap';
import HintPanel from './HintPanel';
const Hints = () => {
  const arr = Array(10).fill(0);
  return (
    <div style={{backgroundColor:"#0F131A"}}>
    <div>
        <NavBar bg="black"/>
        <h1>Hints</h1>
        <h3> Question Link</h3> 
        <h3>Platform</h3>
        <Container >
          <Row>
            {arr.map(()=><HintPanel bgColor="#1A1D24"/>)}
            </Row>

        </Container>
    </div>
    </div>
  )
}

export default Hints