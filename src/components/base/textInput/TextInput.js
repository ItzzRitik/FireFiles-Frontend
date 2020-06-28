import React from 'react';

import Eye from './icons/Eye.svg';
import Name from './icons/Name.svg';
import Email from './icons/Email.svg';
import Password from './icons/Password.svg';
import Type from './icons/Type.svg';
import Search from '../../../assets/img/Search.svg';

import './TextInput.scss';

let TextInput = (props) => {
	let [eyeMouseDown, setEyeMouseDown] = React.useState(false),
		getInputIcon = () => {
			switch (props.placeholder) {
				case 'Email': return Email;
				case 'Password': return Password;
				case 'Name': return Name;
				case 'Search': return Search;
				default: return Type;
			}
		},
		getMask = (icon) => {
			let mask = {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')'
			};

			return mask;
		},
		classList = 'textInput ';

	props.type === 'password' && (classList += 'password ');
	props.icon && (classList += 'icon ');
	props.shake && (classList += 'shake ');
	props.search && (classList += 'search ');

	return (
		<div className={classList}>
			<input type={eyeMouseDown ? 'text' : props.type}
				autoComplete={props.autoComplete}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onFocus={() => props.onFocus(true)}
				onBlur={() => props.onFocus(false)}
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
