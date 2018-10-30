import React, { Component } from 'react';

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
			<div class="col-sm-3 m-3 rounded">
				<div class="card">
					<div class="card-body" key={idx}>
						<h5 class="card-title">{note.title}</h5>
						<p class="card-text">{note.content}</p>
						<a href="#" class="btn btn-primary">More</a>
					</div>
				</div>
			</div>
		)
		return (
			<div class="row">
				{notes.map(toList)}
			</div>
		);
	}
}

export default NoteList;