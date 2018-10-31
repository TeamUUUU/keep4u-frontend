import React, { Component } from 'react';
import './App.css';
import { getBoardsTemp, getNotesByBoardID } from './TempResponses';
import BoardList from './BoardList';
import NoteList from './NoteList';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';

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
			selectedIndex: 0
		};
	}

	handleToUpdate = (idx) => {
		this.setState({ selectedIndex: idx }); // setState is asynchronous
		const noteList = getNotesByBoardID(idx);
		this.setState({ noteList: noteList });
	}

	componentDidMount() {
		// temporary methods until server is down
		const boardList = getBoardsTemp();
		const noteList = getNotesByBoardID(this.state.selectedIndex);
		this.setState({ ...this.state, boardList, noteList });
	}

	render() {
		return (
			<Grid container spacing={24} style={{ width: '100%'}}>
				<Grid item md={12} xs={12}>
					<NavBar />
				</Grid>
				<Grid item md={2} xs={6}>
					<BoardList boards={this.state.boardList} handleToUpdate={this.handleToUpdate.bind(this)} />
				</Grid>
				<Grid item md={10} xs={6}>
					<NoteList notes={this.state.noteList} />
				</Grid>
			</Grid>
		);
	}
}

export default App;
