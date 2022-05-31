import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { CartContext } from "../../context/CartProvider";

const HeaderCartButton = ({ onClick }) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const { items } = useContext(CartContext);
  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  const btnClasses = `${classes["button"]} ${
    btnIsHighLighted ? classes["bump"] : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={classes["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes["badge"]}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
