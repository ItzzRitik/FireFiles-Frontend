import React from 'react';
import './Backdrop.scss';

let Backdrop = (props) => {
	return (
		<div className={'backdrop ' + (props.blur ? 'blur' : 'dim')} />
	);
};

export default Backdrop;