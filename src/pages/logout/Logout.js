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
		fetch(process.env.REACT_APP_SERVER + '/logout', payload)
			.then((response) => {
				if (response.ok) return history.push('/');

				history.push('/#login');
			});
	  	}, [history]);

	return (
		<Loader fullpage />
	);
};

export default Logout;
