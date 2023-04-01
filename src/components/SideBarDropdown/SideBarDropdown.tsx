import React, { useState } from 'react';

import './SideBarDropdown.css';

interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SideBarDropdown: React.FC<Props> = ({ title, icon, children }) => {
	const [toggled, setToggled] = useState(false);

	return (
		<div className="sidebardropdown" onClick={() => setToggled(!toggled)}>
			<div className="dropdown__header">
				{icon}
				<p>{title}</p>
			</div>
			{toggled ? children : null}
		</div>
	);
};

export default SideBarDropdown;
