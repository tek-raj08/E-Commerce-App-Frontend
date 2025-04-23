import React, { useEffect } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import { useAlert } from "../Context/AlertContext";

function AllProducts({search}) {
  const { data, loading, error } = useFetch("http://localhost:3000/products");

  console.log(data);

  const {showAlert} = useAlert()

  const shuffleProducts = (products) => {
    return [...products].sort(() => 0.5 - Math.random());
  };

  const products = data?.products ? shuffleProducts(data.products) : [];

  const filteredProducts = products?.filter((p) => p.name.toLowerCase().includes(search))

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

  // if (error) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="text-center">
  //         <div className="spinner-border text-primary mb-3" role="status">
  //           <span className="visually-hidden">Error...</span>
  //         </div>
  //         <p className="fw-bold">Something went wrong while loading the products.</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!data || data.products.length === 0) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="text-warning mb-3">
          <i className="fas fa-box-open fa-2x"></i>
        </div>
        <p className="fw-bold">No products found.</p>
      </div>
    </div>
  );

  // if (!data) return (
  //   <div className="d-flex justify-content-center align-items-center vh-100">
  //     <div className="text-center">
  //       <div className="spinner-border text-primary mb-3" role="status">
  //         {/* <span className="visually-hidden">Loading...</span> */}
  //       </div>
  //       <p className="fw-bold">Products not found.</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="row px-3">
      {filteredProducts?.map((p) => (
        <div key={p._id} className="col-md-3 my-4">
          
          <div className="card h-500">
          <Link to={`/products/${p._id}`}>
            <img style={{ width: "100%", height: "250px", objectFit: "cover" }} src={p.imgUrl} alt={p.name} />
            </Link>
            <div className="card-body">
              <p className="card-text">{p.name}</p>
              <h5 className="card-text">${p.discountPrice}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
