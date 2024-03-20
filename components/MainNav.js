import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';

export default function MainNav() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  function submitForm(data, e) {
    e.preventDefault();
    const { searchField } = data;

    if (!searchField.trim()) {
      return;
    }
    router.push(`/`);
  }

  return (
    <Navbar key={router.pathname} expand="lg" className='fixed-top  navbar navbar-dark bg-dark'  >
        <Container >
          <Navbar.Brand>Abdirahman Osman</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link as="a" className={`navbar-link ${router.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
              </Link>
              <Link href="/store" passHref legacyBehavior>
                <Nav.Link as="a" className={`navbar-link ${router.pathname === '/store' ? 'active' : ''}`}>Store</Nav.Link>
              </Link>
             


            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
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
          <Link href="/" passHref legacyBehavior>
              <Nav.Link  className="navbar-link ms-5">
                <FaShoppingCart className='' />
                <span className="badge bg-secondary">1</span>
              </Nav.Link>
              </Link>
              </Nav>       
          </Navbar.Collapse>
        
        </Container>
        
      </Navbar>
  );
}
