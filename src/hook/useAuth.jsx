import {useState} from "react";
import {APIEndpoints } from "../Constants/APIEndpoints";
import BaseClient from "../Helpers/BaseClient";


const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
   const loginUser = async (formData, { onSuccess, onFailed }) => {
    try {
      setIsLoading(true);
      await BaseClient.post(APIEndpoints.login, formData, {
        onSuccess: onSuccess,
        onFailed: onFailed,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {isLoading, loginUser};
};
export default useAuth;