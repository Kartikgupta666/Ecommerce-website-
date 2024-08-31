import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Maincontext from '../Context/Maincontext'


export default function Navbar() {
    const main = useContext(Maincontext)
    const navigation = useNavigate()
    const { find, User, ViewCart, ViewWishlist, CartItem, WishlistItem } = main
    const [item, SetItem] = useState("")
    const Search = async (e) => {
        e.preventDefault()

        await find(item);
        navigation('/searchresult')
        SetItem('')
    }

    const Cart = (e) => {
        e.preventDefault()
        if (localStorage.getItem('token')) {
            ViewCart();
        }
        navigation('/cart');
    }
    const wishlist = (e) => {
        e.preventDefault()
        if (localStorage.getItem('token')) {
            ViewWishlist();
        }
        navigation('/wishlist');
    }

    const Logout = () => {
        localStorage.removeItem('token');
        navigation("/Login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Kharridoo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>

                            {!localStorage.getItem('token') ? <li className="nav-item">
                                <Link to="/Login" className="nav-link " aria-disabled="true">Login</Link>
                            </li>
                                : <li className="nav-item">
                                    <Link to="/Login" className="nav-link" onClick={Logout} aria-disabled="true">Logout</Link>
                                </li>}
                            <li className="nav-item">
                                {!localStorage.getItem('token') ? <Link className="nav-link" to="#">Guest</Link> : <Link className="nav-link" to="#">{User.name}</Link>}
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={item} onChange={(e) => SetItem(e.target.value)} />
                            <button className="btn btn-outline-primary me-2" onClick={Search}><i className="fa-solid fa-magnifying-glass"></i></button>
                            <button className="btn btn-outline-primary me-2 position-relative" onClick={Cart} ><i className="fa-solid fa-cart-shopping"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{localStorage.getItem('token')?CartItem.length:"0"}</span></i></button>
                            <button className="btn btn-outline-primary me-2 position-relative" onClick={wishlist} ><i className="fa-solid fa-heart"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{localStorage.getItem('token') ? WishlistItem.length:"0"}</span></i></button>
                           
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
