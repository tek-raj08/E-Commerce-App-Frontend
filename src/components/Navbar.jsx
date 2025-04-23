import React from 'react';

import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = ({setSearch}) => {
  const {cart, wishList} = useCart()
  const navigate = useNavigate()
  
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3 justify-content-between">
      <Link className="navbar-brand fw-bold text-secondary" to="/">MyShoppingSite</Link>

      <form className="d-flex search-box">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </form>

      <div className="d-flex align-items-center">
        <button className="btn btn-secondary me-3" onClick={() => navigate("/userProfile")}><i class="fa-solid fa-user"></i></button>

        <div className="icon-btn position-relative" onClick={() => navigate("/wishlist")}>
          <FaHeart size={20} />
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">
            {wishList.length}
          </span>
        </div>

        <div className="icon-btn position-relative ms-3 d-flex align-items-center" onClick={() => navigate("/cart")}>
          <FaShoppingCart size={20} />
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle">
            {cart.length}
          </span>
          <span className="ms-1">Cart</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
