import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.scss';
import LoginModal from '../../components/modal/loginModal/LoginModal';

let Homepage = () => {
	const [showLoginModal, setShowLoginModal] = React.useState(false),
		history = useHistory(),
		hashChange = useCallback(() => {
			if (window.location.hash === '#login') {
				if (window.user) {
					return history.push('/dashboard');
				}

				return setShowLoginModal(true);
			}

			return setShowLoginModal(false);
		}, [history]);

	window.addEventListener('hashchange', hashChange);

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

				hashChange();
			}).catch((err) => {
				hashChange();
			});
	  }, [hashChange]);

	return (
		<div className='homepage'>
			<center> <h1 style={{ margin: '0', cursor: 'pointer' }} onClick={() => {
				history.push('/#login');
				hashChange();
			}}
			         >
				LOGIN</h1> </center>
			{showLoginModal && <LoginModal />}
		</div>
	);
};

export default Homepage;
