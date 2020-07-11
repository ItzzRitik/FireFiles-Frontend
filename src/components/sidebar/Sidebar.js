import React from 'react';
import { useHistory } from 'react-router-dom';

import IconButton from '../base/iconButton/IconButton';

import Logo from '../../assets/img/Logo.svg';
import Files from './icons/Files.svg';
import FilesOutline from './icons/FilesOutline.svg';
import Dash from './icons/Dashboard.svg';
import DashOutline from './icons/DashboardOutline.svg';

import './Sidebar.scss';

const Sidebar = (props) => {
	let history = useHistory(),
		[dashActive, setDashActive] = React.useState(true),
		[filesActive, setFilesActive] = React.useState(false),
		logoOnClick = () => {

		},
		menuItemOnClick = (itemName) => {
			let activate = (activateItem) => {
				setDashActive(false);
				setFilesActive(false);
				activateItem(true);
			};
			switch (itemName) {
				case 'Dash': return activate(setDashActive);
				case 'Files': return activate(setFilesActive);
				default: return '';
			}
		},
		classList = 'sidebar ';

	// props.slideSidebar && (classList += 'slideSidebar ');

	return (
		<div className={classList}>
			<div className='logoContainer'>
				<div className='logo' onClick={logoOnClick} style={{ backgroundImage: 'url(' + Logo + ')' }} />
			</div>
			<div className='menuContainer'>
				<IconButton name='Dash' icon={DashOutline} iconActive={Dash}active={dashActive} onClick={menuItemOnClick} />
				<IconButton name='Files' icon={FilesOutline} iconActive={Files} active={filesActive} onClick={menuItemOnClick} />
			</div>
		</div>
	);
};

export default Sidebar;
