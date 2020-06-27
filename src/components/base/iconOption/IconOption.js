import React from 'react';
import './IconOption.scss';


let IconOption = (props) => {
	let iconMask = {
		maskImage: 'url(' + props.icon + ')',
		WebkitMaskImage: 'url(' + props.icon + ')'
	};

	return (
		<div className='iconOption'>
			<span className='icon' style={iconMask} />
			<span className='label'>{props.label}</span>
		</div>
	);
};

export default IconOption;
