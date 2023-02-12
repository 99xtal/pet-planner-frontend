import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPets, postPet, patchPet, deletePet } from "../utils/api";

const PetsContext = createContext();

export default PetsContext;

export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState();
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPets()
      .then((res) => setPets(res.data))
      .catch((err) => console.log(err));

    return () => setNeedsUpdate(false);
  }, [needsUpdate]);

  function addPet(newPet) {
    postPet(newPet)
      .then((res) => {
        setNeedsUpdate(true);
        navigate(`/pets/${res.data.id}/`);
      })
      .catch((err) => console.log(err));
  }

  function updatePet(petId, updatedPet) {
    patchPet(petId, updatedPet)
      .then(() => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  }

  function removePet(petId) {
    deletePet(petId)
      .then(() => {
        setNeedsUpdate(true);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  const contextData = {
    pets,
    getPets,
    addPet,
    updatePet,
    deletePet: removePet,
  };

  return (
    <PetsContext.Provider value={contextData}>{children}</PetsContext.Provider>
  );
};
