import React, { Component } from 'react';
import './App.css';
import { getBoardsTemp, getNotesByBoardID } from './TempResponses';
import BoardList from './BoardList';
import NoteList from './NoteList';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Note from './Note';

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
			}],
			selectedBoardIndex: 0,
			selectedNoteIndex: 0,
			isNoteSelected: false,
		};
	}

	handleToSelectBoard = (idx) => {
		this.setState({ selectedBoardIndex: idx }); // setState is asynchronous
		const noteList = getNotesByBoardID(idx);
		this.setState({ noteList: noteList, isNoteSelected: false });
	}

	handleToSelectNote = (idx) => {
		this.setState({ selectedNoteIndex: idx, isNoteSelected: true});
	}

	componentDidMount() {
		// temporary methods until server is down
		const boardList = getBoardsTemp();
		const noteList = getNotesByBoardID(this.state.selectedBoardIndex); // TODO: set selectedIdx based on data recieved from server
		this.setState({ ...this.state, boardList, noteList });
	}

	render() {
		return (
			<Grid container spacing={24} style={{ width: '100%' }}>
				<Grid item md={12} xs={12}>
					<NavBar />
				</Grid>
				<Grid item md={2} xs={6}>
					<BoardList boards={this.state.boardList} handleToSelectBoard={this.handleToSelectBoard.bind(this)} />
				</Grid>
				<Grid item md={10} xs={6}>
					{!this.state.isNoteSelected && <NoteList notes={this.state.noteList} handleToSelectNote={this.handleToSelectNote.bind(this)}/>}
					{this.state.isNoteSelected && <Note  note={this.state.noteList[this.state.selectedNoteIndex]}/>}
				</Grid>
			</Grid>
		);
	}
}

export default App;
