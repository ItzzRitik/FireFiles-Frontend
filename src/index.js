import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import './index.scss';
import Homepage from './pages/homepage/Homepage';

import * as serviceWorker from './serviceWorker';

const engine = new Styletron();

ReactDOM.render(
	<StyletronProvider value={engine}>
		<BrowserRouter basename='/'>
			<Switch>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/login' render={() => (<Redirect to='/#login' />)} />
				<Route exact path='/*' render={() => (<Redirect to='/' />)} />
			</Switch>
		</BrowserRouter>
	</StyletronProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
