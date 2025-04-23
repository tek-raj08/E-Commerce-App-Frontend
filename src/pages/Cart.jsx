import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../Context/CartContext";
import { useAlert } from "../Context/AlertContext";

function Cart() {
  const {
    cart,
    wishList,
    addToCart,
    removeFromCart,
    addToWishList,
    removeFromWishList,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const {showAlert} = useAlert()

  const [search, setSearch] = useState("");

  const price = cart.reduce(
    (acc, item) => (acc + item.discountPrice).toFixed(2) * item.quantity,
    0
  );
  const discount = cart.reduce(
    (acc, item) =>
      (acc + (item.discountPrice * item.discountPercent) / 100).toFixed(2) *
      item.quantity,
    0
  );
  const totalAmount = (price - discount).toFixed(2);

  return (
    <div>
      <Navbar setSearch={setSearch} />
      <h2 className="d-flex justify-content-center align-item-center my-4">
        MY CART ({cart.length})
      </h2>

      <div className="row px-3">
      {cart.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh", position: "relative" }}
            >
              <div className="text-center">
                <h4 className="fs-3">No items in your cart.</h4>
              </div>
            </div>
          ) : (
        <div className="col-md-8">
          
           { cart
              .filter((product) => product.name.toLowerCase().includes(search))
              .map((product) => {
                const isInCart = cart.some((item) => item._id === product._id);
                

                return (
                  <div
                    key={product._id}
                    className="d-flex mb-4 p-3 border rounded bg-white align-items-center"
                  >
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      style={{ height: "250px", objectFit: "cover" }}
                      className="me-4"
                    />
                    <div className="flex-grow-1">
                      <h5>{product.name}</h5>
                      <p className="mb-1">
                        <strong>${product.discountPrice}</strong>
                        <small
                          className="ms-2 text-muted"
                          style={{ textDecoration: "line-through" }}
                        >
                          ${product.originalPrice}
                        </small>
                      </p>
                      <p className="mb-1">{product.discountPercent}% off</p>

                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2">Quantity:</span>
                        <button
                          onClick={() => {

                            decreaseQuantity(product._id);
                            showAlert("Decreased Quantity", "warning")
                            }
                          }
                          className="btn btn-sm btn-outline-secondary me-1"
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() =>{
                            
                            increaseQuantity(product._id);
                            showAlert("Increase Quantity", "success")
                          }
                          }
                          className="btn btn-sm btn-outline-secondary ms-1"
                        >
                          +
                        </button>
                      </div>

                      <div className="d-grid gap-2">
                        {isInCart ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>{
                              
                              removeFromCart(product._id);
                              showAlert("Product removed from Cart", "warning")
                            }
                            }
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>{
                              
                              addToCart(product);
                              showAlert("Product added to the Cart", "success")
                            }
                            }
                          >
                            Add to Cart
                          </button>
                        )}

                        
                      </div>
                    </div>
                  </div>
                );
              })}
          
        </div>
)}
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2>PRICE DETAILS</h2>
                <hr />
                <div className="d-flex justify-content-between align-item-center">
                  <p>
                    Price ({cart.length} {cart.length > 1 ? "items" : "item"})
                  </p>
                  <p>${price}</p>
                </div>
                <div className="d-flex justify-content-between align-item-center">
                  <p>Discount</p>
                  <p>- ${discount}</p>
                </div>
                <div className="d-flex justify-content-between align-item-center">
                  <p>Delivery Charges</p>
                  <p>Free Delivery</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-item-center">
                  <h5>TOTAL AMOUNT</h5>
                  <h5>${totalAmount}</h5>
                </div>
                <hr />
                <div className="">
                  <p>
                    You will save ${discount} on{" "}
                    {cart.length > 1 ? "these" : "this"}{" "}
                    {cart.length > 1 ? "orders" : "order"}
                  </p>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-sm  "
                  
                  onClick={() => showAlert("Order is placed Successfully", "success")}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
