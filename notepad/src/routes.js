import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import Notes from './components/Notes'
import App from './components/App'
import NoPageFound from './components/NoPageFound'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Notes}></IndexRoute>
		<Route path='*' exact={true} component={NoPageFound} />
	</Route>
);
