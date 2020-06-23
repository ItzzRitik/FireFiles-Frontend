import React from 'react';

import Eye from './img/Eye.svg';

import './TextInput.scss';

let TextInput = (props) => {
	let [eyeMouseDown, setEyeMouseDown] = React.useState(false),
		eyeMask = {
			WebkitMaskImage: 'url(' + Eye + ')',
			maskImage: 'url(' + Eye + ')',
			WebkitMaskSize: '18px',
			maskSize: '18px',
			WebkitMaskRepeat: 'no-repeat',
			maskRepeat: 'no-repeat',
			background: 'var(--color-content-tertiary)'
		},
		classList = '';

	props.shake && (classList += 'shake ');
	props.type === 'password' && !eyeMouseDown && (classList += 'password ');

	return (
		<div className='textInput'>
			<input className={classList}
				type='text'
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
			{
				props.type === 'password' &&
				<div className='eye'
					onMouseDown={(event) => setEyeMouseDown(event.button === 0)}
					onMouseUp={(event) => setEyeMouseDown(false)}
				>
					<p className='eyelid upper' style={eyeMask} />
					<p className='pupil' />
				</div>
			}
		</div>
	);
};

export default TextInput;
