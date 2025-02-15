import axios from 'axios'
import { useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext';

export default function ProductDetails() {

    const {addToCart} = useContext(CartContext)
    const {id}= useParams()
    
    async function getAllDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)   
    }
    let {data , isLoading} = useQuery({
        queryKey: ['productDetails' , id ],
        queryFn: getAllDetails,
        
    })

    const details = data?.data.data

  return <>
  {
    isLoading ? 
        <div className='w-full h-screen flex justify-center items-center bg-white'>
            <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>: 
        <div className='container'>
            <div className="grid grid-cols-6">
            <div className='col-span-2'>
                <img src={details?.imageCover} alt="product image"/>
            </div>

            <div className='col-span-4 mt-20'>
                <h1 className='text-3xl font-bold mb-5'>{details?.title}</h1>
                <p className='text-xl font-bold'>Description Product:</p>
                <p className='text-xl '>{details?.description}</p>
                <div className='flex mt-5'>
                    <p className='text-xl font-bold'>Price Product: </p>
                    <p className='text-xl ms-2'>{`${details?.price}$`}</p>
                </div>
                <button onClick={()=>{addToCart(id)}} type="button" className="text-white my-5 w-full bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">ADD TO CARD</button>
            </div>
        </div>
        </div>
  }
 
  </>
}
