import React, { Component } from 'react';
import './App.css';

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/*  */}
				<Grid>
					<Row className="show-grid">
						<Col md={2}>
							{'<Col md={2} />'}
						</Col>	
						<Col md={10}>
							{'<Col md={10} />'}
						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
}

export default App;
