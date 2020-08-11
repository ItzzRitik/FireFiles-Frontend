import React from 'react';
import socketIO from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

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

let socket;
const Dashboard = () => {
	const history = useHistory(),
		[user, setUser] = React.useState(null),

		[loading, setLoading] = React.useState(true),
		[closeDash, setCloseDash] = React.useState(false),
		[closeContent, setCloseContent] = React.useState(false),
		[searchActive, setSearchActive] = React.useState(false),
		[fabOpen, setFabOpen] = React.useState(false),
		[notification, setNotification] = React.useState(false),
		[showHeader, setShowHeader] = React.useState({ zIndex: 1 }),

		[contentLoading, setContentLoading] = React.useState(true),
		[content, setContent] = React.useState({}),
		[currentDir, setCurrentDir] = React.useState('/'),

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
		},
		upload = (event) => {
			const files = event.target.files;
			if (files.length === 0) return;

			const filesData = _.map(files, (file) => _.pick(file, ['name', 'type'])),
				uploadToS3 = (uploadList) => {
					var formData = new FormData();
					Object.keys(uploadList[0].signedS3.fields).forEach(function (key) {
						formData.append(key, uploadList[0].signedS3.fields[key]);
					});
					formData.append('file', _.find(files, { name: uploadList[0].name }));

					const xhr = new XMLHttpRequest();
					xhr.open('POST', uploadList[0].signedS3.url, true);
					xhr.upload.onprogress = (evt) => {
						if (evt.lengthComputable) {
							var percentComplete = parseInt((evt.loaded / evt.total) * 100);
							console.log('Upload: ' + percentComplete + '% complete');
						}
					};
					xhr.onreadystatechange = function () {
						if (xhr.readyState === XMLHttpRequest.DONE) {
							socket.emit('refreshContent', currentDir);
							console.log(uploadList[0].name, 'Done');

							// Upload next file in queue
							uploadList.shift();
							if (uploadList.length > 0) uploadToS3(uploadList);
						}
					};
					xhr.send(formData);
				};

			socket.emit('getSignedS3', filesData, currentDir, (err, uploadList) => {
				if (err) {
					return console.log('Error Occurred While Uploading', err);
				}

				// Uploading file one by one using recursion
				uploadToS3(uploadList);
			});
		};

	React.useEffect(() => {
		socket = socketIO(process.env.REACT_APP_SERVER, { reconnect: true });
		socket.on('connect', () => {
			console.log('Socket connected');
		});
		socket.on('disconnect', () => {
			console.log('Socket disconnected');
		});
		socket.on('error', (error) => {
			if (error === 'forbidden') {
				history.push('/login');
			}
		});
		socket.on('userData', (user) => {
			if (user) {
				socket.emit('getContent', currentDir);

				setUser(user);
				setLoading(false);
				setNotification(true);

				if (window.innerWidth <= 860) setTimeout(() => setCloseDash(true), 800);
				if (window.innerWidth <= 580) setTimeout(() => setCloseContent(true), 900);
			}
			else history.push('/login');
		});
		socket.on('setContent', (dir, content = []) => {
			console.log(content);
			setContentLoading(false);
			setContent(content);
		});
		socket.on('refreshContent', (dir, content = []) => {
			currentDir === dir && setContent(content);
		});
	}, [history, currentDir]);

	return (
		loading ?
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
								<div className='content'>
									{
										contentLoading ?
											<Loader fullpage /> :
											<div>
												{
													content.folders && content.folders.map((folder, i) => {
														return <center key={i}>[[{folder}]]</center>;
													})
												}
												{
													content.files && content.files.map((file, i) => {
														return <center key={i}>{file.name}</center>;
													})
												}
											</div>
									}
								</div>
								{fabOpen && <Backdrop onClick={() => setFabOpen(false)} />}
								<div className={'new ' + (fabOpen ? 'open' : '')}>
									<div className='fab' onClick={() => setFabOpen(true)} >
										<span style={getMask(Plus)} />
									</div>
									<div className='container'>
										<NewFileMenu create icon={Plus} title='Create' />
										<NewFileMenu upload icon={Cloud} title='Upload' file={upload} />
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
