import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const PetsContext = createContext();

export default PetsContext;

export const PetsProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/pets/";
  const [pets, setPets] = useState();
  const [user, token] = useAuth();
  const navigate = useNavigate();

  useEffect(() => getPets(), []);

  async function getPets() {
    try {
      let response = await axios.get(BASE_URL, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addPet(newPet) {
    try {
      let response = await axios.post(BASE_URL, newPet, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const newPetId = response.data.id;
      await getPets();
      navigate(`/pets/${newPetId}/`);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePet(petId) {
    try {
      await axios.delete(BASE_URL + petId + "/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      await getPets();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  const contextData = {
    pets,
    getPets,
    addPet,
    deletePet,
  };

  return (
    <PetsContext.Provider value={contextData}>{children}</PetsContext.Provider>
  );
};
