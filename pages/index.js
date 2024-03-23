import Link from 'next/link';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CartOffCanvas from '@/components/CartBox';


export default function Home() {

  const [showCart, setShowCart] = useState(false);
  const toggleCart = () => setShowCart(prevState => !prevState); // Function to toggle cart visibility



  return (
    <>
    <div className="d-flex flex-column vh-100">
      <Container className="flex-grow-1">
        <header className="text-center mt-5">
          <h1>Welcome to Your Shopping Cart</h1>
        </header>
        <main>
          <Row className="mt-5">
            <Col>
              <section>
                <h2 className="text-center">Discover Latest Deals</h2>
                <p className="text-center">Explore our wide range of products and find amazing deals.</p>
                <div className="d-flex justify-content-center">
                  <Link href="/store" passHref>
                    <Button variant="primary">Shop Now</Button>
                  </Link>
                </div>
              </section>
            </Col>
            <Col>
              <section>
                <h2 className="text-center">Track Your Orders</h2>
                <p className="text-center">Keep track of your orders and manage your shopping cart easily.</p>
                <div className="d-flex justify-content-center">
                  
                    <Button variant="secondary" onClick={toggleCart}>View Cart</Button>
                  
                </div>
              </section>
            </Col>
          </Row>
        </main>
      </Container>
     
    </div>
          <CartOffCanvas show={showCart} handleClose={toggleCart} /> {/* Render CartOffCanvas component */}
</>
  );
}
