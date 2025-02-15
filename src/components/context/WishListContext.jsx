import axios from 'axios';
import { createContext, useState } from 'react'


export const WishListContext = createContext()
export default function WishListContextProvider({children}) {

     const [allWishItems,setAllWishItems] = useState([])

    async function addWishList(productId) {
        try{
          const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
            headers:{
              token:localStorage.getItem('token')
            }
          })
          if (response.data.status == 'success') {

            setAllWishItems(response.data.data)            
          }
        }catch(err){
          console.log(err);
        }
      }

      async function getWishItems() {
        try{
          const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {headers:
              {token:localStorage.getItem('token')}
            })
            console.log(response.data);
            
            if (response.data.status == 'success') {
                setAllWishItems(response.data.data)            
              }
        }
        catch(err){
          console.log(err);
        }
      }

      async function deleteWishItems(id) {
        try{
          const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers: 
          {
            token:localStorage.getItem('token')
          }})
          if (response.data.data.status == "success") {
            setAllWishItems(response.data.data)            
          } 
        console.log(response, 'deleteWishList');
        }  
        catch (err){
          console.log(err); 
        }    
      }

  return  <WishListContext.Provider value={{addWishList,deleteWishItems, getWishItems, allWishItems}}>
      {children}
    </WishListContext.Provider>
}
