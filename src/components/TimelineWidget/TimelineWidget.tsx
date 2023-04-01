// General Imports
import React, { useEffect, useState } from 'react';
import './TimelineWidget.css';

// Component Imports
import Widget from '../Widget/Widget';
import AddEventForm from './AddEventForm';
import EventCard from './EventCard';
import { BsPlus } from 'react-icons/bs';

// Util Imports
import { getEvents, getEventsByPet } from '../../api';
import type { Event } from '../../api/events/types';

const TimelineWidget = ({ petId }) => {
	const [events, setEvents] = useState<Event[]>([]);
	const [addToggled, setAddToggled] = useState(false);
	const [needsRefresh, setNeedsRefresh] = useState(false);

	useEffect(() => {
		if (petId) {
			getEventsByPet(petId).then((res) => setEvents(res.data));
		} else {
			getEvents().then((res) => setEvents(res.data));
		}

		return setNeedsRefresh(false);
	}, [petId, needsRefresh]);

	return (
		<Widget title="Timeline">
			<div className="eventwindow">
				{events.length ? (
					events.map((e) => {
						return (
							<EventCard
								key={e.id}
								event={e}
								setNeedsRefresh={setNeedsRefresh}
							/>
						);
					})
				) : (
					<p>No events to display</p>
				)}
			</div>
			{addToggled ? (
				<AddEventForm
					petId={petId}
					setAddToggled={setAddToggled}
					setNeedsRefresh={setNeedsRefresh}
				/>
			) : (
				<div className="posteventbutton">
					<a
						href="#0"
						aria-label="New Event"
						onClick={() => setAddToggled(true)}
					>
						<div className="addbutton">
							<BsPlus size={40} color={'white'} />
						</div>
					</a>
				</div>
			)}
		</Widget>
	);
};

export default TimelineWidget;
