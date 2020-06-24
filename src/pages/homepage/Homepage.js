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
		fetch(process.env.REACT_APP_SERVER + '/getUser', payload)
			.then((response) => {
				if (response.ok) return response.json();
			}).then((user) => {
				if (user) window.user = user;
				hashChange();
			}).catch(() => {
				hashChange();
			});
	  }, [hashChange]);

	return (
		<div className='homepage'>
			<center> <a href='#login'>LOGIN</a> </center>
			{showLoginModal && <LoginModal />}
		</div>
	);
};

export default Homepage;
