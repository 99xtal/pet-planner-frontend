import React from "react";

// Hook Imports
import { useParams } from "react-router-dom";
import useAxiosGet from "../../hooks/useAxiosGet";

// Component Imports
import BioWidget from "../../components/BioWidget/BioWidget";
import DietWidget from "../../components/DietWidget/DietWidget";
import HealthWidget from "../../components/HealthWidget/HealthWidget";

const PetPage = (props) => {
  const { petId } = useParams();
  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );

  return (
    <>
      {!petIsLoading ? (
        <div>
          <h1>{pet.name}</h1>
          <BioWidget petId={pet.id} />
          <DietWidget petId={pet.id} />
          <HealthWidget petId={pet.id} />
        </div>
      ) : null}
    </>
  );
};

export default PetPage;
