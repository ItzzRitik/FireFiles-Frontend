import React from 'react';
import { useHistory } from 'react-router-dom';

import './Logout.scss';
import Loader from '../../components/base/loader/Loader';

let Logout = () => {
	let history = useHistory();

	React.useEffect(() => {
		const payload = {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch(window.APP_URL + '/logout', payload)
			.then((response) => {
				window.user = null;

				if (response.ok) return history.push('/');

				history.push('/#login');
			});
	  	}, [history]);

	return (
		<Loader fullpage />
	);
};

export default Logout;
