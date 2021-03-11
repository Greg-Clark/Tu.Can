import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../images/PageNotFound.png'


function NotFoundPage() {
	return (
		<div>
			<p style={{ textAlign: "center" }}>
				<img src={PageNotFound}  />
			</p>
			<p style={{ textAlign: "center" }}>
				<br/>
				<h1>Sorry this page was not found</h1>
			</p>
			<p style={{ textAlign: "center" }}>
				<br/>
				<button className="buttons" >
					<Link to="/">Return to Home </Link>
				</button>
			</p>
		</div>
	);
} 


export default NotFoundPage;