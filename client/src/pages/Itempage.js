import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../Context/Maincontext'
import axios from 'axios'
import Alert from '../Component/Alert'
import {useNavigate} from 'react-router-dom'
// import Buying_page from './Buying_page'

export default function Itempage() {
    const main = useContext(MainContext)
    const navigator = useNavigate()
    const { itembyid, findbyid, AddCart, Wishlist } = main
    const [icon, Seticon] = useState('regular')
    const [color, Setcolor] = useState('dark')
    const [AM, setAM] = useState('')

    useEffect(() => {
        // Make sure `findbyid` is called if necessary to fetch the item data
        if (!itembyid) {
            // console.log("reloaded")
            findbyid(sessionStorage.getItem('id'))
        }
        if (localStorage.getItem('token')) {
            Isinwishlist()
        }


    }, [findbyid, itembyid]);

    // fixing this end point work are remaining
    const ID = sessionStorage.getItem('id');
    const addCart = async () => {
        AddCart(ID)
    }
    const changeColor = () => {
        Seticon('solid')
        Setcolor('danger')
    }

    const Isinwishlist = async () => {
        await axios.get("http://localhost:9000/searchinwishlist", {
            params: {
                Item: sessionStorage.getItem('id')
            },
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.data.success === "true") {
                    changeColor()
                }
            })
            .catch(e => {
                console.log(e);
            });

    }


    const wishlist = async () => {
        if (localStorage.getItem('token')) {
            await axios.get("http://localhost:9000/searchinwishlist", {
                params: {
                    Item: sessionStorage.getItem('id')
                },
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
            })
                .then(res => {
                    if (res.data.success === "true") {
                        changeColor()
                    }
                    else {
                        Wishlist(sessionStorage.getItem('id'))
                        changeColor()
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
        else {
            setAM({ color: "danger", message: "please login first" })
            setTimeout(() => {
                setAM('')
            }, 3000);
        }
    }

    const Buying_page = () => {
        navigator("/buying")
    }

    return (
        <>
            <Alert color={AM.color} message={AM.message} />

            <div className="container mt-5">
                <div className="row ">
                    <div className="col-sm ">
                        <img src={itembyid.image} className='img-fluid' alt="" />
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            <h2>{itembyid.title}</h2>
                            <button className='btn fs-2 d-flex' style={{ alignItem: "center" }} onClick={wishlist}><i className={`fa-${icon} fa-heart text-${color}`}></i></button>
                        </div>

                        <h3><i className="fa fa-inr" aria-hidden="true"></i> {itembyid.price}</h3>
                        {/* <p className='fs-6 fw-bold'>Available offers</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Lorem ipsum dolor sit amet.</li>
                        </ul> */}
                        <p className='fw-bold'> Description</p>
                        <p className='fs-6'>{itembyid.description}</p>
                        <div className="d-flex gap-3 justify-content-center mt-5">
                            <button className='btn btn-warning fs-4 py-3 px-4' onClick={addCart}>Add to Cart</button>
                            <button className='btn btn-success fs-4 py-3 px-4' onClick={Buying_page} >Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
