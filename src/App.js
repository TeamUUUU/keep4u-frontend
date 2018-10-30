import React, { Component } from 'react';
import './App.css';
import { getBoardsTemp, getNotesByBoardID } from './TempResponses';
import BoardList from './BoardList';
import NoteList from './NoteList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardList: [{
				id: "",
				title: "",
				description: ""
			}],
			noteList: [{
				id: "",
				board_id: "",
				title: "",
				content: "",
				created_at: 0,
				attachments: []
			}]
		};
	}
	componentDidMount() {
		const boardList = getBoardsTemp(); // temporary method until server is down
		const noteList = getNotesByBoardID(boardList[0].id);
		this.setState({ ...this.state, boardList, noteList });
	}

	render() {
		console.log(this.state.boardList)
		return (
			<div id="wrapper" class="animate">
				<nav class="navbar sticky-top navbar-dark bg-dark">
					<h2 class="navbar-brand text-success">Keep For You</h2>
					<form class="form-inline">
						<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
				</nav>

				<div class="row">
					<div class="col-3">
						<BoardList boards={this.state.boardList} />
					</div>
					<div class="col-9">
						{<NoteList notes={this.state.noteList} />}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
