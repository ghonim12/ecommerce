import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function ForgetPassword() {

   const navigate =useNavigate()

  const validationSchema =yup.object().shape({
    email: yup.string().required("email is required").email("please enter a valid email address"),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },

        validationSchema:validationSchema,

        onSubmit: async function forgetPassword(values) {
            try{
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
                console.log(response);
               if (response.data.statusMsg== 'success') {
                setTimeout(() => {
                    navigate('/verify-Code')
                  }, 1000);
               }

            }catch(err){
                console.log(err);
            }
        }

    })


  return <>

 <form onSubmit={formik.handleSubmit} className='m-52'>
  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">please enter your verification code</label>
  <input onChange={formik.handleChange} type="email" name='email' id="email" aria-describedby="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." />
    <button type="submit" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Verify Code</button>
  </form>

  </>
}
