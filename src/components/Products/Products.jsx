import axios from "axios"
import { RotatingLines } from "react-loader-spinner"
import { useQuery } from "react-query"
import Card from "../Card/Card"

export default function Products() {
  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  
  let {data,isLoading} = useQuery({
    queryKey: 'allProducts',
    queryFn: getAllProducts,
    refetchOnWindowFocus: false
  })
  const allProductData = data?.data.data

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
      <div className=' m-20 '>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allProductData?.map((prod)=> <Card product={prod} key={prod._id} />)}
          </div>
        </div>
    }
      
  </>
}