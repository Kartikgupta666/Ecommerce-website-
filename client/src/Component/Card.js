import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../Context/Maincontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from '../Component/Alert'



export default function Card(props) {
    const navigate = useNavigate()
    const main = useContext(MainContext)
    const [icon, Seticon] = useState('regular')
    const [color, Setcolor] = useState('dark')
    const [AM, setAM] = useState('')
    const { findbyid, Wishlist } = main
    const getInfo = async () => {

        await findbyid(props.id)
        navigate('/itempage')

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (props.signal.id === props.id) {
                if (props.signal.signal === "true") {
                    changeColor()
                }
            }
        }
    }, [props.signal.id, props.signal.signal])

    const changeColor = () => {
        Seticon('solid')
        Setcolor('danger')
    }

    const wishlist = async () => {
        if (localStorage.getItem('token')) {
            if (props.signal === "true") {
                return;
            }
            else {
                await axios.get("http://localhost:9000/searchinwishlist", {
                    params: {
                        Item: props.id
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
                            Wishlist(props.id)
                            changeColor()
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
        else {
            setAM({ color: "danger", message: "please login first" })
            setTimeout(() => {
                setAM('')
            }, 3000);
        }

    }


    return (
        <>
            <Alert color={AM.color} message={AM.message} />

            <div className='col-lg-3 col-md-4 col-sm-6 col-6 mb-4'>

                <div className=" card" style={{ height: "570px" }} >
                    <img src={props.image} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title ">{props.title}</h5>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text fw-bold">{props.category}</p>
                        <div className=" d-flex justify-content-between flex-sm-row flex-column ">
                            <p className="fs-3">{props.price}/-</p>
                            <button className="btn d-flex fs-3" style={{ height: "43.6px", alignItem: "center" }} onClick={wishlist}><i className={`fa-${icon} fa-heart text-${color}`}></i></button>
                            <button className="btn btn-primary " style={{ "height": "43.6px" }} onClick={getInfo} >Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
