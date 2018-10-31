import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown'



class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	onClickCallback(event, idx) {
		this.props.handleToSelectNote(idx);
	}

	render() {
		const { notes } = this.props;
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
					onClick={event => this.onClickCallback(event, idx)}
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
			<Grid container spacing={24}>
				{notes.map(toList)}
			</Grid>
		);
	}
}

export default NoteList;