import React from 'react';
import socketIO from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import Loader from '../../components/base/loader/Loader';
import Sidebar from '../../components/sidebar/Sidebar';
import Dashbar from '../../components/dashBar/Dashbar';
import './Dashboard.scss';

let Dashboard = () => {
	const [isBusy, setBusy] = React.useState(true),

		[closeDash, setCloseDash] = React.useState(false),
		closeDashClick = () => {
			setCloseDash(!closeDash);
		},
		history = useHistory();

	React.useEffect(() => {
		const socket = socketIO(window.APP_URL, { reconnect: true });
		socket.on('connect', () => {
			console.log('Socket connected');
		});
		socket.on('disconnect', () => {
			console.log('Socket disconnected');
		});
		socket.on('userData', (user) => {
			if (user) {
				window.user = user;
				return setBusy(false);
			}
			history.push('/#login');
		});
		socket.on('error', (error) => {
			if (error === 'forbidden') {
				history.push('/#login');
			}
		});
	}, [history]);

	return (
		isBusy ?
			<Loader fullpage />
			:
			<div className='dashboard'>
				<Sidebar className='sideBar' />
				<div className={'mainPanel ' + (closeDash ? 'close' : '')}>
					<Dashbar closeDashClick={closeDashClick} closeDash={closeDash} />
					<div className='contentPanel'>
						{}
					</div>
				</div>
			</div>
	);
};

export default Dashboard;
