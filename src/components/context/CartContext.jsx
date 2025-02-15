import axios from 'axios';
import { createContext, useState } from 'react'
import toast from 'react-hot-toast';

export const CartContext = createContext()
export default function CartContextProvider({children}) {

  const [numOfCartItems,setNumOfCartItems] = useState()

  const [allProductItems,setAllProductItems] = useState([])

  const [totalCartPrice,setTotalCartPrice] = useState()

  const [cartId,setCartId] = useState()

    async function addToCart(productId) {
      try{
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        console.log(response);
        if (response.data.status == 'success') {
          toast.success('Cart added successfully')
          setNumOfCartItems(response.data.numOfCartItems)
        } 
      }catch(err){
        console.log(err);
      }
    }

    async function getProduct() {

      try{
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
          {headers:
            {token:localStorage.getItem('token')}
          })
          if (response.data.status == 'success') {

            setAllProductItems(response.data.data.products)            
            setNumOfCartItems(response.data.numOfCartItems)
            setCartId(response.data.cartId)
            setTotalCartPrice(response.data.data.totalCartPrice)
          }
      }
      catch(err){
        console.log(err);
      }
    }

    async function updataCartItem(id,count) {
     try{
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
        headers: {token:localStorage.getItem('token')}
      })
      if (response.data.status == 'success') {
        setAllProductItems(response.data.data.products)
        setTotalCartPrice(response.data.data.totalCartPrice)
      }
     }catch(err){
      console.log(err);
     }
    }

    async function deleteItem(id) {
      try{
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers: {token:localStorage.getItem('token')}})
       
        if (response.data.status == 'success') {
          setAllProductItems(response.data.data.products)
          setTotalCartPrice(response.data.data.totalCartPrice)
          setNumOfCartItems(response.data.numOfCartItems)
        }
      }  
      catch (err){
        console.log(err);
        
      }    
    }

    async function deleteCart() {

      try{
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers:
          { token: localStorage.getItem('token') }})

          console.log(response,'Success');
          
          if (response.data.message == 'success') {
            setNumOfCartItems(response.data.numOfCartItems)
            // setAllProductItems(response.data.data.products)
            // setTotalCartPrice(response.data.data.totalCartPrice)
          }

      }catch(err){
        console.log(err); 
      }

    }

  return <CartContext.Provider value={{addToCart, deleteCart, getProduct, setNumOfCartItems, updataCartItem,  deleteItem, cartId, numOfCartItems,  allProductItems, totalCartPrice,}}>
    {children}
  </CartContext.Provider>

}

