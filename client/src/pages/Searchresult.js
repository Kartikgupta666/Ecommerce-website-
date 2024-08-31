import React, { useContext } from 'react'
import Card from '../Component/Card'
import Maincontext from '../Context/Maincontext'
export default function Searchresult() {
    const main = useContext(Maincontext)
    const { result } = main
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    {result.map((result, index) =>
                        < Card key={index} title={result.title} image={result.image} description={result.description} category={result.category} price={result.price} />
                    )}
                </div>
            </div>
        </>
    )
}
