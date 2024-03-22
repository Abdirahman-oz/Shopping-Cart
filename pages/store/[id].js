import { Container,Button} from 'react-bootstrap';
import AddToCart from '@/components/AddToCart';

import Link from 'next/link';

  export async function getStaticPaths() {

    let pathList = [];
  
    // pre-render and support product/1 through product/30 only
    for (let i = 1; i <= 30; i++) {
      pathList.push({ params: { id: i.toString() } })
    }
  
    return {
      paths: pathList,
      fallback: false
    }
  }

  export async function getStaticProps(context) {

    const res = await fetch(`https://dummyjson.com/products/${context.params.id}`)
    const data = await res.json()
  
    return { props: { staticProduct: data } }
  }





  export default function Post(props) {
    const { staticProduct } = props;
  
   


    return (
      <>
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="text-center">
            <h3>{staticProduct.title}</h3>
            <img
              src={staticProduct.images[0]}
              className="img-fluid"
              alt="Product"
              style={{ maxHeight: '400px' }}
            />
            <br />
            <br />
            {staticProduct.description}
            <br />
            <br />
            <strong>Brand:</strong> {staticProduct.brand}
            <br />
            <strong>Rating:</strong> {staticProduct.rating} / 5
            <br />
            <strong>Stock:</strong> {staticProduct.stock}
            <br />
            <br />
            <strong>${staticProduct.price.toFixed(2)}</strong>
            <br />
            <br />
            <Link href="/store">
              <Button variant="primary">Return to store</Button>
            </Link>
            &nbsp;&nbsp;
          {/* Call the AddToCart component here */}
          <AddToCart product={staticProduct} />
          
        </div>
        
      </Container>
      </>
    );
  }