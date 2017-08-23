import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './components/HomePage'
import Notes from './components/notes/BookPage'

import App from './components/App'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home}></IndexRoute>
		<Route path="/notes" component={Notes}></Route>
	</Route>
);
