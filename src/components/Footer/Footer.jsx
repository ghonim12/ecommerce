import image1 from '../../assets/images/amazon-pay.png';
import image2 from '../../assets/images/American-Express-Color.png';
import image3 from '../../assets/images/get-apple-store.png';
import image4 from '../../assets/images/get-google-play.png';
import image5 from '../../assets/images/mastercard.webp';
import image6 from '../../assets/images/paypal.png';

export default function Footer() {
  return <>

  <footer className='bg-gray-300 py-10 px-5 mt-5'>

    <div className="footer-text">
      <h5 className='font-semibold text-3xl'>Get the FreshCart app</h5>
      <p className='text-[#6b728080]'>We will send you a link, open it on your phone to download the app.</p>
    </div>

    <div className="footer-input lg:grid lg:grid-cols-12 my-5 ">

      <div className="mb-6 lg:col-span-10">
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email .. " />
      </div> 

      <div className="lg:col-span-2  ms-10">
        <button type="button" className="text-base w-full lg:px-5 focus:outline-none text-white bg-green-800 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share App Link</button>
      </div>

    </div>

    <div className='xl:flex '>
    <div className="lg:flex md:w-1/2 items-center flex-row py-7 space-x-6 ">
    
    <h5 className="text-gray-600 m-5 text-6xl lg:text-3xl">Payment Partners</h5>
 
    <div className='flex items-center w-[110px] mx-auto lg:w-[110px] flex-row cursor-pointer space-x-3'>
        <img className='rounded-xl' src={image1} alt="amazon" />
        <img className='rounded-xl' src={image2} alt="American Express" />
        <img className='rounded-xl' src={image5} alt="master Card" />
        <img className='rounded-xl' src={image6} alt="pay pal" />
    </div>

  </div>

  <div className="ms-15 xl:m-0 lg:flex  items-center space-x-5 ">
    <h5 className="text-gray-600 text-4xl lg:text-3xl">Get deliveries with FreshCart</h5>

    <div className="w-[110px] flex  cursor-pointer mt-5 lg:w-[130px]">
      <img className='w-full' src={image3} alt="App Store" />
      <img className='w-full' src={image4} alt="Google play" />
    </div>

  </div>
    </div>

  </footer>
  
  </>
}
