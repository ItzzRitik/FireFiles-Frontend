import React from 'react';
import './Backdrop.scss';

let Backdrop = (props) => {
	let classList = 'backdrop ';
	props.blur && (classList += 'blur ');
	props.dim && (classList += 'dim ');
	return (
		<div className={classList} onClick={props.onClick} />
	);
};

export default Backdrop;
