import React from 'react';

import logo from '../../assets/img/logo.svg';
import './Sidebar.scss';

let Sidebar = (props) => {
	let classList = 'sidebar ';

	// props.slideSidebar && (classList += 'slideSidebar ');

	return (
		<div className={classList}>
			<div className='logo' >
				<img src={logo} />
			</div>
		</div>
	);
};

export default Sidebar;
