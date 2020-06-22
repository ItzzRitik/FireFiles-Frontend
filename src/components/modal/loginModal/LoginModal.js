import React from 'react';
import isEmail from 'validator/lib/isEmail';

import './LoginModal.scss';
import Backdrop from '../../base/backdrop/Backdrop';
import TextInput from '../../base/textInput/TextInput';
import Button from '../../base/button/Button';

let LoginModal = (props) => {
	let [showSignUp, setShowSignUp] = React.useState(false),
		[animateSlide, setAnimateSlide] = React.useState(false),
		[emailShake, setEmailShake] = React.useState(false),
		[passwordShake, setPasswordShake] = React.useState(false),
		[signInLoad, setSignInLoad] = React.useState(false),

		// [name, nameInput] = React.useState({ type: 'text' }),
		// [emailSignUp, emailSignUpInput] = React.useState({ type: 'text' }),
		// [passwordSignUp, passwordSignUpInput] = React.useState({ type: 'text' }),

		[email, emailInput] = React.useState(''),
		[password, passwordInput] = React.useState(''),

		onOverlayClick = () => {
			setAnimateSlide(true);
			setShowSignUp(!showSignUp);
		},
		onBackdropClick = () => {
			setAnimateSlide(false);
			window.location.href = '/#';
		},
		signIn = () => {
			if (!isEmail(email)) {
				setEmailShake(true);
				setTimeout(() => {
					setEmailShake(false);
				}, 600);
				return;
			}
			if (!password) {
				setPasswordShake(true);
				setTimeout(() => {
					setPasswordShake(false);
				}, 600);
				return;
			}

			setSignInLoad(true);
			const payload = {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password
				})
			};

			fetch(process.env.REACT_APP_SERVER + '/login', payload)
				.then((res) => {
					setSignInLoad(false);
					if (res.status === 200) {
						window.location = '/dashboard';
					}
					else if (res.status === 403) {
						setPasswordShake(true);
						setTimeout(() => {
							setPasswordShake(false);
						}, 600);
					}
					else if (res.status === 404) {
						setEmailShake(true);
						setTimeout(() => {
							setEmailShake(false);
						}, 600);
					}
					else {
						// Error occurred
					}
					return res.text();
				})
				.then((data) => {
					// do something with the data
				});
		},
		signUp = () => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/signup');
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					// new Noty({
					// 	text: xhr.responseText,
					// 	type: (xhr.status === 201) ? 'success' : 'error',
					// 	theme: notyTheme,

					// 	// layout: (screen.width <= 480) ? 'bottomCenter' : 'topRight',
					// 	timeout: 5000
					// }).show();

					if (xhr.status === 201 || xhr.status === 400) {
					// $('#emailLogin').val($('#emailSignUp').val());
					// $('#emailSignUp').val('');

					// $('#passwordLogin').focus();
					// $('#passwordSignUp').val('');
					// $('.overlayContainer').click();
					}
				}
			};

		// xhr.send(JSON.stringify({
		// 	name: $('#nameSignUp').val(),
		// 	email: $('#emailSignUp').val(),
		// 	password: $('#passwordSignUp').val()
		// }));
		};

	return (
		<div className='loginPage'>
			<Backdrop onClick={onBackdropClick} />
			<div className={'mainContainer ' + (showSignUp ? 'signUp' : '')} id='mainContainer'>
				<div className='formContainer signUpContainer'>
					<h1 className='formHeader'>Create Account</h1>
					<div className='socialContainer'>
						<a href='/' className='social'><i className='fab fa-facebook-f' /></a>
						<a href='/' className='social'><i className='fab fa-google-plus-g' /></a>
						<a href='/' className='social'><i className='fab fa-linkedin-in' /></a>
					</div>
					<span>or use your email for registration</span>
					<TextInput type='name' name='name' placeholder='Name' />
					<TextInput type='email' name='email' placeholder='Email' />
					<TextInput type='password' name='password' placeholder='Password' />
					<Button onClick={signUp} label='Sign Up' />
				</div>
				<div className='formContainer signInContainer'>
					<h1 className='formHeader'>Sign in to Firefiles</h1>
					<div className='socialContainer'>
						<a href='/' className='social'><i className='fab fa-facebook-f' /></a>
						<a href='/' className='social'><i className='fab fa-google-plus-g' /></a>
						<a href='/' className='social'><i className='fab fa-linkedin-in' /></a>
					</div>
					<span>or use your account</span>
					<TextInput
						type='email'
						placeholder='Email'
						name='email'
						shake={emailShake}
						value={email}
						onChange={(event) => emailInput(event.target.value)}
					/>
					<TextInput
						type='password'
						placeholder='Password'
						name='password'
						shake={passwordShake}
						value={password}
						onChange={(event) => passwordInput(event.target.value)}
					/>
					<a href='/'>Forgot your password?</a>
					<Button onClick={signIn} label='Sign In' loading={signInLoad} />
				</div>
				<div className={'overlayContainer ' + (animateSlide ? 'animate' : '')} onClick={onOverlayClick}>
					<div className='overlay'>
						<div className='overlayPanel overlayLeft'>
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
						</div>
						<div className='overlayPanel overlayRight'>
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
						</div>
					</div>
					<Button slideButton slideLeft={showSignUp} labels={['Sign up', 'Sign in']} />
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
