import { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';
import CartOffCanvas from './CartBox';
import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';




export default function MainNav() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  function submitForm(data, e) {
    e.preventDefault();
    const { searchField } = data;

    if (!searchField.trim()) {
      return;
    }
    

        router.push(`/store?search=${searchField}`);
    
  }

  // get count for cart
  const [cartList] = useAtom(cartListAtom);
  const totalCount = cartList.reduce((total, product) => total + product.quantity, 0);
 
// toggle 
  const toggleCart = () => setShowCart(prevState => !prevState); // Function to toggle cart visibility

  return (
    <>
      <Navbar key={router.pathname} className='fixed-top navbar navbar-dark bg-dark'>
        <Container>
          <Navbar.Brand>AO</Navbar.Brand>

          <Nav className="me-auto">
            {/* Hide home link and store link in small to medium screens */}
            <Link href="/" passHref legacyBehavior>
              <Nav.Link as="a" className={`navbar-link  ${router.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
            </Link>
            <Link href="/store" passHref legacyBehavior>
              <Nav.Link as="a" className={`navbar-link  ${router.pathname === '/store' ? 'active' : ''}`}>Store</Nav.Link>
            </Link>
          </Nav>

          <Form className="d-none d-md-flex me-2" onSubmit={handleSubmit(submitForm)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              {...register('searchField')}
            />
            <Button variant="success" type='submit'>Search</Button>
          </Form>

          <Nav>
            {/* Cart button */}
            <Button variant="primary" className='ms-2 ' onClick={toggleCart}>
              <FaShoppingCart />
              <span className="badge bg-secondary ms-2">{totalCount}</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <CartOffCanvas show={showCart} handleClose={toggleCart} /> {/* Render CartOffCanvas component */}
    </>
  );
}
