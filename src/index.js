import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './index.scss';
import Homepage from './pages/homepage/Homepage';
import Dashboard from './pages/dashboard/Dashboard';

import * as serviceWorker from './serviceWorker';

const engine = new Styletron();

document.querySelector('.app').classList.add('light');

ReactDOM.render(
	<StyletronProvider value={engine}>
		<BrowserRouter basename='/'>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/login' render={() => (<Redirect to='/#login' />)} />
				<Route exact path='/*' render={() => (<Redirect to='/' />)} />
			</Switch>
		</BrowserRouter>
	</StyletronProvider>,
	document.querySelector('.app')
);

serviceWorker.register();
