import React, { useState } from 'react'

export default function AllOrderCard(props) {
    console.log(props , 'AllOrderCard');

  return<>

   <div className="w-full p-20  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
    <img className="p-8 h-[300px] rounded-t-lg" src={props.orders.product.imageCover} alt="product image" />
  <div className="px-5">  
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Title: {props.orders.product.title} </h5>
    <div className=" items-center space-x-10 ">
      <span className="text-2xl font-semibold text-gray-900 dark:text-white">Price: {props.orders.price}$</span>
      <span className="text-2xl font-semibold text-gray-900 dark:text-white">Count: {props.orders.count}$</span>
    </div>
  </div>
</div>

  </>
}