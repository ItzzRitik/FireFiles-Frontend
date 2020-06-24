import React from 'react';
import './Loader.scss';

let Loader = (props) => {
	return (
		<div className={'loader ' + (props.fullpage ? 'fullpage' : '')}>
			<span />
		</div>
	);
};

export default Loader;
