import React from "react";

// Hook Imports
import { useParams } from "react-router-dom";
import useAxiosGet from "../../hooks/useAxiosGet";

// Component Imports
import BioWidget from "../../components/BioWidget/BioWidget";

const PetPage = (props) => {
  const { petId } = useParams();
  const [pet, petIsLoading] = useAxiosGet(
    `http://127.0.0.1:8000/api/pets/${petId}/`
  );
  const [dashboard, isLoading] = useAxiosGet(
    "http://127.0.0.1:8000/api/widgets/"
  );

  return (
    <>
      {!petIsLoading ? (
        <div>
          <h1>{pet.name}</h1>
          <BioWidget petId={pet.id} dashboard={dashboard} />
        </div>
      ) : null}
    </>
  );
};

export default PetPage;
