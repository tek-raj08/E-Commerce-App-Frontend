import React, { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../Context/CartContext";
import { useAlert } from "../Context/AlertContext";

function ProductDetails() {
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

  const {showAlert, setAlert} = useAlert()

  const [search, setSearch] = useState("");
  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/products/${productId}`
  );
  const { data: allProducts } = useFetch("http://localhost:3000/products");
  console.log("f AllP", allProducts);
  const { data: allCategories } = useFetch("http://localhost:3000/categories");
  console.log("f cate", allCategories);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="fw-bold">Loading products...</p>
        </div>
      </div>
    );
  }


  if (error) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="text-danger mb-3">
          <i className="fas fa-exclamation-triangle fa-2x"></i>
        </div>
        <p className="fw-bold">Failed to load products: {error.message}</p>
      </div>
    </div>
  );
 

 
  if (!data || data.length === 0) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="text-warning mb-3">
          <i className="fas fa-box-open fa-2x"></i>
        </div>
        <p className="fw-bold">No products found.</p>
      </div>
    </div>
  );


  const product = data?.product;
  const isInCart = cart.some((item) => item._id === product._id);
  const isInWishList = wishList.some((item) => item._id === product._id);
  const cartItems = cart.find((item) => item._id === product._id);

  console.log("From PDetails", data);
  const matchedCategory = allCategories?.categories?.find(
    (c) => c._id === product.categoryId
  );
  return (
    <div>
      <Navbar setSearch={setSearch} />

      <div className="row py-4 px-3">
        <div className="col-md-4">
          <div className="card">
            <img
              src={product?.imgUrl}
              alt={product?.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <button className="my-2 btn btn-primary" onClick={() => showAlert("Buy now clicked!", "info")}>Buy Now</button>
            <button
              className="btn btn-secondary"
              onClick={() =>{
                if(isInCart){
                  removeFromCart(product._id);
                  showAlert("Product removed from Cart", "warning")
                }  else{
                  addToCart(product);
                  showAlert("Product added to Cart", "success")
                } 
                

              }}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="col-md-8">
          <h5>{product.description}</h5>
          <div>
            <span className="me-2">({product.rating})</span>
            {Array.from({ length: 5 }, (_, index) => {
              const ratingValue = index + 1;
              if (product.rating >= ratingValue) {
                return <i key={index} className="fas fa-star text-warning"></i>; // full star
              } else if (product.rating >= ratingValue - 0.5) {
                return (
                  <i
                    key={index}
                    className="fas fa-star-half-alt text-warning"
                  ></i>
                ); // half star
              } else {
                return <i key={index} className="far fa-star text-warning"></i>; // empty star
              }
            })}
          </div>
          <div className="d-flex align-items-center fs-3">
            <p>
              <strong>${product.discountPrice}</strong>{" "}
              <span style={{ textDecoration: "line-through" }}>
                ${product.originalPrice}
              </span>
            </p>
          </div>
          <small className="fs-5 fw-medium text-secondary">
            {product.discountPercent}% off
          </small>

          <div className="d-flex align-items-center mb-2">
            <span className="me-2 fw-bold">Quantity:</span>
            <button
              onClick={() =>{ decreaseQuantity(product._id); showAlert("Decreased Quantity", "warning")}}
              className="btn btn-sm btn-outline-secondary me-1"
            >
              -
            </button>
            <span>{cartItems?.quantity ?? 0}</span>
            <button
              onClick={() =>{ increaseQuantity(product._id); showAlert("Increased Quantity", "success")}}
              className="btn btn-sm btn-outline-secondary ms-1"
            >
              +
            </button>
          </div>
          <hr />

          <div className="d-flex align-items-center">
            <div className="m-3">
              <div className="rounded-circle bg-light p-4 d-inline-block">
                <i className="fa-solid fa-box fa-2x"></i>
              </div>
              <p className="mt-2">
                10 days <br /> Returnable
              </p>
            </div>

            <div className="m-3">
              <div className="rounded-circle bg-light p-4 d-inline-block">
                <i className="fa-solid fa-hand-holding-dollar fa-2x"></i>
              </div>

              <p className="mt-2">
                Pay on <br /> Delivery
              </p>
            </div>

            <div className="m-3">
              <div className="rounded-circle bg-light p-4 d-inline-block">
                <i className="fa-solid fa-truck-fast fa-2x"></i>
              </div>

              <p className="mt-2">
                Free <br /> Delivery
              </p>
            </div>

            <div className="m-3">
              <div className="rounded-circle bg-light p-4 d-inline-block">
                <i className="fa-solid fa-lock fa-2x"></i>
              </div>

              <p className="mt-2">
                Secure <br /> Payment
              </p>
            </div>
          </div>
          <hr />

          <div>
            <h5 className="fw-bold">Description:</h5>
            <ul>
              {product.description.split(", ").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <hr className="mx-3" />
      
      <h5 className="fs-4 fw-bold px-3">
        More items you may like in{" "}
        {matchedCategory ? matchedCategory.categoryName : "this category"}
      </h5>
      <div className="row px-3">
        {allProducts?.products
          ?.filter((item) => item.categoryId === product.categoryId)
          .map((item) => (
            <div className="col-md-4 my-3">
              <div className="card">
                <img
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  src={item.imgUrl}
                  alt={item.name}
                />
                <div className="card-body text-center">
                  <p>{item.name}</p>
                  <p className="fs-3 fw-bold">
                    ${item.discountPrice}
                  </p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() =>{
                    if(cart.some((p) => p._id === item._id)){
                      removeFromCart(item._id);
                      showAlert("Product removed from Cart", "warning")
                    }else{
                      addToCart(item);
                      showAlert("Product added to the Cart", "success")
                    }}
                       

                  }
                >
                  {cart.some((p) => p._id === item._id)
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
      </div>
      </div>
 
  );
}

export default ProductDetails;
