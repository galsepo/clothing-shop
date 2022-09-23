import { useContext } from 'react';
import { CartContext } from '../../contexts/card.context';
import { useNavigate } from 'react-router-dom';


import CartItem from '../cart-item/cart-item.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartDropdownContainer } from './cart-dropdown.styles.jsx';
import Checkout from '../../routes/checkout/checkout.component';


const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropdownContainer>
            <div className='cart-items'>
                {cartItems.map((item =>
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
};

export default CartDropdown;