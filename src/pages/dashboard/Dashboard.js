import React from 'react';
import socketIO from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import ArrowMono from '../../assets/img/ArrowMono.svg';
import Bell from '../../assets/img/Bell.svg';

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
		[searchFocus, setSearchFocus] = React.useState(false),

		closeButtonMask = {
			maskImage: 'url(' + ArrowMono + ')',
			WebkitMaskImage: 'url(' + ArrowMono + ')'
		},

		searchFocused = () => {
			if (window.innerWidth <= 860) setSearchFocus(!searchFocus);
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

				if (window.innerWidth <= 860) setTimeout(() => setCloseDash(true), 800);
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
						<div className={'header ' + (searchFocus ? 'searchFocused ' : '')}>
							<div className='closeContent' onClick={closeContentClick}>
								<span className={closeContent ? 'open' : ''} style={closeButtonMask} />
							</div>
							<TextInput className='searchBar' placeholder='Search' onFocus={searchFocused} icon search />
							<div className='welcomeUser' >
								<div className='notification' >
									<span style={{ backgroundImage: 'url(' + Bell + ')' }} />
								</div>
								<span className='profile' style={{ backgroundImage: 'url(' + window.user.picture + ')' }} />
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Dashboard;
