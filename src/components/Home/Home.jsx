import Card from '../Card/Card'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import slider1 from '../../assets/images/slider-image-1.jpg'
import slider2 from '../../assets/images/slider-image-2.jpg'
import slider3 from '../../assets/images/slider-image-3.jpg'
import blog1 from '../../assets/images/blog-img-1.jpg'
import blog2 from '../../assets/images/blog-img-2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import useCategories from '../../Hooks/useCategories'

export default function Home() {

  const {allCategoriesData } = useCategories()



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
  
<div className='p-5'>
    {/* slider 1  */}
    <div className='grid grid-cols-6 pb-5 ms-60'>
      <div className='col-span-3 ' > 

        <Swiper slidesPerView={1} loop={true} >

          <SwiperSlide>
            <img src={slider1} className='w-full h-screen block ' alt="Description of the first image" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={slider2} className='w-full h-screen block ' alt="Description of the second image" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={slider3} className='w-full h-screen block ' alt="Description of the second image" />
          </SwiperSlide>

        </Swiper>
      </div>
      <div className='col-span-3 '> 
        <img src={blog1} alt='' className='h-1/2' />
        <img src={blog2} alt='' className='h-1/2' />
      </div>
    </div>
  {/* slider 1  */}
  
  {/* slider 2  */}
    <div className='text-2xl mb-3'>
      <h4>Shop Popular Categories</h4>
    </div>
  <Swiper slidesPerView={5} loop={true} >
    {allCategoriesData?.map((cat)=>{
      return <SwiperSlide key={cat._id}>
        <img src={cat.image} className='w-full h-[300px]' alt="" />
        <div>{cat.name}</div>
      </SwiperSlide>
    })}
  </Swiper>
  {/* slider 2  */}
  </div>

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
    <>
    <div className='container mt-5 '>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allProductData?.map((prod)=> <Card product={prod} key={prod._id} />)}
        </div>
      </div></>
  }
    
  </>
}