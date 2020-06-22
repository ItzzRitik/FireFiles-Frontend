import React from 'react';
import './LoginModal.scss';
import Backdrop from '../../base/backdrop/Backdrop';

let LoginModal = (props) => {
	let [showSignUp, setShowSignUp] = React.useState(false),
		[animateSlide, setAnimateSlide] = React.useState(false),
		onOverlayClick = () => {
			setAnimateSlide(true);
			setShowSignUp(!showSignUp);
		},
		onBackdropClick = () => {
			setAnimateSlide(false);
			window.location.href = '/#';
		};

	return (
		<div className='loginPage'>
			<Backdrop onClick={onBackdropClick} />
			<div className={'mainContainer ' + (showSignUp ? 'signUp' : '')} id='mainContainer'>
				<div className='formContainer signUpContainer'>
					<h1 className='formHeader'>Create Account</h1>
					<div className='socialContainer'>
						<a className='social'><i className='fab fa-facebook-f' /></a>
						<a className='social'><i className='fab fa-google-plus-g' /></a>
						<a className='social'><i className='fab fa-linkedin-in' /></a>
					</div>
					<span>or use your email for registration</span>
					<input id='nameSignUp' type='text' placeholder='Name' />
					<input id='emailSignUp' type='email' placeholder='Email' />
					<input id='passwordSignUp' type='password' placeholder='Password' />
					<button className='signButton' id='signUp'>Sign Up</button>
				</div>
				<div className='formContainer signInContainer'>
					<h1 className='formHeader'>Sign in to Firefiles</h1>
					<div className='socialContainer'>
						<a className='social'><i className='fab fa-facebook-f' /></a>
						<a className='social'><i className='fab fa-google-plus-g' /></a>
						<a className='social'><i className='fab fa-linkedin-in' /></a>
					</div>
					<span>or use your account</span>
					<input id='emailLogin' type='email' placeholder='Email' />
					<input id='passwordLogin' type='password' placeholder='Password' />
					<a>Forgot your password?</a>
					<button className='signButton' id='signIn'>Sign In</button>
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
