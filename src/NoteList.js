import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		const { notes } = this.props;
		console.log(notes);
		const toList = (note, idx) => (
			<Grid item xs={3}>
				<Card style={{minHeight: '20vw'}}>
					<CardContent>
						<Typography variant="h5" component="h2" >
							{note.title}
						</Typography>
						<Typography component="p">
							{note.content}
						</Typography>
					</CardContent>
				</Card>
				{/*// <div class="col-sm-3 m-3 rounded">
			// 	<div class="card">
			// 		<div class="card-body" key={idx}>
			// 			<h5 class="card-title">{note.title}</h5>
			// 			<p class="card-text">{note.content}</p>
			// 			<a href="#" class="btn btn-primary">More</a>
			// 		</div>
			// 	</div>
		// </div>*/}
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