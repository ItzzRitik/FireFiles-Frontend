import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './Homepage.scss';
import LoginModal from '../../components/modal/loginModal/LoginModal';

let Homepage = () => {
	const [loginModalAction, setLoginModalAction] = React.useState(null),
		history = useHistory(),
		{ action } = useParams(),
		setAction = useCallback(() => {
			if (!action) {
				return setLoginModalAction(null);
			}
			else if (action === 'login' || action === 'signup') {
				if (window.user) {
					return history.push('/dashboard');
				}

				return setLoginModalAction(action);
			}
			else if (action === 'logout') {
				const payload = {
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' }
				};
				fetch(window.APP_URL + '/logout', payload)
					.then((response) => {
						window.user = null;

						if (response.ok) return history.push('/');

						history.push('/login');
					});
			}
			else {
				return setLoginModalAction(null);
			}
		}, [history, action]);

	React.useEffect(() => {
		const payload = {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch(window.APP_URL + '/getUser', payload)
			.then((res) => {
				if (res.status === 200) return res.json();
			}).then((user) => {
				if (user) window.user = user;

				setAction();
			}).catch((err) => {
				setAction();
			});
	  }, [setAction]);

	return (
		<div className='homepage'>
			<center> <h1 style={{ margin: '0', cursor: 'pointer' }} onClick={() => history.push('/login')}>LOGIN</h1> </center>
			<center> <h1 style={{ margin: '0', cursor: 'pointer' }} onClick={() => history.push('/signup')}>SIGNUP</h1> </center>
			<LoginModal action={loginModalAction} />
		</div>
	);
};

export default Homepage;
