import React from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

function CategoryFilter() {
  const { data } = useFetch("https://e-commerce-backend-git-main-tek-rajs-projects.vercel.app/categories");

  console.log(data);
  return (
    <>
      <div className="d-flex py-3">
        {data?.categories?.map((c) => (
          <button key={c._id} className="flex-fill bg-dark py-2">
            <Link className="text-decoration-none text-white fs-3" to={`/categories/${c._id}`}>{c.categoryName}</Link>
          </button>
        ))}
      </div>

      <div></div>
    </>
  );
}

export default CategoryFilter;
