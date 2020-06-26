import React from 'react';
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

import './LoginModal.scss';
import Arrow from '../../../assets/img/Arrow.svg';
import Cross from '../../../assets/img/Cross.svg';

import Backdrop from '../../base/backdrop/Backdrop';
import TextInput from '../../base/textInput/TextInput';
import Button from '../../base/button/Button';

const LoginModal = (props) => {
	const [showSignUp, setShowSignUp] = React.useState(false),
		[animateSlide, setAnimateSlide] = React.useState(false),

		[email, emailInput] = React.useState(''),
		[password, passwordInput] = React.useState(''),
		[emailShake, setEmailShake] = React.useState(false),
		[passwordShake, setPasswordShake] = React.useState(false),
		[signInLoad, setSignInLoad] = React.useState(false),

		[name, nameInput] = React.useState(''),
		[emailSignUp, emailSignUpInput] = React.useState(''),
		[passwordSignUp, passwordSignUpInput] = React.useState(''),
		[nameShake, setNameShake] = React.useState(false),
		[emailSignUpShake, setEmailSignUpShake] = React.useState(false),
		[passwordSignUpShake, setPasswordSignUpShake] = React.useState(false),
		[signUpLoad, setSignUpLoad] = React.useState(false),

		history = useHistory(),
		backButtonMask = {
			maskImage: 'url(' + (showSignUp ? Arrow : Cross) + ')',
			WebkitMaskImage: 'url(' + (showSignUp ? Arrow : Cross) + ')'
		},

		onBackClicked = () => {
			if (showSignUp) return onOverlayClick();
			onBackdropClick();
		},
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
				}, 650);
				return;
			}
			if (!password) {
				setPasswordShake(true);
				setTimeout(() => {
					setPasswordShake(false);
				}, 650);
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
						setTimeout(() => history.push('/dashboard'), 300);
					}
					else if (res.status === 403) {
						setPasswordShake(true);
						setTimeout(() => setPasswordShake(false), 600);
					}
					else if (res.status === 404) {
						setEmailShake(true);
						setTimeout(() => setEmailShake(false), 600);
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
			if (!name) {
				setNameShake(true);
				setTimeout(() => setNameShake(false), 600);
				return;
			}
			if (!isEmail(emailSignUp)) {
				setEmailSignUpShake(true);
				setTimeout(() => setEmailSignUpShake(false), 600);
				return;
			}
			if (!passwordSignUp.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
				setPasswordSignUpShake(true);
				setTimeout(() => setPasswordSignUpShake(false), 600);
				return;
			}

			setSignUpLoad(true);
			const payload = {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: name,
					email: emailSignUp,
					password: passwordSignUp
				})
			};

			fetch(process.env.REACT_APP_SERVER + '/signup', payload)
				.then((res) => {
					setSignUpLoad(false);
					console.log(res.status);
					if (res.status === 201 || res.status === 400) {
						emailInput(emailSignUp);
						emailSignUpInput('');
						passwordSignUpInput('');
						passwordInput('');
						setShowSignUp(false);
					}
					return res.text();
				})
				.then((data) => {
					// do something with the data
					console.log(data);
				});
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
					<TextInput
						type='text'
						autoComplete='name'
						placeholder='Name'
						icon
						shake={nameShake}
						value={name}
						onChange={(event) => nameInput(event.target.value)}
					/>
					<TextInput
						type='email'
						autoComplete='off'
						placeholder='Email'
						icon
						shake={emailSignUpShake}
						value={emailSignUp}
						onChange={(event) => emailSignUpInput(event.target.value)}
					/>
					<TextInput
						type='password'
						autoComplete='off'
						placeholder='Password'
						icon
						shake={passwordSignUpShake}
						value={passwordSignUp}
						onChange={(event) => passwordSignUpInput(event.target.value)}
					/>
					<div className='buttonContainer'>
						<Button onClick={signUp} label='Sign Up' loading={signUpLoad} />
					</div>
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
						autoComplete='email'
						placeholder='Email'
						icon
						shake={emailShake}
						value={email}
						onChange={(event) => emailInput(event.target.value)}
					/>
					<TextInput
						type='password'
						autoComplete='password'
						placeholder='Password'
						icon
						shake={passwordShake}
						value={password}
						onChange={(event) => passwordInput(event.target.value)}
					/>
					<a href='/'>Forgot your password?</a>
					<div className='buttonContainer'>
						<Button onClick={signIn} label='Sign In' loading={signInLoad} />
					</div>
				</div>
				<div className='loginNav' >
					<div className='backButton' style={backButtonMask} onClick={onBackClicked} />
					{ !showSignUp && <Button size='sm' outline label='Create Account' onClick={onOverlayClick} /> }
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
