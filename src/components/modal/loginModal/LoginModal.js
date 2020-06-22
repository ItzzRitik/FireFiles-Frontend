import React from 'react';
import Noty from 'noty';

// import Axios from 'axios';

import './LoginModal.scss';
import Backdrop from '../../base/backdrop/Backdrop';
import TextInput from '../../base/textInput/TextInput';

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

		notyTheme = 'relax',
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
				.then((response) => response)
				.then((data) => {
					console.log(data);

					// new Noty({
					// 	text: (xhr.status === 200) ? 'Yayy! Successfully logged in!' : xhr.responseText,
					// 	type: (xhr.status === 200) ? 'success' : 'error',
					// 	theme: notyTheme,

					// 	// layout: (screen.width <= 480) ? 'bottomCenter' : 'topRight',
					// 	timeout: 5000
					// }).show();
				});

			// Axios.post(process.env.REACT_APP_SERVER + '/login', {
			// 	email: email,
			// 	password: password
			// }).then(function (response) {
			// 	console.log('Response -> ', response);
			// }).catch(function (error) {
			// 	console.log('Error -> ', error);
			// });

			// const xhr = new XMLHttpRequest();
			// xhr.open('POST', process.env.REACT_APP_SERVER + '/login');
			// xhr.setRequestHeader('Content-type', 'application/json');
			// xhr.onreadystatechange = function () {
			// 	if (xhr.readyState === XMLHttpRequest.DONE) {
			// new Noty({
			// 	text: (xhr.status === 200) ? 'Yayy! Successfully logged in!' : xhr.responseText,
			// 	type: (xhr.status === 200) ? 'success' : 'error',
			// 	theme: notyTheme,

			// 	// layout: (screen.width <= 480) ? 'bottomCenter' : 'topRight',
			// 	timeout: 5000
			// }).show();

			// 		if (xhr.status === 200) {
			// 			setTimeout(function () {
			// 				window.location = '/dashboard';
			// 			}, 2000);
			// 		}
			// 		else if (xhr.status === 403) {
			// 		// Incorrect password
			// 		}
			// 		else if (xhr.status === 404) {
			// 		// User not found
			// 		}
			// 		else {
			// 		// Error occurred
			// 		}
			// 	}
			// };
			// xhr.send(JSON.stringify({
			// 	email: email,
			// 	password: password
			// }));
		},
		signUp = () => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/signup');
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					new Noty({
						text: xhr.responseText,
						type: (xhr.status === 201) ? 'success' : 'error',
						theme: notyTheme,

						// layout: (screen.width <= 480) ? 'bottomCenter' : 'topRight',
						timeout: 5000
					}).show();

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
					<button className='signButton' id='signUp' onClick={signUp}>Sign Up</button>
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
					<button className='signButton' id='signIn' onClick={signIn}>Sign In</button>
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
					<button className='signButton slide'>
						<p>Sign up</p>
						<p>Sign in</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
