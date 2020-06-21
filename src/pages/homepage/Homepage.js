import React from 'react';
import './Homepage.scss';

import LoginModal from '../../components/modal/loginModal/LoginModal';

let Homepage = () => {
	let [showLoginModal, setShowLoginModal] = React.useState(false),
		hashChange = () => {
			console.log(window.location.hash);
			if (window.location.hash === '#login') {
				if (window.user) {
					window.location = '/dashboard';
					return;
				}

				setShowLoginModal(true);
				return;
			}

			setShowLoginModal(false);
		};

	window.addEventListener('hashchange', hashChange);
	React.useEffect(() => {
		hashChange();
	});

	return (
		<div className='homepage'>
			<marquee>
				<a href='#login'>LOGIN</a>
			</marquee>
			<LoginModal show={showLoginModal} />
		</div>
	);
};

export default Homepage;
