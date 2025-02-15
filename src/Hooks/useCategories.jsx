import axios from 'axios';
import { useQuery } from 'react-query';

export default function useCategories() {

    async function getAllCategories() {

        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        
      }
      let {data:catdata , isLoading:catIsLoading} = useQuery({
          queryKey: 'allCategories',
          queryFn: getAllCategories,
          refetchOnWindowFocus: false
        })
    
        const allCategoriesData = catdata?.data.data 
        console.log(allCategoriesData,'allCategoriesData');
        

  return {allCategoriesData , catIsLoading}
  
}
