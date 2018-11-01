import React, { Component } from 'react';
import './App.css';
import {
	getAttachmentById,
	getBoardById,
	getBoards,
	getNoteByID,
	getNotesByBoardId,
	getSearchNotes
} from './API';
import BoardList from './BoardList';
import NoteList from './NoteList';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Note from './Note';
import { getNotesByBoardIdTemp } from './TempResponses';

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
			selectedBoardIndex: "",
			selectedNoteIndex: "",
			isNoteSelected: false
		};
	}

	handleToSelectBoard = async (idx) => {
		this.setState({ selectedBoardIndex: idx }); // setState is asynchronous
		try {
			const noteList = await getNotesByBoardId(idx);
			this.setState({ noteList: noteList, isNoteSelected: false });
		} catch (e) {
			alert(e);
		}
	}

	handleToSelectNote = (idx) => {
		this.setState({ selectedNoteIndex: idx, isNoteSelected: true });
		window.scrollTo(0, 0);
	}

	async componentDidMount() {
		try {
			let temp_user_id = 'some-owner-id'; //TODO: Change after adding authoriaztion 
			const boardList = await getBoards(temp_user_id);
			this.setState({
				selectedBoardIndex: boardList[0].id
			});
			const noteList = await getNotesByBoardId(this.state.selectedBoardIndex);
			this.setState({ ...this.state, boardList, noteList });
		} catch (e) {
			alert(e);
		}
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
					{!this.state.isNoteSelected && <NoteList notes={this.state.noteList} handleToSelectNote={this.handleToSelectNote.bind(this)} />}
					{this.state.isNoteSelected && <Note note={this.state.noteList[this.state.selectedNoteIndex]} />}
				</Grid>
			</Grid>
		);
	}
}

export default App;
