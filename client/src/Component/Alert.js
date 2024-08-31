import React from 'react'

export default function Alert(props) {
  return (
    <>
          <div className={`alert alert-${props.color} text-center col-md-2  position-absolute end-0 z-1 mt-5 mx-2 `} role="alert">
              {props.message}
          </div>
    </>
  )
}
