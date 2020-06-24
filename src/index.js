import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';
import Logout from './pages/logout/Logout';

let changeTheme = (accent) => {
	document.querySelector('.app').classList.toggle('dark');
	document.querySelector('.app').classList.toggle(accent);
};
window.changeTheme = changeTheme;

console.log('Re-Rendered');

ReactDOM.render(
	<StyletronProvider value={new Styletron()}>
		<BrowserRouter basename='/'>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/logout' component={Logout} />
				<Route exact path='/login' render={() => (<Redirect to='/#login' />)} />
				<Route exact path='/*' render={() => {
					return (<div>You are lost</div>);
				}}
				/>
			</Switch>
		</BrowserRouter>
	</StyletronProvider>,
	document.querySelector('.app')
);

serviceWorker.register();
