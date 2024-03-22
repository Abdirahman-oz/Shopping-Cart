import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import AddToCart from './AddToCart';
function ProductBox({ product }) {
    return (
        <Card style={{ width: '18rem' }} >
           <Card.Img 
  variant="top" 
  src={product.images[0]} 
  style={{ 
    width: "100%", 
    height: "200px", 
    objectFit: "contain",
    marginTop: "1em", 
    display: "block", 
  }} 
/>

            <Card.Body className=' text-center'>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text >
                    {product.description}
                    <br />
                    <br />
                    <strong >${product.price.toFixed(2)}</strong>
                </Card.Text>
                <div className="">
                    <Link href={`/store/${product.id}`} passHref className='me-2'>
                        <Button variant="primary" size="md">View Details</Button>
                    </Link>
                    
                    <AddToCart product={product} />
                    
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductBox;
