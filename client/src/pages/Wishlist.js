import React, { useContext, useEffect } from 'react'
import CWcard from '../Component/CWcard'
import MainContext from '../Context/Maincontext';
import LoginFirst from '../Component/LoginFirst';
import Noitem from '../Component/Noitem';


export default function Wishlist() {
  const main = useContext(MainContext)
  const { WishlistItem, ViewWishlist } = main;

  useEffect(() => {
    if (localStorage.getItem('token')) { ViewWishlist() }

  }, [])
  return (
    <div className='container mt-5'>
      {!localStorage.getItem('token') ? <LoginFirst /> :

        (WishlistItem.length === 0 ? (<Noitem pages="Wishlist" icon="heart" />) : WishlistItem.map((item, index) => (
          <CWcard key={index} title={item.title} description={item.description} image={item.image} id={item._id} />
        )))}
    </div>
  )
}
