import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function BrandDetails() {
    const {id}= useParams()
    
    async function getAllBrandDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)   
    }
    let {data , isLoading} = useQuery({
        queryKey: ['brandDetails' , id ],
        queryFn: getAllBrandDetails,
        
    })

    const brandDetails = data?.data.data
    console.log(brandDetails,'brand details');
    
  return <>
  {isLoading ? 
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
        
        <div className="mx-auto mt-32 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={brandDetails.image} alt />
          <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brandDetails.name}</h5>
          </div>
        </div>


        }
  </>

}
