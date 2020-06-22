import React from 'react';
import './Button.scss';

let Button = (props) => {
	let classList = 'button ';
	props.slideButton && (classList += 'slideButton ');
	props.animate && (classList += 'animate ');
	return (
		<button className={classList} onClick={props.onClick}>
			{
				props.label ?
					props.label :
					(
						<div>
							<p>Sign up</p>
							<p>Sign in</p>
						</div>
					)
			}
		</button>
	);
};

export default Button;
