import React from 'react';
import './Dashboard.scss';

let Dashboard = () => {
	const [isBusy, setBusy] = React.useState(true);

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
				if (user) {
					window.user = user;
					setBusy(false);
				}
				else window.location = '/#login';
			});
	  }, []);
	return (
		<div className='dashboard' >
			{
				isBusy ?
					<div>Loading</div>
					:
					<div>This is your dashboard</div>
			}
		</div>
	);
};

export default Dashboard;
