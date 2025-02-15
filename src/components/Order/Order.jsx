import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Order() {

    const [paymentWay,setPaymentWay] = useState()
    const {cartId, setNumOfCartItems} = useContext(CartContext)
    const navigate = useNavigate()


    function handelSubmit(values) {
        console.log(values)
        if (paymentWay=='cash') {
            cashOrder(values)
        }else if (paymentWay == 'visa') {
            visaOrder(values)
        }    
    }
    async function cashOrder(values) {
        try{
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
                headers:{
                    token:localStorage.getItem('token')
                }
            }) 
            console.log(response)
            if (response.data.status == "success") {
                toast.success('Order cash successfully')
                setNumOfCartItems(0)
                navigate("/")

            }
        }catch(err)
        {
            console.log(err)
        }
    }

    async function visaOrder(values) {
        try{
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values, {
                headers: {
                    token:localStorage.getItem('token')
                }
            })
            
            
            window.open(response.data.session.url,"_blank");
        }catch(err){
            console.log(err);    
        }

    }

    const formik = useFormik({
        initialValues: {
        shippingAddress:{
            details: '',
            phone: '',
            city: ''
        }},
        onSubmit:handelSubmit
       })
  return <>
  
  <form  onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10 m-20 ">

<div className="relative z-0 w-full mb-5 group">
    <input type="text" onChange={(e)=>formik.setFieldValue("shippingAddress.details",e.target.value)}  name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details </label>
</div>

<div className="relative z-0 w-full mb-5 group">
    <input type="tel" onChange={(e)=>formik.setFieldValue("shippingAddress.phone",e.target.value)} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
</div>

<div className="relative z-0 w-full mb-5 group">
    <input type="text" onChange={(e)=>formik.setFieldValue("shippingAddress.city",e.target.value)} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City </label>
</div>

  <div className='flex justify-between'>
    <button onClick={()=>setPaymentWay("cash")} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Cash Order</button>
    <button onClick={()=>setPaymentWay("visa")} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Visa Order</button>
  </div>
</form>

  </>
}
