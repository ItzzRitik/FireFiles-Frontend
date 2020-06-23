import React from 'react';

import Eye from './assets/Eye.svg';
import './TextInput.scss';

let TextInput = (props) => {
	const [eyeMouseDown, setEyeMouseDown] = React.useState(false),
		eyeMask = {
			WebkitMaskImage: 'url(' + Eye + ')',
			maskImage: 'url(' + Eye + ')',
			WebkitMaskSize: '18px',
			maskSize: '18px',
			WebkitMaskRepeat: 'no-repeat',
			maskRepeat: 'no-repeat',
			background: 'var(--color-content-tertiary)'
		};

	return (
		<div className='textInput'>
			<input className={(props.shake ? 'shake ' : '') + (props.type === 'password' ? 'password ' : '')}
				type={eyeMouseDown ? 'text' : props.type}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
			{
				props.type === 'password' &&
				<div className='eye'
					onMouseDown={(event) => {
						let button = event.button;
						setTimeout(() => {
							setEyeMouseDown(button === 0);
						}, 100);
					}}
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
