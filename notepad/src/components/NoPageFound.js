import React  from 'react';
import {Link} from 'react-router';

const NoPageFound = () => {
  return (
    <div className="container" style = {{textAlign: "center"}}>
      <h3>No Page Found</h3>
      <p style = {{textAlign: "center"}}><Link to="/">Click here to return</Link></p>
    </div>
  );
};

export default NoPageFound
