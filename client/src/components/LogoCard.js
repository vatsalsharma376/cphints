import React from 'react'
import {Card} from 'react-bootstrap';
import cardbg from '../assets/images/cardbg.avif'
import {Image,Col,Row} from 'react-bootstrap';
const LogoCard = (props) => {
    const {title,img,text,text1} = props;
    
  return (
    <>
        <Card className="mx-4 " style={{ height: '10rem',backgroundColor:"#05A5A5", borderBottom:'15px solid #fd866f' }} >
        {/* <Card.Img src={cardbg} alt="Card image" /> lg={3} mb={3} md={3} xs={3} sm={3}*/ }
      {/* <Card.ImgOverlay> */}
      <Row>
    <Col lg={4} mb={4} md={4} xs={4} sm={4} >  <Image src={img} className='d-inline-flex mt-4 ms-2 ' fluid style={{width:'80px', height:'80px'}} /></Col>
       <Col> <Card.Title className='text-white d-inline-flex ' style={{marginTop:'5%'}}><h3>{title}</h3></Card.Title>
        <Card.Text className='text-white '><h5><p>{text}</p></h5><h5><p>{text1}</p></h5></Card.Text></Col>
       
      {/* </Card.ImgOverlay> */}
      </Row> 
        </Card>
    </>
  )
}

export default LogoCard