import React, { useContext, useEffect } from 'react'
import CWcard from '../Component/CWcard'
import MainContext from '../Context/Maincontext';
import LoginFirst from '../Component/LoginFirst';
import Noitem from '../Component/Noitem';


export default function Cart() {
  const main = useContext(MainContext)
  const { CartItem, ViewCart } = main;

  useEffect(() => {
    if (localStorage.getItem('token')) { ViewCart() }

  }, [])



  return (
    <div className='container mt-5'>

      {!localStorage.getItem('token') ? <LoginFirst /> :

        (CartItem.length === 0 ? (<Noitem pages = "Cart" icon = "cart-shopping"/>) : CartItem.map((item, index) => (
          <CWcard key={index} title={item.title} description={item.description} image={item.image} id={item._id} />
        )))}
    </div>
  )
}
