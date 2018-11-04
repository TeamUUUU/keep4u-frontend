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
			note: {
				id: "",
				board_id: "",
				title: "",
				content: "",
				created_at: 0,
				attachments: []
			}
		};
	}

	componentDidMount() {
		this.setState({ note: this.props.note });
	}

	onChangeTitleCallBack(value) {
		let note = this.props.note;
		note.title = value;
		this.setState({ note: note });
	}

	onChangeContentCallBack(value) {
		let note = this.props.note;
		note.content = value;
		this.setState({ note: note });
	}

	onClickSaveButtonCallback() {
		this.props.handleSaveNote(this.state.note);
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
							defaultValue={note.title}
							onChange={(event) => this.onChangeTitleCallBack(event.target.value)}
						>
						</TextField>
						<TextField
							multiline
							defaultValue={note.content}
							rowsMax={30}
							fullWidth
							onChange={(event) => this.onChangeContentCallBack(event.target.value)}
						>
						</TextField >
					</CardContent>
					<CardActions>	
						<IconButton
							aria-label="Save"
							onClick={() => this.onClickSaveButtonCallback()}
						>
							<SaveIcon />
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		);
	}
}

export default Note;