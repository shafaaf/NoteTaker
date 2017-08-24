import React  from 'react';
import {Link} from 'react-router';

const App = (props) => {
  return (
    <div className="container">
      <h1>Shafaaf Notes</h1>
      {/* Each smaller components */}
      {props.children}
    </div>
  );
};

export default App
