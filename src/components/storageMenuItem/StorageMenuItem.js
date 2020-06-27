import React from 'react';
import './StorageMenuItem.scss';

import GoogleDrive from './icons/GoogleDrive.svg';

let StorageMenuItem = (props) => {
	let classList = 'storageMenuItem ',
		storage = {
			name: 'Firefiles'
		};
	props.active && (classList += 'active ');
	return (
		<div className={classList}>
			<span className='background' />
			<span className='icon' >
				<span style={{ backgroundImage: 'url(' + GoogleDrive + ')' }} />
			</span>
			<p className='title'>{storage.name}</p>
			<p className='space'>124 Gb / 512 Gb</p>
		</div>
	);
};

export default StorageMenuItem;
