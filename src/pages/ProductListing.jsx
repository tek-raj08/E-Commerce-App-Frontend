import React, { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { Link } from "react-router-dom";

function ProductListing() {
  const { id } = useParams();
  const {
    data: productData,
    loading,
    error,
  } = useFetch(`https://e-commerce-backend-git-main-tek-rajs-projects.vercel.app/products/productCategoryId/${id}`);
  const { data: categoryData } = useFetch("https://e-commerce-backend-git-main-tek-rajs-projects.vercel.app/categories");
  console.log("from productListing page: ", productData);

  const [filters, setFilters] = useState({
    categories: [],
    rating: "",
    price: Infinity,
    sortBy: "",
  });

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("From filtered Products: ", filteredProducts);

  useEffect(() => {
    if (productData?.product) {
      let result = [...productData?.product];

      if (search) {
        result = result.filter((p) => {
          return p.name.toLowerCase().includes(search);
        });
      }

      // filter by Category

      if (filters.categories.length > 0) {
        result = result.filter((p) =>
          filters.categories.includes(p.categoryId)
        );
      }

      // filter by price

      result = result.filter((p) => p.discountPrice <= filters.price);

      // filters by Rating

      if (filters.rating) {
        result = result.filter((p) => p.rating >= parseInt(filters.rating));
      }

      // filter by sorting

      if (filters.sortBy === "lowToHigh") {
        result.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (filters.sortBy === "highToLow") {
        result.sort((a, b) => b.discountPrice - a.discountPrice);
      }

      setFilteredProducts(result);
    }
  }, [filters, productData, search]);

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

  if (error)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="fas fa-exclamation-triangle fa-2x"></i>
          </div>
          <p className="fw-bold">Failed to load products: {error.message}</p>
        </div>
      </div>
    );

  if (!productData || productData.length === 0)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="text-warning mb-3">
            <i className="fas fa-box-open fa-2x"></i>
          </div>
          <p className="fw-bold">No products found.</p>
        </div>
      </div>
    );

  return (
    <div>
      <Navbar setSearch={setSearch} />

      <div className="row px-3 my-4">
        <div className="col-md-3">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categoryData?.categories || []}
          />
        </div>

        <div className="col-md-9">
          <div className="d-flex align-items-center mb-4">
            <h4 className="fw-bold mb-0 me-2">Showing All Products</h4>
            <span className="text-muted">
              ( Showing {filteredProducts?.length} products )
            </span>
          </div>

          <div className="row">
            {filteredProducts.length === 0 ? (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted fw-bold">
                  No products matched your filters.
                </h5>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
