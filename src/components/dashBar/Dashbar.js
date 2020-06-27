import React from 'react';
import './Dashbar.scss';

import StorageMenuItem from '../storageMenuItem/StorageMenuItem';

let Dashbar = (props) => {
	return (
		<div className='dashbar'>
			<div className='closeDash' onClick={props.closeDashClick}>
				<span className={props.closeDash ? 'open' : ''} style={props.closeButtonMask} />
			</div>
			<h1 className='storageTitle'>Storage</h1>
			<div className='storageContainer'>
				<StorageMenuItem name='Dropbox' space='123 Gb / 500 Gb' active />
				<StorageMenuItem name='Google Drive' space='12 Gb / 15 Gb' />
				<StorageMenuItem />
			</div>
			<div className='optionContainer'>
				<span />
			</div>
		</div>
	);
};

export default Dashbar;
