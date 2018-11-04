import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBoardIndex: 0,
			createTitle: '',
			createDescription: '',
			description: '',
			title: ''
		};
	}

	onClickCallback(event, idx) {
		this.setState({ selectedBoardIndex: idx });
		this.props.handleToSelectBoard(this.props.boards[idx].id);
	}

	onChangeCreateTitleCallBack(value) {
		this.setState({ createTitle: value });
	}

	onChangeCreateDescriptionCallBack(value) {
		this.setState({ createDescription: value });
	}

	handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.props.handleToAddBoard(this.state.createTitle);
			;
		}
	}

	onClickCreateCallBack = () => {
		this.props.handleToAddBoard(this.state.createTitle, this.state.createDescription)
	}

	onClickEditCallback(idx) {
		// TODO: add text editor to get new title and description
		// this.props.handleToEditBoard(this.state.title, this.state.description)
	}

	onClickDeleteCallback(idx) {
		this.props.handleToDeleteBoard(idx);
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
				{(this.state.selectedBoardIndex === idx) && <ListItemSecondaryAction>
					<IconButton aria-label="Clear" onClick={() => this.onClickDeleteCallback(idx)}>
						<ClearIcon fontSize="small" />
					</IconButton>
					<IconButton aria-label="Edit" onClick={() => this.onClickEditCallback(idx)}>
						<CreateIcon fontSize="small" />
					</IconButton>
				</ListItemSecondaryAction>}

			</ListItem>
		)
		return (
			<React.Fragment>
				<List component="nav">
					<TextField
						multiline
						placeholder={'New Board...'}
						label={'New Board...'}
						style={{
							left: 25,
							marginBottom: 3
						}}
						onKeyPress={this.handleKeyPress}
						onChange={(event) => this.onChangeCreateTitleCallBack(event.target.value)}
					>
					</TextField>
					<TextField
						multiline
						placeholder={'Description...'}
						label={'Description...'}
						style={{
							left: 25,
							marginBottom: 3
						}}
						onKeyPress={this.handleKeyPress}
						onChange={(event) => this.onChangeCreateDescriptionCallBack(event.target.value)}
					>
					</TextField>
					<IconButton
						style={{
							left: 25,
							marginBottom: 3
						}}
						aria-label="Save"
						onClick={() => this.onClickCreateCallBack()}
					>
						<SaveIcon />
					</IconButton>
					{boards.map(toList)}
				</List>

				<Paper elevation={1}>

				</Paper>
			</React.Fragment>
		);
	}
}

export default BoardList;