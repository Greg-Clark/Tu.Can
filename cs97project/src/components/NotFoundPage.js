import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../images/PageNotFound.png'

class NotFoundPage extends React.Component {
	render() {
		return (
			<div>
				<p style={{ textAlign: "center" }}>
					<img src={PageNotFound}  />
				</p>
				<p style={{ textAlign: "center" }}>
					<h1>Sorry this page was not found</h1>
				</p>
				<p style={{ textAlign: "center" }}>
					<Link to="/">Return to Home </Link>
				</p>
			</div>
		);
	}
}

export default NotFoundPage;