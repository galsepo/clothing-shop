import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartIconContainer } from './cart-icon.styles';

import { CartContext } from '../../contexts/card.context'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toogleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </CartIconContainer>

    );

};

export default CartIcon;