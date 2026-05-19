import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Placeorder = () => {
  const {getTotalAmount,token,cartItems,food_list,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    country:"",
    zipcode:"",
    phone:""
  })
  const onChangehandler=(event)=>{
     const name=event.target.name;
     const value=event.target.value;
     setData((prev)=>({...prev,[name]:value}))
  }
  const placeOrder=async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
       if(cartItems[item._id]>0){
        let iteminfo=item;
        iteminfo["quantity"]=cartItems[item._id];
        orderItems.push(iteminfo)
       }       
    })
    const orderData={
        address:data,
        items:orderItems,
        amount:getTotalAmount()+2
     }
     let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url)
      }else{
        alert("error")
      }
  }
const navigate=useNavigate();

useEffect(()=>{
  if(!token){
    navigate('/cart')
  }else if(getTotalAmount()===0){
    navigate('/cart')
  }
},[token])

  return (
    <form onSubmit={placeOrder}className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input type="text" onChange={onChangehandler} value={data.firstName} name='firstName' placeholder='First Name' required/>
          <input type="text" onChange={onChangehandler} value={data.lastName} name='lastName' placeholder='Last Name' />
        </div>
        <input type="email" onChange={onChangehandler} value={data.email} name='email' placeholder='Email Address' required/>
        <input type="text" onChange={onChangehandler} value={data.street} name='street' placeholder='Street' required/>
        <div className="multi-fields">
          <input type="text" onChange={onChangehandler} value={data.city} name='city' placeholder='City' required/>
          <input type="text" onChange={onChangehandler} value={data.state} name='state' placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input type="text" onChange={onChangehandler} value={data.zipcode} name='zipcode' placeholder='Zip Code'required/>
          <input type="text"onChange={onChangehandler} value={data.country} name='country' placeholder='Country' required/>
        </div>
        <input type="text" maxLength='10'onChange={onChangehandler} value={data.phone} name='phone' placeholder='Phone'required/>
      </div>
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
