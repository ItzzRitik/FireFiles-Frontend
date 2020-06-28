import React from 'react';
import './OptionSheet.scss';

let OptionSheet = (props) => {
	return (
		<div className={'optionSheet ' + (props.close ? 'close' : '')}>
			<div className='header'>
				<div className='close' onClick={props.closeClick}>
					<span className={props.close ? 'open' : ''} style={props.closeIcon} />
				</div>
				<h1 className='title'>{props.sheet}</h1>
			</div>
		</div>
	);
};

export default OptionSheet;
