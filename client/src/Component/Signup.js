import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from './Alert';


export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const [alert, setAlert] = useState('')

  const submit = async (e) => {
    e.preventDefault();
    if (password === Cpassword) {
      await axios.post("http://localhost:9000/signup", {
        name: name,
        email: email,
        password: password
      })
        .then((res) => {
          localStorage.setItem('token', res.data);
          navigate('/')
        })
        .catch(e => { console.log(e) })
    }
    else {
      setAlert(<Alert color="danger" message="Please enter the correct password" />)
      setTimeout(() => {
        setAlert('')
      }, 3000);
    }

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
                <h3 className="card-title text-center mb-4">Sign Up</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} id="name" onChange={e => { setName(e.target.value) }} placeholder="Enter your name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} id="email" onChange={e => { setEmail(e.target.value) }} placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} id="password" onChange={e => { setPassword(e.target.value) }} placeholder="Enter your password" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={Cpassword} id="confirmPassword" onChange={e => { setCPassword(e.target.value) }} placeholder="Confirm your password" required />
                  </div>
                  <button onClick={submit} className="btn btn-custom w-100">Sign Up</button>
                </form>
                <Link to='/Login'>Already have an account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
