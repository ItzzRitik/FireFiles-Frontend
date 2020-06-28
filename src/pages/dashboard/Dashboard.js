import React from 'react';
import socketIO from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import ArrowMono from '../../assets/img/ArrowMono.svg';

import Loader from '../../components/base/loader/Loader';
import Sidebar from '../../components/sidebar/Sidebar';
import Dashbar from '../../components/dashBar/Dashbar';
import TextInput from '../../components/base/textInput/TextInput';

import './Dashboard.scss';

let Dashboard = () => {
	const history = useHistory(),
		[isBusy, setBusy] = React.useState(true),
		[closeDash, setCloseDash] = React.useState(false),
		[closeContent, setCloseContent] = React.useState(false),

		closeButtonMask = {
			maskImage: 'url(' + ArrowMono + ')',
			WebkitMaskImage: 'url(' + ArrowMono + ')'
		},

		closeDashClick = () => setCloseDash(!closeDash),
		closeContentClick = () => setCloseContent(!closeContent);

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
				setBusy(false);

				if (window.innerWidth <= 760) setTimeout(() => setCloseDash(true), 800);
				if (window.innerWidth <= 560) setTimeout(() => setCloseContent(true), 900);
			}
			else history.push('/#login');
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
					<Dashbar closeDashClick={closeDashClick} closeDash={closeDash} closeButtonMask={closeButtonMask} />
					<div className={'contentPanel ' + (closeContent ? 'close' : '')}>
						<div className='header'>
							<div className='closeContent' onClick={closeContentClick}>
								<span className={closeContent ? 'open' : ''} style={closeButtonMask} />
							</div>
							<TextInput className='searchBar' placeholder='Search' icon search />
							<div className='welcomeUser' >
								<div className='notification' >
									<span />
								</div>
								<span className='greeting' />
								<span className='profile'
									style={{ backgroundImage: 'url(' + 'https://avatars3.githubusercontent.com/u/24320496?s=460&u=2f167cc90e572d85bae7a4816d781b6391212aed&v=4' + ')' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Dashboard;
