import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { CardHeader } from '@material-ui/core';


class NoteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAddingNewNote: false,
			hoverIdx: null
		};
	}

	onClickCallback(idx) {
		this.props.handleToSelectNote(idx);
	}
	onClickAddButtonCallback() {
		this.setState({ isAddingNewNote: true })
		this.props.handleToAddNote();
	}
	onClickDeleteButtonCallback(idx) {
		this.props.handleToDeleteNote(idx);
	}

	onHoverInCallback(idx) {
		this.setState({hoverIdx: idx});
	}

	onHoverOutCallback() {
		this.setState({hoverIdx: null});
	}

	render() {
		let style = {
			margin: 0,
			top: 'auto',
			right: 30,
			bottom: 30,
			left: 'auto',
			position: 'fixed',
		};
		const { notes } = this.props;
		const toList = (note, idx) => (
			<Grid
				key={idx}
				item
				md={3} xs={12}
			>
				<Card
					elevation={(this.state.hoverIdx === idx) ? 10 : 5}
					style={{
						minHeight: '20vh'
					}}
					onMouseEnter={() => this.onHoverInCallback(idx)}
					onMouseLeave={() => this.onHoverOutCallback()}
				>
					<CardHeader
						title={note.title}
						action={
							<IconButton
								aria-label="Delete"
								onClick={() => this.onClickDeleteButtonCallback(idx)}
							>
								<ClearIcon />
							</IconButton>
						}
					/>
					<CardContent
						onClick={() => this.onClickCallback(idx)}
					>
						<ReactMarkdown>
							{note.content}
						</ReactMarkdown>
					</CardContent>
				</Card>
			</Grid>
		)

		return (
			<React.Fragment>
				<Grid container spacing={24} >
					{notes.map(toList)}
				</Grid >
				<Button
					style={style}
					variant="fab"
					color="primary"
					aria-label="Add"
					medium="true"
					onClick={() => this.onClickAddButtonCallback()}
				>
					<AddIcon />
				</Button>
			</React.Fragment>
		);
	}
}

export default NoteList;