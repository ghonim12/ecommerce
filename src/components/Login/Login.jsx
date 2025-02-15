import axios from 'axios'
import { useFormik } from 'formik'
import  { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthContext } from './../context/AuthContext';
import { jwtDecode } from 'jwt-decode'

export default function Login() {

  let [msg,setMsg]=  useState(null);
  let [successMsg,setSuccessMsg]= useState(null);
  let [loading,setLoading]= useState(false);
  let navigate = useNavigate();
  let {setToken} = useContext(AuthContext)

  const validationSchema =yup.object().shape({
    email: yup.string().required("email is required").email("please enter a valid email address"),
    password: yup.string().required("password is required").matches(/^[A-z1-9]{6,20}$/,'from 3 to 20 max'),
    })

 const formik = useFormik({

  initialValues: {
 
    email: '',
    password: '',

  },

  onSubmit: async function login(values){
    setMsg(null)
    setSuccessMsg(null)
    setLoading(true)

    try{
      const responsive = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      setSuccessMsg(responsive.data.message);
      setToken(responsive.data.token)
      localStorage.setItem('token', responsive.data.token)
      const userId=jwtDecode(localStorage.getItem('token'))
      localStorage.setItem('userId', userId.id)

      setTimeout(() => {
        navigate('/verify-Code')
      }, 1000);

    }catch(err){
      setMsg(err.response.data.message)
    }finally{
      setLoading(false)
    }
  },

  validationSchema: validationSchema
 })

 return <>
  <form  onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10 m-20 ">

    <div className="relative z-0 w-full mb-5 group">
        <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email </label>
    </div>
    {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">Danger alert!</span> {formik.errors.email}
    </div> : null}

    <div className="relative z-0 w-full mb-5 group">
        <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} name="password" id="Password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    </div>
    {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">Danger alert!</span> {formik.errors.password}
    </div> : null}

    <div className='flex justify-between'>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loading ? "Loading..." : "submit"}
          </button>
          <Link to='/forget-password' >
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Forget Password</button>
          </Link>
    </div>
    {msg ? <div>{msg}</div>:null}
    {successMsg ? <div>{successMsg}</div>: null}
  </form>
</>
}