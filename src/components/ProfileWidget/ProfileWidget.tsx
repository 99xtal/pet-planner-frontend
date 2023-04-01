// General Imports
import React, { useState, useEffect } from 'react';

// Component Imports
import Widget from '../Widget/Widget';
import WidgetEditMenu from '../Widget/WidgetEditMenu';
import ProfileDisplay from './ProfileDisplay';

// Util Imports
import { getProfile } from '../../api';
import ProfileEdit from './ProfileEdit';

import type { User } from '../../api/auth/types';

const ProfileWidget = () => {
	const [profile, setProfile] = useState<User>();
	const [needsUpdate, setNeedsUpdate] = useState(false);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		getProfile()
			.then((res) => setProfile(res.data))
			.catch((err) => console.log(err));

		return () => setNeedsUpdate(false);
	}, [needsUpdate]);

	const editMenu = (
		<WidgetEditMenu type="profile" petId={null} setEditMode={setEditMode} />
	);

	return (
		<>
			{profile && (
				<Widget title="Profile" menu={editMenu} editMode={editMode}>
					{editMode ? (
						<ProfileEdit
							profile={profile}
							setEditMode={setEditMode}
							setNeedsUpdate={setNeedsUpdate}
						/>
					) : (
						<ProfileDisplay profile={profile} />
					)}
				</Widget>
			)}
		</>
	);
};

export default ProfileWidget;
