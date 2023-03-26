import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAxiosGet = <T>(url: string) => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + token,
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

  return { data, isLoading };
};

export default useAxiosGet;
