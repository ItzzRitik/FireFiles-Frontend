import React from 'react';
import socketIO from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import ArrowMono from '../../assets/img/ArrowMono.svg';
import Bell from '../../assets/img/Bell.svg';
import Plus from '../../assets/img/Plus.svg';
import Cloud from '../../assets/img/Cloud.svg';

import Loader from '../../components/base/loader/Loader';
import Sidebar from '../../components/sidebar/Sidebar';
import Dashbar from '../../components/dashBar/Dashbar';
import OptionSheet from '../../components/optionSheet/OptionSheet';
import NewFileMenu from '../../components/newFileMenu/NewFileMenu';
import Backdrop from '../../components/base/backdrop/Backdrop';
import SearchButton from '../../components/base/searchButton/SearchButton';

import './Dashboard.scss';

let Dashboard = () => {
	const history = useHistory(),
		[user, setUser] = React.useState(null),
		[isBusy, setBusy] = React.useState(true),
		[closeDash, setCloseDash] = React.useState(false),
		[closeContent, setCloseContent] = React.useState(false),
		[searchActive, setSearchActive] = React.useState(false),
		[fabOpen, setFabOpen] = React.useState(false),
		[notification, setNotification] = React.useState(false),
		[showHeader, setShowHeader] = React.useState({ zIndex: 1 }),

		// For Option Sheet
		[closeSheet, setCloseSheet] = React.useState(true),
		[sheet, setSheet] = React.useState(''),

		getMask = (icon) => {
			return {
				maskImage: 'url(' + icon + ')',
				WebkitMaskImage: 'url(' + icon + ')'
			};
		},
		closeDashClick = () => setCloseDash(!closeDash),
		closeContentClick = () => {
			if (window.innerWidth <= 580) setCloseDash(!closeContent);

			setCloseContent(!closeContent);
		},
		closeSheetClick = () => setCloseSheet(true),
		showSheet = (newSheet) => {
			setSheet(newSheet);

			if (newSheet === sheet) setCloseSheet(!closeSheet);
			else setCloseSheet(false);
		},
		onFirePanelScroll = (event) => {
			const target = event.target;
			if (target.scrollTop >= 25) setShowHeader({ zIndex: 0 });
			else setShowHeader({ zIndex: 1 });
		};

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
				setNotification(true);

				if (window.innerWidth <= 860) setTimeout(() => setCloseDash(true), 800);
				if (window.innerWidth <= 580) setTimeout(() => setCloseContent(true), 900);
			}
			else history.push('/login');
		});
		socket.on('error', (error) => {
			if (error === 'forbidden') {
				history.push('/login');
			}
		});
	}, [history]);

	return (
		isBusy ?
			<Loader fullpage /> :
			<div className='dashboard'>
				<Sidebar className='sideBar' />
				<div className={'mainArea ' + (closeDash ? 'close' : '')}>
					<Dashbar closeDashClick={closeDashClick} closeDash={closeDash} closeButtonMask={getMask(ArrowMono)} />
					<div className={'contentPanel ' + (closeContent ? 'close' : '')}>
						<div className='mainPanel'>
							<div className={'header ' + (searchActive ? 'searchFocused ' : '')} style={showHeader}>
								<div className='closeContent' onClick={closeContentClick}>
									<span className={closeContent ? 'open' : ''} style={getMask(ArrowMono)} />
								</div>

								<div className='options' >
									<SearchButton setSearchActive={setSearchActive} />
									<div className='notification' onClick={() => showSheet('Notifications')}>
										<div />
										<span className={'icon ' + (notification ? 'ring' : '')} style={getMask(Bell)} />
										{notification && <span className='alert' />}
									</div>
									<span className='profile' style={{ backgroundImage: 'url(' + user.picture + ')' }}
										onClick={() => showSheet('Profile')}
									/>
								</div>
							</div>
							<div className='firePanel' onScroll={onFirePanelScroll}>
								<div className='content' />
								{fabOpen && <Backdrop onClick={() => setFabOpen(false)} />}
								<div className={'new ' + (fabOpen ? 'open' : '')}>
									<div className='fab' onClick={() => setFabOpen(true)} >
										<span style={getMask(Plus)} />
									</div>
									<div className='container'>
										<NewFileMenu create icon={Plus} title='Create' />
										<NewFileMenu upload icon={Cloud} title='Upload' />
									</div>
								</div>
							</div>
						</div>
						<OptionSheet closeIcon={getMask(ArrowMono)} closeClick={closeSheetClick} close={closeSheet}
							sheet={sheet} user={user}
						/>
					</div>
				</div>
			</div>
	);
};

export default Dashboard;
