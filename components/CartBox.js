import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Image } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function CartOffCanvas({ show, handleClose }) {
  const [cartList, setCartList] = useAtom(cartListAtom);

  const handleDecrement = (index) => {
    const updatedCartList = [...cartList];
    updatedCartList[index].quantity -= 1;
    if (updatedCartList[index].quantity === 0) {
      updatedCartList.splice(index, 1);
    }
    setCartList(updatedCartList);
};

  return (
    <Offcanvas 
    show={show} 
    onHide={handleClose} 
    placement="end" 
    scroll={true} 
    backdrop={true} 


>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartList.length === 0 ? (
          <p>Shopping cart is empty</p>
        ) : (
          <>
            <div>
              {cartList.map((product, index) => (
                <div key={index} className="mb-2 d-flex align-items-center">
                {/* Image */}
                <div className="me-3" style={{ flex: '0 0 33.3333%' }}>
                  <Image
                    src={product.images[0]}
                    alt={product.brand}
                    thumbnail
                    style={{
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                {/* Name and Price */}
                <div className="flex-grow-1">
                  <div>
                  <strong style={{  whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.title} ({product.quantity})
                    </strong>
                    <br />
                    <span >${product.price.toFixed(2)}</span>
                    <strong></strong>
                  </div>
                </div>
                <span className='me-2' style={{  textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {`${(product.price * product.quantity).toFixed(2)}`}
</span>

                {/* Delete Button */}
                <Button variant="outline-danger" onClick={() => handleDecrement(index)} size="sm">
                  <FaTimes />
                </Button>
              </div>
              ))}
            </div>

            <hr />
            <h4 className="text-center">
              Total: ${cartList.reduce((total, prod) => total + prod.price * prod.quantity, 0).toFixed(2)}
            </h4>
          </>
        )}

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartOffCanvas;
