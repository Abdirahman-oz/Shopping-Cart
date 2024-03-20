import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function ProductBox({ product }) {
    return (
        <Card style={{ width: '18rem' }}>
           <Card.Img 
  variant="top" 
  src={product.images[0]} 
  style={{ 
    width: "100%", 
    height: "200px", 
    objectFit: "contain",
    margin: "auto", 
    display: "block", 
  }} 
/>

            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    {product.description}
                    <br />
                    <br />
                    <strong>${product.price.toFixed(2)}</strong>
                </Card.Text>
                <div className="d-flex justify-content-center">
                    <Link href={`/product/${product.id}`} passHref className='me-2'>
                        <Button variant="primary" size="sm">View Details</Button>
                    </Link>
                    <Link href={`/cart/add/${product.id}`} passHref>
                        <Button variant="secondary" size="sm">Add to Cart</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductBox;
