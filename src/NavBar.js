import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Grid, OutlinedInput } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

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

						<Grid
							container
							alignItems='baseline'
							justify='space-between'
						>
							<Grid item>
								<Typography variant="title" color="inherit">
									Keep4u
                				</Typography>
							</Grid>
							{/* <Grid item>
								<InputBase
									// TODO: add onChange handler
									placeholder="Search…"
									style={{
										marginRight: '0.3rem',
										width: '100%',
										backgroundColor: fade('#ffffff', 0.2),
										borderRadius: '0.5rem',
										borderColor: '#ffffff',
										paddingLeft: '0.5rem',
									}}
								/>
							</Grid> */}
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default NavBar;