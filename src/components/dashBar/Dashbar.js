import React from 'react';
import './Dashbar.scss';

import StorageMenuItem from '../storageMenuItem/StorageMenuItem';
import IconOption from '../base/iconOption/IconOption';

import Share from '../../assets/img/Share.svg';
import Clock from '../../assets/img/Clock.svg';
import Heart from '../../assets/img/Heart.svg';
import Trash from '../../assets/img/Trash.svg';

let Dashbar = (props) => {
	return (
		<div className='dashbar'>
			<div className='closeDash' onClick={props.closeDashClick}>
				<span className={props.closeDash ? 'open' : ''} style={props.closeButtonMask} />
			</div>
			<h1 className='storageTitle'>Storage</h1>
			<div className='storageContainer'>
				<StorageMenuItem name='Dropbox' space='123 Mb / 500 Mb' />
				<StorageMenuItem name='Google Drive' space='12 Gb / 15 Gb' />
				<StorageMenuItem active />
			</div>
			<div className='optionContainer'>
				<IconOption icon={Share} label='Shared items' />
				<IconOption icon={Clock} label='Activity' />
				<IconOption icon={Heart} label='Favourites' />
				<IconOption icon={Trash} label='Trash' />
			</div>
		</div>
	);
};

export default Dashbar;
