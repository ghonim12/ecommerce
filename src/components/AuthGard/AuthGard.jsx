
import { Navigate } from 'react-router-dom'

export default function AuthGard({children}) {
    const token = localStorage.getItem('token')
  return <>

    { token ? <Navigate to='/'/> : children }

  </>
  
}
