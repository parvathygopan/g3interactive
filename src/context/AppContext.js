/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect } from "react";
import useProducts from "../hook/useProducts";
import useAuth from "../hook/useAuth";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const {
    getProductList, productData, productLoading
  } = useProducts();
  const {
    isLoading, loginUser, logoutUser, confirmTherapistPassword
  } = useAuth()
  useEffect(() => {
    getProductList();
  }, []);
  return (
    <AppContext.Provider
      value={{
        getProductList, productData, productLoading, isLoading, loginUser, logoutUser, confirmTherapistPassword
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
