import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBoardIndex: 0
		};
	}

	onClickCallback(event, idx) {
		this.setState({ selectedBoardIndex: idx });
		this.props.handleToSelectBoard(idx);
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
			</ListItem>
		)
		return (
			<List component="nav">
				{boards.map(toList)}
			</List>
		);
	}
}

export default BoardList;