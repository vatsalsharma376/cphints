import React from 'react'
import {Card} from 'react-bootstrap';
const LogoCard = (props) => {
    const {title,logo,text} = props;
  return (
    <>
        <Card>
            <Card.Img variant="top" src={logo} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                {text}
                </Card.Text>
            </Card.Body>
            
        </Card>
    </>
  )
}

export default LogoCard