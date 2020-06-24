import React from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '../../components/base/loader/Loader';
import './Dashboard.scss';

let Dashboard = () => {
	const [isBusy, setBusy] = React.useState(true),
		history = useHistory();

	React.useEffect(() => {
		const payload = {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch(process.env.REACT_APP_SERVER + '/getUser', payload)
			.then((res) => {
				if (res.ok) return res.json();
			}).then((user) => {
				if (user) {
					window.user = user;
					setBusy(false);
				}
				else history.push('/#login');
			}).catch((err) => {
				console.log(err);
			});
	  	}, [history]);

	return (
		isBusy ?
			<Loader fullpage />
			:
			<div className='dashboard'>
				<p onClick={() => {
					history.push('/logout');
				}}
				>Logout from your dashboard</p>
			</div>
	);
};

export default Dashboard;
