import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Grid } from '@material-ui/core';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const props = this.props;
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit">
							Keep For You
                		</Typography>
						<div style={{
							marginInlineStart: 60
						}}>
							<Grid container>
								<SearchIcon />
								<InputBase
								// TODO: add onChange handler
									placeholder="Search…"
									color="inherit"
								/>
							</Grid>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NavBar;