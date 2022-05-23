import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosGet = (url) => {
  const [user, token] = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [url, token]);

  return [data, isLoading];
};

export default useAxiosGet;
