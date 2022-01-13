import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/index';

const CartButton = (props) => {

  const dispatch = useDispatch()

  const qty = useSelector((state) => state.cartContent.totalQuantity)

  const toggleCart = () => {
    dispatch(cartActions.toogle())
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{qty}</span>
    </button>
  );
};

export default CartButton;
