import React from 'react'
import AllOrderCard from '../AllOrderCard/AllOrderCard';

export default function OrderItems(props) {

    const orderItems = props.orders.cartItems


  return <>

  {orderItems.map((item)=> <AllOrderCard orders={item} key={item._id}/>)}
  </>
}
