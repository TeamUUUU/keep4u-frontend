import React, { Component } from 'react';
import './App.css';
import {
	getAttachmentById,
	getBoardById,
	getBoards,
	getNoteByID,
	getNotesByBoardId,
	getSearchNotes,
	postNewNote,
	putNote
} from './API';
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
			selectedBoardId: "",
			selectedNoteId: "",
			isNoteSelected: false,
			isAddingNote: false
		};
	}

	handleToSelectBoard = async (id) => {
		this.setState({ selectedBoardId: id }); // setState is asynchronous
		try {
			const noteList = await getNotesByBoardId(id);
			this.setState({ noteList: noteList, isNoteSelected: false, isAddingNote: false });
		} catch (e) {
			alert(e);
		}
	}

	handleToSelectNote = (idx) => {
		this.setState({ selectedNoteId: idx, isNoteSelected: true });
		window.scrollTo(0, 0);
	}

	handleToAddNote = () => {
		this.setState({ isAddingNote: true });
		window.scrollTo(0, 0);
	}

	handleToDeleteNote = (idx) => {
		try {
			// deleteNote(id); //TODO: delete from server
			let updatedNoteList = this.state.noteList;
			updatedNoteList.splice(idx, 1);
			this.setState({ noteList: updatedNoteList });
		} catch (e) {
			alert(e);
		}
	}

	handleToAddBoard = (title) => {
		try {
			let newBoard = {
				id: "",
				title: title,
				description: ""
			}
			//let newBoard = addBoard(id); //TODO: add to server
			let updatedBoardList = this.state.boardList;
			updatedBoardList.unshift(newBoard);
			this.setState({ boardList: updatedBoardList });
		} catch (e) {
			alert(e);
		}
	}

	handleSaveNote = async (note) => {
		if (this.state.isAddingNote) {
			try {
				const newNote = await postNewNote(note, this.state.selectedBoardId);
				let noteList = this.state.noteList;
				noteList.push(newNote);
				this.setState({ noteList: noteList, isNoteSelected: false, isAddingNote: false });
			} catch (e) {
				alert(e);
			}
		}
		else if (!this.state.isAddingNote) {
			try {
				const noteList = await putNote(note, this.state.selectedBoardId);
				this.setState({ noteList: noteList, isNoteSelected: false, isAddingNote: false });
			} catch (e) {
				alert(e);
			}
		}
	}

	async componentDidMount() {
		try {
			let temp_user_id = 'some-owner-id'; //TODO: Change after adding authoriaztion 
			const boardList = await getBoards(temp_user_id);
			this.setState({
				selectedBoardId: boardList[0].id
			});
			const noteList = await getNotesByBoardId(this.state.selectedBoardId);
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
				<Grid item md={3} xs={6}>
					<BoardList
						boards={this.state.boardList}
						handleToSelectBoard={this.handleToSelectBoard.bind(this)}
						handleToAddBoard={this.handleToAddBoard.bind(this)}
					/>
				</Grid>
				<Grid item md={9} xs={6}>
					{!this.state.isNoteSelected && !this.state.isAddingNote &&
						<NoteList
							notes={this.state.noteList}
							handleToDeleteNote={this.handleToDeleteNote.bind(this)}
							handleToSelectNote={this.handleToSelectNote.bind(this)}
							handleToAddNote={this.handleToAddNote.bind(this)}
						/>
					}
					{this.state.isNoteSelected && !this.state.isAddingNote &&
						<Note
							note={this.state.noteList[this.state.selectedNoteId]}
							handleSaveNote={this.handleSaveNote.bind(this)}
						/>
					}
					{!this.state.isNoteSelected && this.state.isAddingNote &&
						<Note
							note={{}}
							handleSaveNote={this.handleSaveNote.bind(this)}
						/>
					}
				</Grid>
			</Grid>
		);
	}
}

export default App;
