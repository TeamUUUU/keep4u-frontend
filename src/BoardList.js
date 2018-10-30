import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: 0,
		};
	}

	handleListItemClick = (event, index) => {
		this.setState({ selectedIndex: index });
	};

	render() {
		const { boards,
			changeSelectedIndex } = this.props;
			changeSelectedIndex(this.state.selectedIndex)
		const toList = (board, idx) => (
			<ListItem
				button
				selected={this.state.selectedIndex === idx}
				onClick={event => this.handleListItemClick(event, idx)}
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