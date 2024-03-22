import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { cartListAtom } from '@/store';

export default function AddToCart({ product }) {
  const [cartList, setCartList] = useAtom(cartListAtom);

// Check if the product already exists in the cart
const existingProductIndex = cartList.findIndex((item) => item.title === product.title);



  const addToCart = () => {
    if (existingProductIndex !== -1) {
        const updatedCartList = [...cartList];
        updatedCartList[existingProductIndex].quantity += 1;
        setCartList(updatedCartList);
      } else {
        // Otherwise, add the product to the cart
        setCartList([...cartList, { ...product, quantity: 1 }]);
      }
  }

  return (
    <Button variant="primary"  onClick={addToCart} size="md" >Add to Cart</Button>
  );
}