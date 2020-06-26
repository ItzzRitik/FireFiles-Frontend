import React from 'react';
import './Dashbar.scss';


let Dashbar = (props) => {
	let classList = 'dashbar ';
	return (
		<div className={classList}>
			<div className='closeDash' onClick={props.closeDashClick}>
				<span className={props.closeDash ? 'open' : ''} style={props.closeButtonMask} />
			</div>
			<h1 className='storageTitle'>Storage</h1>
		</div>
	);
};

export default Dashbar;
