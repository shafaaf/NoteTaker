import React  from 'react';
import {Link} from 'react-router';

const App = (props) => {
	return (
		<div>
			<h1 style = {{textAlign: "center"}}>Shafaafs sticky notes</h1>
			{props.children}
		</div>
	);
};

export default App;
