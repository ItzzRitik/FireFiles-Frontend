import React from 'react';

import './LoginModal.scss';
import Backdrop from '../../base/backdrop/Backdrop';
import TextInput from '../../base/textInput/TextInput';
import Button from '../../base/button/Button';

let LoginModal = (props) => {
	let [showSignUp, setShowSignUp] = React.useState(false),
		[animateSlide, setAnimateSlide] = React.useState(false),

		// [name, nameInput] = React.useState({ type: 'text' }),
		// [emailSignUp, emailSignUpInput] = React.useState({ type: 'text' }),
		// [passwordSignUp, passwordSignUpInput] = React.useState({ type: 'text' }),

		[email, emailInput] = React.useState({ type: 'text' }),
		[password, passwordInput] = React.useState({ type: 'text' }),

		onOverlayClick = () => {
			setAnimateSlide(true);
			setShowSignUp(!showSignUp);
		},
		onBackdropClick = () => {
			setAnimateSlide(false);
			window.location.href = '/#';
		},
		signIn = () => {
			console.log(process.env.REACT_APP_SERVER + '/login');
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
					if (res.status === 200) {
						window.location = '/dashboard';
					}
					else if (res.status === 403) {
						// Incorrect password
					}
					else if (res.status === 404) {
						// User not found
					}
					else {
						// Error occurred
					}
					// eslint-disable-next-line no-alert
					return res.text();
				})
				.then((data) => {
					console.log(data);
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
						onChange={(event) => emailInput(event.target.value)}
					/>
					<TextInput
						type='password'
						placeholder='Password'
						name='password'
						onChange={(event) => passwordInput(event.target.value)}
					/>
					<a href='/'>Forgot your password?</a>
					<Button onClick={signIn} label='Sign In' />
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
					<Button slideButton animate={animateSlide} labels={['Sign up', 'Sign in']} />
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
