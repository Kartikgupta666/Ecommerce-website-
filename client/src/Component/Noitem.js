import React from 'react'

export default function Noitem(props) {
  return (
    <div>
          <h1 className='text-center border border-3 rounded-3 p-5'>You have <span style={{ color: "red" }}>No</span> items in the {props.pages} <i className={`fa-solid fa-${props.icon}`}></i> </h1>
    </div>
  )
}
