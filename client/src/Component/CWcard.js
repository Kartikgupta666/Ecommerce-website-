import React, { useState, useContext } from 'react'
import {useLocation} from 'react-router-dom'

import MainContext from '../Context/Maincontext'


export default function CWcard(props) {

    const main = useContext(MainContext);
    let location = useLocation()
    const { removeCart , removeWishlist} = main;
    const [count, setCount] = useState(1);
    const increase = () => {
        setCount(count + 1)
        
    }
    const decrease = () => {

        setCount(count - 1)
    }


    return (
        <>
            <div className="card p-5 ">
                <div className="d-flex">
                    <img src={props.image} height={112} width={112} alt="" />

                    <div className="card-body">
                        <h3>{props.title}</h3>
                        <p>{props.description}</p>
                        <p>seller : {props.sellername}</p>
                        {/* counter */}
                        <div className="d-flex gap-2">
                            <button className="border border-1 rounded-circle fs-5" onClick={decrease} disabled={count === 1}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                            <input type="number" className='text-center ' value={count} id="" disabled style={{ "width": "45px" }} />
                            <button className='border border-1 rounded-circle fs-5' onClick={increase}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                            {/* <button style={{ "border": "transparent", "backgroundColor": "transparent" }}>{"Save for later".toUpperCase()}</button> */}
                            <button className={`${props.display}`} style={{ "border": "transparent", "backgroundColor": "transparent" }} onClick={()=>{location.pathname === "/cart" ? removeCart(props.id): removeWishlist(props.id)}}>{"Remove".toUpperCase()}</button>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}
