
import useCategories from '../../Hooks/useCategories'

export default function Categories() {

  const {allCategoriesData} = useCategories()
  
  return <>
  <div className='container'>
    <div className=" mt-16">
      <div className='grid grid-cols-3 gap-5  '>
      {allCategoriesData?.map((cat)=>{
        return <div className='hover:shadow-xl hover:shadow-lime-600 border border-solid rounded-md transition-all ' key={cat._id}>
          <img src={cat.image} className='w-full h-[500px] ' alt="" />
          <div className='text-center'>{cat.name}</div>
        </div>
      })}
      </div>
    </div>
  </div>
  </>
}