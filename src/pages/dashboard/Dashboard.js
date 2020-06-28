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
		[user, setUser] = React.useState(null),
		[isBusy, setBusy] = React.useState(true),
		[closeDash, setCloseDash] = React.useState(false),
		[closeContent, setCloseContent] = React.useState(false),
		[searchFocus, setSearchFocus] = React.useState(false),
		[pendingNotification, setPendingNotification] = React.useState(false),

		getMask = (icon) => {
			return {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')'
			};
		},
		getProfilePicture = () => {
			if (user.picture) return { backgroundImage: 'url(' + user.picture + ')' };
			console.log(user.picture);
		},

		searchFocused = () => {
			if (window.innerWidth <= 860) setSearchFocus(!searchFocus);
		},
		bellClick = () => setPendingNotification(!pendingNotification),
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
				setUser(user);
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
					<Dashbar closeDashClick={closeDashClick} closeDash={closeDash} closeButtonMask={getMask(ArrowMono)} />
					<div className={'contentPanel ' + (closeContent ? 'close' : '')}>
						<div className={'header ' + (searchFocus ? 'searchFocused ' : '')}>
							<div className='closeContent' onClick={closeContentClick}>
								<span className={closeContent ? 'open' : ''} style={getMask(ArrowMono)} />
							</div>
							<TextInput className='searchBar' placeholder='Search' onFocus={searchFocused} icon search />
							<div className='welcomeUser' >
								<div className='notification' onClick={bellClick}>
									<span className='icon' style={getMask(Bell)} />
									{pendingNotification && <span className='alert' />}
								</div>
								<span className='profile' style={getProfilePicture()} />
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Dashboard;
