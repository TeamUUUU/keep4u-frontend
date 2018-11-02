import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBoardIndex: 0,
			createTitle: ''
		};
	}

	onClickCallback(event, idx, id) {
		this.setState({ selectedBoardIndex: idx });
		this.props.handleToSelectBoard(id);
	}

	onChangeCreateCallBack(value) {
		console.log(value)
		this.setState({ createTitle: value });
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.handleToAddBoard(this.state.createTitle);
			;
		}
	}

	render() {
		const boards = this.props.boards;
		const toList = (board, idx) => (
			<ListItem
				key={idx}
				button
				selected={this.state.selectedBoardIndex === idx}
				onClick={event => this.onClickCallback(event, idx, board.id)}
			>
				<ListItemText
					primary={board.title}
					secondary={board.description}
				>
				</ListItemText>
			</ListItem>
		)
		return (
			<React.Fragment>
				<List component="nav">
					<TextField
						fullWidth
						placeholder={'New Board...'}
						label={'New Board...'}
						style={{
							left: 25,
							marginBottom: 3,
							marginLeft: -25
						}}
						onKeyPress={this.handleKeyPress}
						onChange={(event) => this.onChangeCreateCallBack(event.target.value)}
					>
					</TextField>
					{boards.map(toList)}
				</List>

				<Paper elevation={1}>

				</Paper>
			</React.Fragment>
		);
	}
}

export default BoardList;