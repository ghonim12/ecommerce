
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import ProductDetails from './components/ProductDetails/ProductDetails';
import AuthContextProvider from './components/context/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Error from './components/Error/Error';
import Guard from './components/Guard/Guard';
import AuthGard from './components/AuthGard/AuthGard';
import CartContextProvider from './components/context/CartContext';
import WishList from './components/wishList/WishList';
import BrandDetails from './components/BrandDetails/BrandDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './components/context/WishListContext';
import Order from './components/Order/Order';
import AllOrder from './components/AllOrder/AllOrder';
import UserIdContextProvider from './components/context/UserIdContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';

const queryClient = new QueryClient()

const routes = createBrowserRouter([
  {
    path:'', element:<Layout/>,children:
    [
      {index:true, element:<Guard><Home/></Guard> },
      {path:'cart', element:<Guard><Cart/></Guard>},
      {path:'brands', element:<Guard><Brands/></Guard>},
      {path:'products', element:<Guard><Products/></Guard>},
      {path:'wishList', element:<Guard><WishList/></Guard>},
      {path:'categories', element:<Guard><Categories/></Guard>},
      {path:'order', element:<Guard><Order/></Guard>},
      {path:'allorders', element:<Guard><AllOrder/></Guard>},
      {path:'details/:id', element:<Guard><ProductDetails/></Guard>},
      {path:'brandDetails/:id', element:<Guard><BrandDetails/></Guard>},
      {path:'login', element: <AuthGard><Login/></AuthGard>},
      {path:'forget-password', element: <AuthGard><ForgetPassword/></AuthGard>},
      {path:'verify-Code', element: <AuthGard><VerifyCode/></AuthGard>},
      {path:'Reset-Password', element: <AuthGard><ResetPassword/></AuthGard>},
      {path:'register', element: <AuthGard><Register/></AuthGard>},
      {path:'*', element:<Error/>},
    ]
  }
])
export default function App() 
{
  return <>
    <AuthContextProvider> 
      <UserIdContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={routes} />
              <Toaster position='top-right' />
            </QueryClientProvider>
          </WishListContextProvider>
        </CartContextProvider>
      </UserIdContextProvider>
    </AuthContextProvider>
  </>
  
}