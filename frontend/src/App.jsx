import { useEffect, useState } from 'react'
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import loadingGif from './assets/loading.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const [cartProductCount, setCartProductCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    setLoading(true);
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      }
    })
    const userData = await dataResponse.json();
    setLoading(false);

    if (userData.success) {
      dispatch(setUserDetails(userData.data));
    }
  }

  const fetchCartProductCounts = async() => {
    const dataResponse = await fetch(summaryApi.cartProductCount.url,{
      method : summaryApi.cartProductCount.method,
      credentials: 'include',
    })

    const responseCartProductCount = await dataResponse.json();
    

    if(responseCartProductCount.success){
      setCartProductCount(responseCartProductCount?.data?.count);
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchCartProductCounts();
  }, [])

  useEffect(() => {
    if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  },[darkMode]);


  if (loading) {
    return (
      <div className='w-full h-full flex fixed top-0 bottom-0 z-10 left-0 right-0 justify-center items-center bg-slate-200 bg-opacity-50'>
        <img src={loadingGif} alt="loading" />
      </div>
    )
  }
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // fetches user details 
        fetchCartProductCounts, // fetches cart product count
        cartProductCount, // cart product count variable
        darkMode, // variable that checks dark mode
        setDarkMode, // changes dark mode 
      }}>
        <ToastContainer
          autoClose={3000}
          position="top-center"
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />

        <Header />
        <main className='min-h-[calc(100vh-80px)] pt-20'>
          <Outlet />
        </main>
        <Footer />

      </Context.Provider>
    </>
  )
}

export default App
