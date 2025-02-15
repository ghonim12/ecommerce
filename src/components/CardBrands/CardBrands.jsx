import React from 'react'
import { Link } from 'react-router-dom'

export default function CardBrands(props) {

    let {image, _id, name } = props.product

  return <>
  
  <Link to={`/brandDetails/${_id}`}>
<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
    <img className="rounded-t-lg" src={image} alt={name} />
  <div className="p-5">
      <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
  </div>
</div>
  </Link>



  </>
}
