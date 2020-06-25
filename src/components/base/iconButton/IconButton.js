import React from 'react';

import './IconButton.scss';

let IconButton = (props) => {
	let getStyle = () => {
			return {
				backgroundImage: 'url(' + (props.active ? props.iconActive : props.icon) + ')'
			};
		},
		classList = 'iconButton ';
	props.active && (classList += 'active ');

	return (
		<div className={classList} onClick={() => { if (!props.active) props.onClick(props.name); }}>
			<span className='icon' style={getStyle()} />
			<span className='cover' />
		</div>
	);
};

export default IconButton;
