import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';

import './Homepage.scss';
import Loader from '../../components/base/loader/Loader';
import PageNotFound from '../../components/pageNotFound/PageNotFound';
import LoginModal from '../../components/modal/loginModal/LoginModal';

let Homepage = () => {
	const history = useHistory(),
		{ action } = useParams(),
		[isBusy, setBusy] = React.useState(true),
		[currUser, setCurrUser] = React.useState(null),
		[homePageState, setHomePageState] = React.useState(null),

		setAction = useCallback(() => {
			if (!action) {
				setHomePageState(null);
				setBusy(false);
			}
			else if (action === 'login' || action === 'signup') {
				if (!_.isEmpty(currUser)) {
					return history.push('/dashboard');
				}

				setHomePageState(action);
				setBusy(false);
			}
			else if (action === 'logout') {
				const payload = {
					method: 'POST',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' }
				};
				fetch(window.APP_URL + '/logout', payload)
					.then((response) => {
						setCurrUser(null);
						setBusy(false);

						if (response.ok) return history.push('/');

						return history.push('/login');
					});
			}
			else {
				setHomePageState('404');
				setBusy(false);
			}
		}, [history, action, currUser]);

	React.useEffect(() => {
		if (currUser) return setAction();

		const payload = {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch(window.APP_URL + '/getUser', payload)
			.then((res) => {
				if (res.status === 200) return res.json();
			}).then((user) => {
				setCurrUser(user ? user : {});

				setAction();
			}).catch((err) => {
				setAction();
			});
	  }, [setAction, currUser]);

	return (
		isBusy ? <Loader fullpage /> : (homePageState === '404') ?
			<PageNotFound /> :
			<div className='homepage'>
				<center> <h1 style={{ margin: '0', cursor: 'pointer' }} onClick={() => history.push('/login')}>
					LOGIN</h1> </center>
				<center> <h1 style={{ margin: '0', cursor: 'pointer' }} onClick={() => history.push('/signup')}>
					SIGNUP</h1> </center>
				<LoginModal action={homePageState} />
			</div>
	);
};

export default Homepage;
