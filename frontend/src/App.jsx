import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from './contexts/UserContext';
import CartContext from './contexts/CartContext';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { getUser, getJwt } from './services/userServices';
import setAuthToken from './utils/setAuthToken';
import { addToCartAPI, getCartAPI } from './services/cartServices';
import 'react-toastify/dist/ReactToastify.css';
setAuthToken(getJwt())

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now >=  jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser) 
      }
    } catch (error) {
      // Can navigate to login page as per scenario
    }
  }, [])
  const addToCart =  (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.product._id == product._id)
    if (productIndex == -1) {
      updatedCart.push({product: product, quantity: quantity})
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart)
    addToCartAPI(product._id, quantity).then(res => {
      console.log("res", res.data)
      toast.success("Product added successfully!")
    }).catch(err => {
      console.log("err", err)
      toast.error("Failed to add product!")
      setCart(cart)
    })
  } 
  const getCart = () => {
    getCartAPI().then(res => {
      setCart(res?.data)
    }).catch(err => {
      toast.error("Somthing went wrong!")
    })
  }
  useEffect(() => {
    if (user) {
      getCart()
    }
  }, [user])
  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{cart, addToCart}}>
        <div className='app'>
          <Navbar/>
          <main>
            <ToastContainer position='bottom-right'/>
            <Routing/>
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App