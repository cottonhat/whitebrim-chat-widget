import React from 'react'
import './ProductCard.css'

const ProductCard = () => {
  return (
    <div className='rcw-message'>
      <div className='rcw-client'>
        <div className='card'>
          <header>Pele Branco/Ouro</header>

          <img
            src='https://whitebrim2.imgix.net/742f20ad-5b40-4b99-bc4d-f9c1d658a5ef.jpg?fm=jpg'
            alt='ERROR 404'
          />
          <span className='preco'>119.90 €</span>
          <div className='btn-section'>
            <button>Buy Now</button>
            <button>Add Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
