import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';



class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingNewNote: false
		};
	}

	onClickCallback(idx) {
		this.props.handleToSelectNote(idx);
	}
	onClickAddButtonCallback() {
		this.setState({ isAddingNewNote: true })
		this.props.handleToAddNote();
	}

	render() {
		let style = {
			margin: 0,
			top: 'auto',
			right: 30,
			bottom: 30,
			left: 'auto',
			position: 'fixed',
		};
		const { notes } = this.props;
		console.log(this.props.notes)
		const toList = (note, idx) => (
			<Grid
				key={idx}
				item
				md={3} xs={12}
			>
				<Card
					elevation={5}
					style={{
						minHeight: '20vh'
					}}
					onClick={() => this.onClickCallback(idx)}
				>
					<CardContent>
						<Typography variant="h5" component="h2" >
							{note.title}
						</Typography>
						<ReactMarkdown>
							{note.content}
						</ReactMarkdown>
					</CardContent>
				</Card>
			</Grid>
		)
		return (
			<React.Fragment>
				<Grid container spacing={24}>
					{notes.map(toList)}
				</Grid>
				<Button
					style={style}
					variant="fab"
					color="primary"
					aria-label="Add"
					medium="true"
					onClick={() => this.onClickAddButtonCallback()}
				>
					<AddIcon />
				</Button>
			</React.Fragment>
		);
	}
}

export default NoteList;