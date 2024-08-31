import React, { useEffect, useState } from 'react'
import Maincontext from './Maincontext'
import axios from 'axios'

export default function Mainstates(props) {
    const URL = "http://localhost:9000";
    const [result, setResult] = useState([])
    const [itembyid, setItembyid] = useState('')
    const [User, setUser] = useState('')
    const [CartItem, setCartItem] = useState([])
    const [WishlistItem, setWishlistItem] = useState([])
    const [Feedback, setFeedback] = useState([])


    useEffect(() => {
        if (localStorage.getItem('token')) {
            FetchUser();
            ViewCart();
            ViewWishlist();
            
        };
    }, [])

    // this function is to find the data form the database
    const find = async (item) => {

        await axios.get(`${URL}/SearchItem`, {
            params: { query: item.toLowerCase() },
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                setResult(res.data.item)

            }).catch((e) => {
                console.log(e)
            })

    }


    // getting info of the item by id

    const findbyid = async (id) => {
        // updating id of the product in the session storage for refetching the item
        sessionStorage.setItem('id', id);
        const ID = sessionStorage.getItem('id');
        await axios.post(`${URL}/id`, {
            id: ID
        })
            .then((res) => {
                setItembyid(res.data);
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const FetchUser = async () => {
        await axios.post(`${URL}/getUserDetails`, {}, {
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token')
            }
        }).then((res) => {
            setUser(res.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const AddCart = async (ID) => {

        await axios.post(`${URL}/Addcart`,
            { id: ID },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
            .then((res) => {
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
        ViewCart()
    }

    const ViewCart = async () => {
        await axios.get(`${URL}/ViewCart`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
            .then((res) => {
                // console.log(res.data)
                const cart = res.data
                setCartItem(cart)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const removeCart = async (ID) => {
        await axios.post(`${URL}/removeCart`, { id: ID })
            .then((res) => {
                setFeedback(res.data)
            })
            .catch(e => {
                console.log(e)
            })
        const newCart = CartItem.filter((CartItem) => { return CartItem._id !== ID })
        setCartItem(newCart)
    }

    const Wishlist = async (ID) => {
        await axios.post(`${URL}/Wishlist`,
            { id: ID },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            })
        ViewWishlist()
    }

    const ViewWishlist = async () => {
        await axios.get(`${URL}/Viewwishlist`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
            .then((res) => {
                // console.log(res.data)
                const wishlist = res.data
                setWishlistItem(wishlist)
            })
            .catch(e => {
                console.log(e)
            })
    }


    const removeWishlist = async (ID) => {
        await axios.post(`${URL}/removeWishlist`, { id: ID })
            .then((res) => {
                setFeedback(res.data)
            })
            .catch(e => {
                console.log(e)
            })
        const newWishlist = WishlistItem.filter((WishlistItem) => { return WishlistItem._id !== ID })
        setWishlistItem(newWishlist)
    }

    return (
        <Maincontext.Provider value={{ find, result, findbyid, itembyid, User, FetchUser, AddCart, ViewCart, CartItem, URL, removeCart, Feedback, Wishlist, WishlistItem, ViewWishlist, removeWishlist }}>
            {props.children}
        </Maincontext.Provider>
    )
}
