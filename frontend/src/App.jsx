import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import { useEffect } from 'react';
import Context from './context/index.js'
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice.js';

function App() {

  const dispatch = useDispatch();
  const fetchUserDetails = async() => {
    const dataResponse = await fetch(summaryApi.currentUser.url,{
      method : summaryApi.currentUser.method,
      credentials : "include",
      headers : {
        "content-type" : "application/json",
      },
    })
    const userData = await dataResponse.json();
    if (userData.success) {
      dispatch(setUserDetails(userData.data));
    }
  }


  useEffect(() => {
    fetchUserDetails();
  })
  return (
    <>
    
    <Context.Provider value={{
      fetchUserDetails
    }}>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-160px)]'>
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  )
}

export default App
