import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAxiosGet = (url: string) => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url, token]);

  return [data, isLoading];
};

export default useAxiosGet;
