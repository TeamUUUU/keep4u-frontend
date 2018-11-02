import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBoardIndex: 0,
			createTitle: ''
		};
	}

	onClickCallback(event, idx) {
		this.setState({ selectedBoardIndex: idx });
		this.props.handleToSelectBoard(this.props.boards[idx].id);
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

	onClickEditCallback(event, idx) {
		//TODO:
		console.log(idx);
	}

	onClickDeleteCallback(event, idx) {
		//TODO:
		console.log(idx);
	}

	render() {
		const boards = this.props.boards;
		const toList = (board, idx) => (
			<ListItem
				key={idx}
				button
				selected={this.state.selectedBoardIndex === idx}
				onClick={event => this.onClickCallback(event, idx)}
			>

				<ListItemText
					primary={board.title}
					secondary={board.description}
				>
				</ListItemText>
				{/* TODO: add callbacks to edit and delete board buttons */}
				{(this.state.selectedBoardIndex === idx) && <ListItemSecondaryAction>
					<IconButton aria-label="Clear" onClick={event => this.onClickEditCallback(event, idx)}>
						<ClearIcon fontSize="small" />
					</IconButton>
					<IconButton aria-label="Edit" onClick={event => this.onClickEditCallback(event, idx)}>
						<CreateIcon fontSize="small" />
					</IconButton>
				</ListItemSecondaryAction>}

			</ListItem>
		)
		return (
			<React.Fragment>
				<List component="nav">
					<TextField

						placeholder={'New Board...'}
						label={'New Board...'}
						style={{
							left: 25,
							marginBottom: 3
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