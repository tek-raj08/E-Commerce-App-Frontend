import React from "react";

function FilterSidebar({ filters, setFilters, categories }) {
  const clearFilters = () => {
    setFilters({ categories: [], rating: "", price: Infinity, sortBy: "" });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, price: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const {value, checked} = e.target
    const updated = checked ? [...filters.categories, value] : filters.categories.filter((c) => c !== value)
    setFilters({...filters, categories: updated})
  }

  const handleRatingChange = (e) => {
    setFilters({ ...filters, rating: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilters({...filters, sortBy: e.target.value})

  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Filters</h5>
        <button onClick={clearFilters} className="btn btn-secondary">
          Clear
        </button>
      </div>

      <div className="mb-4">
        <h5> Price</h5>
        <input
          type="range"
          min="0"
          max="10000"
          value={filters.price}
          onChange={handlePriceChange}
          className="form-range"
        />
      </div>

      <div className="mb-4">
        <h5>Category</h5>
        {categories?.map((c) => (
          <>
            <input type="checkbox" value={c._id} checked={filters.categories.includes(c._id)} onChange={handleCategoryChange} name="" id={c._id} />
            <label htmlFor={c._id} className="ps-2">
              {c.categoryName}
            </label>{" "}
            <br />
            
          </>
        ))}
      </div>

      <div className="mb-4">
        <h5>Rating</h5>
        {[4, 3, 2, 1].map((r) => (
          <div className="form-check" key={r}>
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              value={r}
              checked={filters.rating === r.toString()}
              onChange={handleRatingChange}
              id={`rating-${r}`}
            />
            <label className="form-check-label" htmlFor={`rating-${r}`}>
              {r} Stars & above
            </label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h5>Sort by</h5>
        <div className="form-check">
            <input className="form-check-input" checked={filters.sortBy === "lowToHigh"} onChange={handleSortChange} value="lowToHigh" type="radio" name="" id="sortLow" />
            <label htmlFor="sortLow">Price - Low to High</label>
        </div>
        <div className="form-check">
            <input className="form-check-input" checked={filters.sortBy === "highToLow"} onChange={handleSortChange} value="highToLow" type="radio" name="" id="sortHigh" />
            <label htmlFor="sortHigh">Price - High to Low</label>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
