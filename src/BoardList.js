import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
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
			isEdited: false,
			editTitle: '',
			editDescription: '',
			isCreateSelected: false,
		};
	}

	onClickCallback(idx) {
		this.setState({
			isEdited: false,
			selectedBoardIndex: idx,
			isCreateSelected: false,
		});
		this.props.handleToSelectBoard(this.props.boards[idx].id);
	}

	onChangeCreateTitleCallBack(value) {
		this.setState({ createTitle: value });
	}

	onChangeCreateDescriptionCallBack(value) {
		this.setState({ createDescription: value });
	}

	onClickCreateCallBack = () => {
		this.setState({
			createDescription: '',
			createTitle: '',
			isCreateSelected: false,
			selectedBoardIndex: 0
		});
		this.onClickCallback(0);
		this.props.handleToAddBoard(this.state.createTitle, this.state.createDescription)
	}

	onClickEditCallback(idx) {
		this.setState({
			isEdited: true,
			editTitle: this.props.boards[this.state.selectedBoardIndex].title,
			editDescription: this.props.boards[this.state.selectedBoardIndex].description,
			isCreateSelected: false
		});
	}

	//TODO: Bug - need to properly update notelist view
	onClickDeleteCallback(idx) {
		this.onClickCallback(idx?0:1)

		this.props.handleToDeleteBoard(idx);
	}

	onCreateSelectedCallBack = (event) => {
		this.setState({ isCreateSelected: true, isEdited: false });
	}

	onChangeEditTitleCallBack(value) {
		this.setState({ editTitle: value });
	}

	onChangeEditDescriptionCallBack(value) {
		this.setState({ editDescription: value });
	}

	onClickSaveCallback() {
		this.setState({
			isEdited: false
		});
		let idx = this.state.selectedBoardIndex;
		let board = {
			id: this.props.boards[idx].id,
			title: this.state.editTitle,
			description: this.state.editDescription
		};
		this.props.handleToEditBoard(board, idx);
	}

	render() {
		const boards = this.props.boards;
		const toList = (board, idx) => (
			<ListItem
				key={idx}
				button={!this.state.isEdited}
				selected={this.state.selectedBoardIndex === idx}
				onClick={
					(this.state.selectedBoardIndex === idx) ?
						null : (() => this.onClickCallback(idx))
				}
			>
				{!(this.state.selectedBoardIndex === idx) && <ListItemText
					primary={board.title}
					secondary={board.description}
				>
				</ListItemText>}

				{(this.state.selectedBoardIndex === idx) && <React.Fragment>
					{!this.state.isEdited && <React.Fragment>
						<ListItemText
							primary={board.title}
							secondary={board.description}
						>
						</ListItemText>

						<ListItemSecondaryAction>
							<IconButton
								aria-label="Delete"
								onClick={() => this.onClickDeleteCallback(idx)}
							>
								<ClearIcon fontSize="small" />
							</IconButton>
							<IconButton
								aria-label="Edit"
								onClick={() => this.onClickEditCallback(idx)}
							>
								<CreateIcon fontSize="small" />
							</IconButton>
						</ListItemSecondaryAction>
					</React.Fragment>}

					{this.state.isEdited && <React.Fragment>
						<List>
							<TextField
								placeholder={'Title'}
								label={'Title'}
								value={this.state.editTitle}
								onChange={(event) => this.onChangeEditTitleCallBack(event.target.value)}
							/>
							<TextField
								placeholder={'Description'}
								label={'Description'}
								value={this.state.editDescription}
								onChange={(event) => this.onChangeEditDescriptionCallBack(event.target.value)}
							/>
						</List>
						<ListItemSecondaryAction>
							<IconButton
								aria-label="Save"
								onClick={() => this.onClickSaveCallback()}
							>
								<SaveIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</React.Fragment>}
				</React.Fragment>}

			</ListItem>
		)
		return (
			<React.Fragment>
				<List component="nav">
					<List>
						<TextField
							placeholder={'New Board...'}
							label={'New Board...'}
							value={this.state.createTitle}
							style={{
								left: 25,
								marginBottom: 3
							}}
							onChange={(event) => this.onChangeCreateTitleCallBack(event.target.value)}
							onSelect={this.onCreateSelectedCallBack}
						>
						</TextField>
						{this.state.isCreateSelected &&
							<React.Fragment>
								<TextField
									placeholder={'Description...'}
									label={'Description...'}
									value={this.state.createDescription}
									style={{
										left: 25,
										marginBottom: 3
									}}
									onChange={(event) => this.onChangeCreateDescriptionCallBack(event.target.value)
									}
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
							</React.Fragment>
						}
					</List>
					{boards.map(toList)}
				</List>
			</React.Fragment>
		);
	}
}

export default BoardList;