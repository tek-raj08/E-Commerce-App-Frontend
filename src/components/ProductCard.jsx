import React from 'react'
import { useCart } from '../Context/CartContext'
import { Link } from 'react-router-dom'
import { useAlert } from '../Context/AlertContext'

function ProductCard({product}) {
    const {name, originalPrice, discountPrice, discountPercent, imgUrl} = product
    const {cart, wishList, addToCart, addToWishList, removeFromCart, removeFromWishList} = useCart()
    const {showAlert} = useAlert()

    const isInCart = cart.some((item) => item._id === product._id)
    const isInWishList = wishList.some((item) => item._id === product._id)
  return (
    <div className='card mb-4'>
      <Link to={`/products/${product._id}`}>
      <img src={imgUrl} alt={name} style={{ height: '250px', objectFit: 'cover', width: "100%" }} />
      </Link>
      <div className='card-body'>
        <h5  className="card-title">{name}</h5>
        <p className="mb-1 fw-bold">${discountPrice} <span className="text-muted text-decoration-line-through ps-2">₹{originalPrice}</span></p>
        <p className="text-secondary mb-2 fw-bold">{discountPercent}% off</p>
        <div className="d-grid gap-2">
          {isInCart ? (
            <button className="btn btn-outline-primary btn-sm" onClick={() => {removeFromCart(product._id); showAlert("Removed from Cart", "warning") }} >Remove from Cart</button>
          ): (
            <button className="btn btn-outline-primary btn-sm" onClick={() => {addToCart(product); showAlert("Product added to Cart", "success")}} >Add to Cart</button>
          )}

          {isInWishList ? (
            <button className="btn btn-outline-secondary btn-sm" onClick={() => {removeFromWishList(product._id); showAlert("Removed from wishlist", "warning") }}>Remove from Wishlist</button>
          ): (
            <button className="btn btn-outline-secondary btn-sm" onClick={() => {addToWishList(product); showAlert("Product added to wishlist", "success")}}>Add to Wishlist</button>
          )}
          
          
        </div>
      </div>

    </div>
  )
}

export default ProductCard
