/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect } from "react";
import useProducts from "../hook/useProducts";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const {
    getProductList, productData, productLoading
  } = useProducts();
  
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <AppContext.Provider
      value={{
        getProductList, productData, productLoading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
