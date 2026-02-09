import React, {useContext, useEffect, useState} from "react";
import ProductCard from "./ProductCard";
import { AppContext } from "../../context/AppContext";
import "./StyleProduct.css";

function Products() {
  const {productData,getProductList} = useContext(AppContext)
  useEffect(() => {
    getProductList();
  }, []);
  console.log("productData",productData)
  return (
    <div>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Most Booked Service</h2>
          <a href="#" className="text-primary fw-class">
            See all
          </a>
        </div>
        <div className="row">
          {productData && productData.slice(0, 4).map((product) => (
            <ProductCard
              key={product?.id}
              title={product?.title}
              imageUrl={product?.imageUrl}
              price={product?.price}
              rating={product?.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
