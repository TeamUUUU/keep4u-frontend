import React, { Component } from 'react';
import './App.css';
import {
	getBoards,
	getNotesByBoardId,
	postNewNote,
	putNote,
	postNewBoard,
	deleteNote,
	deleteBoard,
	putBoard
} from './API';
import BoardList from './BoardList';
import NoteList from './NoteList';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import NavBar from './NavBar';
import Note from './Note';
import { GoogleLogin } from 'react-google-login';
import { Card, CardHeader, CardContent } from '@material-ui/core';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boardList: [],
			noteList: [],
			selectedBoardId: "",
			selectedNoteId: "",
			isNoteSelected: false,
			isAddingNote: false,
			user_id: "",
			expires_at: null,
			loggedIn: false,
			authObj: null
		};
		let token_id = localStorage.getItem('token_id');
		let token_date = localStorage.getItem('token_date');
		if (token_id === null) {
			this.state.loggedIn = false;
		}
		else {
			if (this.isTokenExpired(token_date)) {
				this.state.loggedIn = false;
			}
			else {
				this.state.loggedIn = true;
				this.state.user_id = token_id;
				this.state.expires_at = token_date;
			}
		}
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
				title: title,
				description: description
			}
			let temp_collaboration = ['some-owner-id']; //TODO: Change after adding authoriaztion
			let addedBoard = await postNewBoard(newBoard, this.state.user_id, temp_collaboration);
			let updatedBoardList = this.state.boardList;
			updatedBoardList.push(addedBoard);
			this.setState({
				boardList: updatedBoardList,
				noteList: []
			});
		} catch (e) {
			alert(e);
		}
	}

	handleToEditBoard = async (board, idx) => {
		try {
			let updatedBoard = board;
			let addedBoard = await putBoard(updatedBoard, updatedBoard.id);
			let updatedBoardList = this.state.boardList;
			updatedBoardList[idx] = addedBoard;
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

	responseOnSuccessGoogle = (response) => {
		this.setState({
			user_id: response.tokenObj.id_token,
			expires_at: response.tokenObj.expires_at,
			loggedIn: true,
			authObj: response
		});
		localStorage.setItem('token_id', response.tokenObj.id_token);
		localStorage.setItem('token_date', response.tokenObj.expires_at);
	}

	responseOnFailureGoogle = (response) => {
		console.log(response);
	}

	isTokenExpired(token_date) {
		return (token_date < Date.now())
	}

	updateToken() {
		let response = this.state.authObj.reloadAuthResponse();
		this.setState({
			user_id: response.id_token,
			expires_at: response.expires_at,
			loggedIn: true,
		});
		localStorage.setItem('token_id', response.id_token);
		localStorage.setItem('token_date', response.expires_at);
	}

	async componentDidMount() {
		if (this.state.loggedIn) {
			try {
				const boardList = await getBoards(this.state.user_id);
				if (boardList.length !== 0) {
					this.setState({
						selectedBoardId: boardList[0].id
					});
					const noteList = await getNotesByBoardId(this.state.selectedBoardId);
					this.setState({ ...this.state, boardList, noteList });
				}
			} catch (e) {
				alert(e);
			}
		}
	}

	render() {
		return (
			<Grid container spacing={24} style={{ width: '100%' }}>
				<Grid item md={12} xs={12}>
					<NavBar />
				</Grid>
				{!this.state.loggedIn &&
					<Modal
						open
						style={{
							display: 'flex',
							height: '100vh'
						}}>
						<Card style={{ margin: 'auto' }}>
							<CardHeader title={'Sign in with Google account'}>

							</CardHeader>
							<CardContent style={{ display: 'flex' }}>
								<GoogleLogin
									clientId="120245860173-ahk0sg483j7546ac4ft0aprhbjsorodk.apps.googleusercontent.com"
									buttonText="Login"
									render={(props) => <Button
										onClick={props.onClick}
										variant='contained'
										color='primary'
										style={{ margin: 'auto' }}
									>
										Sign in
										</Button>}
									onSuccess={this.responseOnSuccessGoogle.bind(this)}
									onFailure={this.responseOnFailureGoogle.bind(this)}
								/>
							</CardContent>
						</Card>
					</Modal>}
				{this.state.loggedIn && <React.Fragment>
					<Grid item md={3} xs={6}>
						<BoardList
							boards={this.state.boardList}
							handleToSelectBoard={this.handleToSelectBoard.bind(this)}
							handleToAddBoard={this.handleToAddBoard.bind(this)}
							handleToDeleteBoard={this.handleToDeleteBoard.bind(this)}
							handleToEditBoard={this.handleToEditBoard.bind(this)}
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
				</React.Fragment>}
			</Grid>
		);
	}
}

export default App;
