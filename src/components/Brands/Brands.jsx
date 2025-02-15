import axios from "axios"
import { RotatingLines } from "react-loader-spinner"
import { useQuery } from "react-query"
import CardBrands from "../CardBrands/CardBrands"

// 
export default function Brands() {

  async function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  
  let {data,isLoading} = useQuery({
    queryKey: 'allProducts',
    queryFn: getAllBrands,
    refetchOnWindowFocus: false
  })
  const allBrandsData = data?.data.data
  console.log(allBrandsData, 'allBrands');
  

  return<>
  <h1 className="text-green-500 text-6xl text-center font-semibold mt-32">All Brands</h1>

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
        <div className=' mx-20 mt-10 '>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
            {allBrandsData?.map((prod)=> <CardBrands product={prod} key={prod._id} />)}
            </div>
          </div>
      }

  </>
}
// 