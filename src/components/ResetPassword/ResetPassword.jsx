import axios from 'axios'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const navigate =useNavigate()

    const validationSchema =yup.object().shape({
      email: yup.string().required("email is required").email("please enter a valid email address"),
      newPassword: yup.string().required("password is required").matches(/^[A-z1-9]{6,20}$/,'from 3 to 20 max'),
      
      })
  
      const formik = useFormik({
          initialValues: {
              email: '',
              newPassword:''
          },
  
          validationSchema:validationSchema,
  
          onSubmit: async function forgetPassword(values) {
              try{
                  const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
                  console.log(response);
                 if (response.statusText== 'OK') {
                    setTimeout(() => {
                      navigate('/login')
                    }, 1000);
                 }
              }catch(err){
                  console.log(err , 'Error');
              }
          }
  
      })
  
  
    return <>
  
   <form onSubmit={formik.handleSubmit} className='m-52 ' >
        <h1 className='text-2xl mb-2'>reset your account password</h1>
        <div className='space-y-6'>  
            <input onChange={formik.handleChange} type="email" name='email' id="email" aria-describedby="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
            <input onChange={formik.handleChange} type="password" name='newPassword' id="newPassword" aria-describedby="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password..." />
            <button type="submit" className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">reset password</button>
        </div>  
        </form>
  
    </>
}
