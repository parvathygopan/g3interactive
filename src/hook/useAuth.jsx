import { useState } from "react";
import BaseClient from "../Helpers/BaseClient";
import { APIEndpoints } from "../Constants/APIEndpoints";



const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (formData, { headers,
    onSuccess, onFailed }) => {

    try {
      setIsLoading(true);
      await BaseClient.post(APIEndpoints.login, formData, {
        onSuccess,
        onFailed,
        headers
      });
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, loginUser };
};
export default useAuth;