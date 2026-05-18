import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, food_list, removeCart,getTotalAmount,url } = useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>items</p>
          <p>title</p>
          <p>price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, idx) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeCart(item._id)} className='cross'>X</p>
                </div>
                <hr/>
              </div>

            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-totals-details">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr/>
            <div className="cart-totals-details">
              <p>Delivery Fee</p>
              {getTotalAmount()>0?<p>${2}</p>:<p>${0}</p>}
            </div>
            <hr/>
            <div className="cart-totals-details">
              <b>Total</b>
              <b>${getTotalAmount()}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/Order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>PROMOCODE--&gt; ENTER IT HERE</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart