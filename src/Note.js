import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		const note = this.props.note;

		return (
			<Grid
				item
				md={12} xs={12}
			>
				<Card
					elevation={5}
					style={{
						minHeight: '75vh'
					}}
				>
					<CardContent>
						<TextField
							defaultValue={note.title}>
						</TextField>
						<TextField
							multiline
							defaultValue={note.content}
							rowsMax={30}
							fullWidth>
						</TextField >
					</CardContent>
					<CardActions>	{/*TODO: add save action handle*/}
						<IconButton aria-label="Save">
							<SaveIcon />
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		);
	}
}

export default Note;