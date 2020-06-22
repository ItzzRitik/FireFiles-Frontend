import React from 'react';
import './TextInput.scss';

let TextInput = (props) => {
	return (
		<input className={'textInput ' + (props.shake ? 'shake' : '')}
			type={props.type}
			autoComplete={props.autoComplete}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
		/>
	);
};

export default TextInput;
