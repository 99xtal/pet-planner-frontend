import React, { useState, useEffect } from "react";
import axios from "axios";

// Hook Imports
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const PetPage = (props) => {
  const [user, token] = useAuth();
  const { petId } = useParams();
  const [pet, setPet] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchPet = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/pets/${petId}/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setPet(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchPet();
  }, [token, petId]);

  return <>{!isLoading ? <h1>{`${pet.name}'s Page`}</h1> : null}</>;
};

export default PetPage;
