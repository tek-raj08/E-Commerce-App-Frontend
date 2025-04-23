import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../Context/CartContext";
import ProductCard from "../components/ProductCard";
import { useAlert } from "../Context/AlertContext";

function WishList({ product }) {
  const { wishList, cart, addToCart, removeFromCart, removeFromWishList, addToWishList } = useCart();
  const { showAlert } = useAlert();
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar setSearch={setSearch} />
      <h2 className="d-flex justify-content-center text-align-center my-4">
        My Wishlist
      </h2>
      <div className="row px-3">
        {wishList.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh", position: "relative" }}
          >
            <div className="text-center">
              <h4 className="fs-3">No items in your wishlist.</h4>
            </div>
          </div>
        ) : (
          wishList
            .filter((product) => product.name.toLowerCase().includes(search))
            .map((product) => {
              const isInCart = cart.some((item) => item._id === product._id);
              const isInWishList = wishList.some(
                (item) => item._id === product._id
              );

              return (
                <div className="col-md-3">
                  <div className="card my-4">
                    <img
                      src={product.imgUrl}
                      alt={product._id}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <p>{product.name}</p>
                      <h5>${product.discountPrice}</h5>
                      <div className="d-grid">
                        <div className="d-grid gap-2">
                          {isInCart ? (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => {
                                removeFromCart(product._id);
                                showAlert(
                                  "Product removed from Cart",
                                  "warning"
                                );
                              }}
                            >
                              Remove from Cart
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() => {
                                addToCart(product);
                                showAlert(
                                  "Product added to the cart",
                                  "success"
                                );
                              }}
                            >
                              Add to Cart
                            </button>
                          )}

                          {isInWishList ? (
                            <button
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => {
                                removeFromWishList(product._id);
                                showAlert(
                                  "Product removed from Wishlist",
                                  "warning"
                                );
                              }}
                            >
                              Remove from Wishlist
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => {
                                addToWishList(product);
                                showAlert(
                                  "Product added to the Wishlist",
                                  "success"
                                );
                              }}
                            >
                              Add to Wishlist
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default WishList;
