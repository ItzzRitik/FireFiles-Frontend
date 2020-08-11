import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';

let changeTheme = (accent) => {
	document.querySelector('.app').classList.toggle('dark');
	document.querySelector('.app').classList.toggle(accent);
};
window.changeTheme = changeTheme;

ReactDOM.render(
	<StyletronProvider value={new Styletron()}>
		<BrowserRouter basename='/'>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/:action' component={Homepage} />
			</Switch>
		</BrowserRouter>
	</StyletronProvider>,
	document.querySelector('.app')
);

serviceWorker.register();
