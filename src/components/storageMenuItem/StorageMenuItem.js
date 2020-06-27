import React from 'react';
import './StorageMenuItem.scss';

import Dropbox from './icons/Dropbox.svg';
import GoogleDrive from './icons/GoogleDrive.svg';
import Storage from './icons/Storage.svg';

let StorageMenuItem = (props) => {
	let classList = 'storageMenuItem ',
		storage = {
			name: 'Firefiles',
			space: '1.5 Gb / 2 Gb',
			icon: Storage
		};
	if (props.name) {
		storage.name = props.name;
		if (props.name === 'Dropbox') storage.icon = Dropbox;
		else if (props.name === 'Google Drive') storage.icon = GoogleDrive;
	}
	props.space && (storage.space = props.space);


	props.active && (classList += 'active ');
	return (
		<div className={classList}>
			<span className='background' />
			<span className='icon' >
				<span style={{ backgroundImage: 'url(' + storage.icon + ')' }} />
			</span>
			<p className='title'>{storage.name}</p>
			<p className='space'>{storage.space}</p>
		</div>
	);
};

export default StorageMenuItem;
