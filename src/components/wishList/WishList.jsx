import { useContext } from 'react'
import { WishListContext } from '../context/WishListContext'
import { useEffect } from 'react'
import { CartContext } from '../context/CartContext'

export default function WishList() {

  const{getWishItems, deleteWishItems, allWishItems} = useContext(WishListContext)
 const {addToCart}= useContext(CartContext)


  useEffect(()=>{
    getWishItems()
  },[])

  return<>

  {allWishItems.length == 0 ? <h1 className='text-6xl font-semibold text-center mt-20'>My wish List Is Empty</h1> : <> 
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full mt-20 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3 ">
                <span>Image</span>
              </th>
              <th scope="col" className="px-6 py-3" >
                Product
              </th>
              <th scope="col" className="px-6 py-3" >
                Price
              </th>
              <th scope="col" className="px-6 py-3" >
                Action
              </th>
            </tr>
          </thead>
          <tbody className='w-full' >
            {allWishItems?.map((item)=>

              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.title} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {item.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${item.price}
              </td>
              <td className="px-6 py-4 space-x-5 ">
                <button onClick={()=>{deleteWishItems(item._id)}} className="text-white my-5 bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>
                <button onClick={()=>{addToCart(item._id)}} type="button" className="text-white my-5 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
              </td>
            </tr>
 
          )}

          </tbody>
        </table>
      </div>
  </>
  }

  </>
}
