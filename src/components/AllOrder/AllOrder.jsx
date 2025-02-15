import  { useContext, useEffect, useState } from 'react'
import { UserIdContext } from '../context/UserIdContext'
import axios from 'axios'
import OrderItems from '../AllOrderItems/OrderItems'

export default function AllOrder() {
    const {id}=useContext(UserIdContext)

    const [allOrder, setAllOrder]=useState()



    async function getUserAllOrder() {
        try{
         const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
         setAllOrder(response.data)  

        }catch(err){
         console.log(err)
        }
     }
    useEffect(()=>{
        getUserAllOrder()
    },[])



    
  return <>
  
{allOrder?.map((item)=> <OrderItems orders={item} key={item._id}/>)}


  </>
}
