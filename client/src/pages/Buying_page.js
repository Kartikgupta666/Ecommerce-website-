import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../Context/Maincontext';
import Address_form from '../Component/Address_form'
import CWcard from '../Component/CWcard'
const Buying_page = () => {
    const main = useContext(MainContext);
    const [Address, SetAddress] = useState([])
    const [display, Setdisplay] = useState('d-none')
    const Display = "d-none"
    const { User , findbyid , itembyid} = main;
    useEffect(() => {
        address()
        findbyid(sessionStorage.getItem('id'))
    }, [])
    const address = () => {

        // Retrieve the JSON string from localStorage
        const savedArray = localStorage.getItem("address");

        // Convert the JSON string back into a JavaScript array
        const myArray = savedArray ? JSON.parse(savedArray) : [];

        // Now, myArray contains the array from localStorage
        SetAddress(myArray)

    }
    const show = () => {
        Setdisplay('d-block')
        
    }
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        LOGIN
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Name : {User.name} </p>
                                        <p>Email : {User.email} </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Address
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        {
                                            localStorage.getItem('address') ? Address.map((item, index) => {
                                                return (
                                                    <div className="row" key={index}>
                                                        <div className="col-1">
                                                            <input type="radio" name="address" id="address" />
                                                        </div>
                                                        <div className="col-11">
                                                            {item.name} <i style={{ backgroundColor: "#FFFDD9", border: "1px solid #FFFDD0" }}>{item.addressType}</i>  <strong>{item.mobile}</strong>
                                                            <p>{item.address}
                                                                <br />
                                                                {item.state} - <strong>{item.pincode}</strong>
                                                            </p>
                                                        </div>
                                                    </div>

                                                );
                                            })
                                                :
                                                <Address_form />
                                        }
                                        <button button className='btn btn-outline-primary' onClick={show}>Add address</button>
                                        <Address_form display={display} />
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Order Summary
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <CWcard image={itembyid.image} title={itembyid.title} description={itembyid.description} sellername={itembyid.sellername} id={itembyid.id} display={Display } />
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                        Payment Option
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card" style={{ width: "25rem" }}>
                            <div className="card-header">
                                Featured
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">Price</li>
                                <li className="list-group-item">Discount</li>
                                <li className="list-group-item">Delivery Charges</li>
                                <li className="list-group-item">Total</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Buying_page
