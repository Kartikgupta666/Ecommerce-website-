import React, { useEffect, useState } from 'react'
import Card from '../Component/Card'
import axios from 'axios'


export default function Home() {

  useEffect(() => {
    fetch()
  }, [])


  const [item, setitem] = useState([])
  const [signal, setSignal] = useState([])
  useEffect(() => {
    if (item.length > 0) {
      IsinWishlist();
    }
  }, [item]);

  const fetch = async () => {
    await axios.get('http://localhost:9000/Items')
      .then((res) => {

        setitem(res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const IsinWishlist = async () => {
    if (localStorage.getItem('token')) {
      for (let index = 0; index < item.length; index++) {
        let element = item[index];
        await axios.get("http://localhost:9000/searchinwishlist", {
          params: {
            Item: element._id
          },
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
          }
        })
          .then(res => {
            if (res.data.success === "true") {
              // console.log(res.data)
              setSignal({ signal: res.data.success, id: res.data.item.item_id })
            }

          })
          .catch(e => {
            console.log(e);
          });
      }
    }
    
  }


  return (
    <div className="container mt-5 ">
     
      <div className='row '>
        {
          item.map((item, index) => {
            return (<Card key={index} title={item.title} description={item.description} price={item.price} category={item.category} image={item.image} id={item._id} signal={signal} />)
          })
        }
      </div>
    </div>
  )
}
