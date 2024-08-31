import React, { useContext, useState } from 'react'
import './custom.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from './Alert'
import MainContext from '../Context/Maincontext'

export default function Login() {
    const main = useContext(MainContext)
    const { FetchUser, ViewCart, ViewWishlist } = main;
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const submit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:9000/login", {
            email: email,
            password: password
        })
            .then((res) => {
                // doing some validations improvement
                if (res.data.success === 'true') {
                    localStorage.setItem('token', res.data.token)
                    FetchUser()
                    ViewWishlist()
                    ViewCart()
                    navigate('/')
                }
                else {
                    setAlert(<Alert color="danger" message="Please Login with correct Credentials" />)
                    setTimeout(() => {
                        setAlert('')
                    }, 3000);
                }
            })
            .catch((e) => {
                console.log(e);
            })

    }
    return (
        <>
            <div className="position-relative">
                {alert}
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-3 mb-5 bg-body rounded">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Log in</h3>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={e => { setEmail(e.target.value) }} placeholder="Enter your email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={e => { setPassword(e.target.value) }} placeholder="Enter your password" required />
                                    </div>
                                    <button onClick={submit} className="btn btn-custom w-100">Login</button>
                                </form>
                                <Link to="/Signup" className="fs-9 text-center">Don't have Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
