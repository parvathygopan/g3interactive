import { useState } from "react";
import BaseClient from "../Helpers/BaseClient";

const APIEndpoints = {
  getProductList: "https://jsonplaceholder.typicode.com/posts",
};

const useProducts = () => {
  const [productData, setProductData] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const getProductList = async () => {
    setProductLoading(true);
    try {
      await BaseClient.get(APIEndpoints.getProductList, {
        onSuccess: (res) => {
          console.log(res, "result from call");
          setProductData(res);
        },
        onFailed: (err) => console.error(err),
      });
    } finally {
      setProductLoading(false);
    }
  };

  return { getProductList, productData, productLoading };
};

export default useProducts;
