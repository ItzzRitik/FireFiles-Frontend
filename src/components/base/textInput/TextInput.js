import React from 'react';
import './TextInput.scss';

let TextInput = (props) => {
	return (
		<input className='textInput'
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			onChange={props.onChange}
		/>
	);
};

export default TextInput;
