import React from 'react'
import {Card} from 'react-bootstrap';
import cardbg from '../assets/images/cardbg.avif'
const LogoCard = (props) => {
    const {title,logo} = props;
  return (
    <>
        <Card className="mx-4 " style={{ height: '10rem',backgroundImage:"../assets/images/cardbg.jpg" }}>
        <Card.Img src={cardbg} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className='text-black'><h3>{title}</h3></Card.Title>
      </Card.ImgOverlay>
            
        </Card>
    </>
  )
}

export default LogoCard