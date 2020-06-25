import React from 'react';

import logo from '../../assets/img/logo.svg';
import './IconButton.scss';

let IconButton = (props) => {
	let classList = 'iconButton ';

	// props.slideIconButton && (classList += 'slideIconButton ');

	return (
		<div className={classList} >
			<img src={logo} />
		</div>
	);
};

export default IconButton;
