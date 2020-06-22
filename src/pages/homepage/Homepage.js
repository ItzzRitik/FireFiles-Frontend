import React from 'react';
import './Homepage.scss';

import LoginModal from '../../components/modal/loginModal/LoginModal';

let Homepage = () => {
	let [showLoginModal, setShowLoginModal] = React.useState(false),
		hashChange = () => {
			if (window.location.hash === '#login') {
				if (window.user) {
					window.location = '/dashboard';
					return;
				}

				return setShowLoginModal(true);
			}

			return setShowLoginModal(false);
		};

	window.addEventListener('hashchange', hashChange);
	React.useEffect(() => {
		const payload = {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch(process.env.REACT_APP_SERVER + '/getUser', payload)
			.then((response) => {
				if (response.status == 200) return response.json();
			}).then((user) => {
				if (user) window.user = user;

				hashChange();
			});
	  }, []);

	return (
		<div className='homepage'>
			<center> <a href='#login'>LOGIN</a> </center>
			{showLoginModal && <LoginModal />}
		</div>
	);
};

export default Homepage;
