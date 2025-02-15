import Navbar from '../Navbar/Navbar'
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
    <Navbar/>
<div className='mt-96 md:mt-20'>
<Outlet/>
</div>
    
    <Footer/>
    </>
  )
}
