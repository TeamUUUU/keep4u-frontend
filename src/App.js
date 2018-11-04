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
	putNote,
	postNewBoard,
	deleteNote,
	deleteAttachment,
	deleteBoard,
	putBoard
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
			let id = this.state.noteList[idx].id;
			deleteNote(id);
			let updatedNoteList = this.state.noteList;
			updatedNoteList.splice(idx, 1);
			this.setState({ noteList: updatedNoteList });
		} catch (e) {
			alert(e);
		}
	}

	handleToDeleteBoard = (idx) => {
		try {
			let id = this.state.boardList[idx].id;
			deleteBoard(id);
			let updatedBoardList = this.state.boardList;
			updatedBoardList.splice(idx, 1);
			this.setState({ boardList: updatedBoardList });
		} catch (e) {
			alert(e);
		}
	}

	handleToAddBoard = async (title, description) => {
		try {
			let newBoard = {
				id: "",
				title: title,
				description: description
			}
			let temp_user_id = 'some-owner-id'; //TODO: Change after adding authoriaztion
			let temp_collaboration = ['some-owner-id']; //TODO: Change after adding authoriaztion
			let addedBoard = await postNewBoard(newBoard, temp_user_id, temp_collaboration);
			let updatedBoardList = this.state.boardList;
			updatedBoardList.unshift(addedBoard);
			this.setState({ boardList: updatedBoardList });
		} catch (e) {
			alert(e);
		}
	}

	handleToEditBoard = async (title, description) => {
		try {
			let updatedBoard = {
				id: "",
				title: title,
				description: description
			}
			let temp_user_id = 'some-owner-id'; //TODO: Change after adding authoriaztion
			let temp_collaboration = ['some-owner-id']; //TODO: Change after adding authoriaztion
			let addedBoard = await putBoard(updatedBoard, temp_user_id, temp_collaboration);
			let updatedBoardList = this.state.boardList;
			updatedBoardList.unshift(addedBoard);
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
				let id = this.state.noteList[this.state.selectedNoteId].id;
				const newNote = await putNote(note, id);
				let noteList = this.state.noteList;
				noteList[noteList.findIndex(f => f.id === newNote.id)] = newNote;
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
						handleToDeleteBoard={this.handleToDeleteBoard.bind(this)}
						handleToEditBoard={this.handleToDeleteBoard.bind(this)}
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
