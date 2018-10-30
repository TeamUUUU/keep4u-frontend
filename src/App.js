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
		this.setState({ selectedIndex: idx });
		const noteList = getNotesByBoardID(this.state.boardList[this.state.selectedIndex].id);
		this.setState({ noteList: noteList });
	}

	componentDidMount() {
		// temporary methods until server is down
		const boardList = getBoardsTemp();
		const noteList = getNotesByBoardID(boardList[this.state.selectedIndex].id);
		this.setState({ ...this.state, boardList, noteList });
	}

	render() {
		return (
			<div>
				<NavBar />
				<Grid container spacing={24}>
					<Grid item xs={2}>
						<BoardList boards={this.state.boardList} handleToUpdate={this.handleToUpdate.bind(this)} />
					</Grid>
					<Grid item xs={10}>
						<NoteList notes={this.state.noteList} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default App;
