import React from 'react';

import Eye from './icons/Eye.svg';
import Name from './icons/Name.svg';
import Email from './icons/Email.svg';
import Password from './icons/Password.svg';
import Type from './icons/Type.svg';

import './TextInput.scss';

let TextInput = (props) => {
	let [eyeMouseDown, setEyeMouseDown] = React.useState(false),
		getInputIcon = () => {
			switch (props.placeholder) {
				case 'Email': return Email;
				case 'Password': return Password;
				case 'Name': return Name;
				default: return Type;
			}
		},
		getMask = (icon) => {
			let mask = {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')',
				maskSize: '18px',
				WebkitMaskSize: '18px',
				maskRepeat: 'no-repeat',
				WebkitMaskRepeat: 'no-repeat',
				maskPosition: 'top',
				WebkitMaskPosition: 'top',
				background: 'var(--color-brand-secondary)'
			};

			return mask;
		},
		classList = '';

	props.shake && (classList += 'shake ');
	props.type === 'password' && (classList += 'password ');
	props.icon && (classList += 'icon ');

	return (
		<div className='textInput'>
			<input className={classList}
				type={eyeMouseDown ? 'text' : props.type}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
			{
				props.icon &&
				<div className='inputIcon'>
					<span style={getMask(getInputIcon())} />
				</div>
			}
			{
				props.type === 'password' &&
				<div className='eye'
					onMouseDown={(event) => setEyeMouseDown(event.button === 0)}
					onMouseUp={(event) => setEyeMouseDown(false)}
				>
					<span className='eyelid' style={getMask(Eye)} />
					<span className='pupil' />
				</div>
			}
		</div>
	);
};

export default TextInput;
