// General Imports
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

// Util Imports
import { getBreedsByCategory, patchPet } from '../../api';

import type { Breed, Gender, Pet } from '../../api/pets/types';

interface Props {
  pet: Pet;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNeedsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const BioInfoEdit: React.FC<Props> = ({ pet, setEditMode, setNeedsUpdate }) => {
	const [breedOptions, setBreedOptions] = useState<Breed[]>([]);
	const [breedId, setBreedId] = useState(pet.breed.id);
	const [weight, setWeight] = useState(pet.weight);
	const [gender, setGender] = useState(pet.gender);
	const [birthday, setBirthday] = useState(pet.birthday);

	useEffect(() => {
		getBreedsByCategory(pet.category.id)
			.then((res) => setBreedOptions(res.data))
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const updatedPet = {
			breed_id: breedId,
			weight: weight,
			gender: gender,
			birthday: birthday,
		};
		patchPet(pet.id, updatedPet)
			.then(() => {
				setNeedsUpdate(true);
				setEditMode(false);
			})
			.catch((err) => console.log(err));
	};

	return (
		<form onSubmit={handleSubmit}>
			<Row>
				<Col>
					<Row>
						<Col>Breed:</Col>
						<Col>
							<select onChange={(e) => setBreedId(parseInt(e.target.value))}>
								{breedOptions.map((b) => {
									return (
										<option key={b.id} value={b.id}>
											{b.name}
										</option>
									);
								})}
							</select>
						</Col>
					</Row>
					<Row>
						<Col>Species:</Col>
						<Col>
							<p>{pet.breed.species.binomial_name} </p>
						</Col>
					</Row>

					<Row>
						<Col>Weight:</Col>
						<Col>
							<input
								onChange={(e) => setWeight(parseInt(e.target.value))}
								value={weight}
							/>
						</Col>
					</Row>
					<Row>
						<Col>Gender:</Col>
						<Col>
							<input
								onChange={(e) => setGender(e.target.value as Gender)}
								value={gender}
							/>
						</Col>
					</Row>
					<Row>
						<Col>Birthday:</Col>
						<Col>
							<input
								onChange={(e) => setBirthday(e.target.value)}
								type="date"
								value={birthday}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col className="d-flex justify-content-end">
					<button onClick={() => setEditMode(false)}>Cancel</button>
					<button type="submit">Save</button>
				</Col>
			</Row>
		</form>
	);
};

export default BioInfoEdit;
