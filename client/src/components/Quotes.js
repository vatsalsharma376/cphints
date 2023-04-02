import Card from 'react-bootstrap/Card';
// import quotes icon from react-bootstrap-icons
import { Quote } from 'react-bootstrap-icons';
function Quotes() {
  return (
    <Card style={{height:"100%",width:"50%",margin:"auto"}}>
      <Card.Body>
      <Quote size={50}/>

        <blockquote className="blockquote mb-0">
          <p>

            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            Someone famous in   <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default Quotes;