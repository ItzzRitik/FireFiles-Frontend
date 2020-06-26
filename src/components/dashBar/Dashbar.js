import React from 'react';
import './Dashbar.scss';

import ArrowMono from '../../assets/img/ArrowMono.svg';

let Dashbar = (props) => {
	let closeStyle = {
			maskImage: 'url(' + ArrowMono + ')',
			WebkitMaskImage: 'url(' + ArrowMono + ')'
		},
		classList = 'dashbar ';
	return (
		<div className={classList}>
			<div className='closeDash' onClick={props.closeDashClick}>
				<span className={props.closeDash ? 'open' : ''} style={closeStyle} />
			</div>
		</div>
	);
};

export default Dashbar;
