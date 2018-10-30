import React, { Component } from 'react';

class BoardList extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}


	render() {
		const { boards } = this.props;
		const toList = (board, idx) => (
			<button type="button" key={idx} class="btn btn-outline-info list-group-item bg-white text-primary">
				{`title: ${board.title}`}
				<p>
					{`description: ${board.description}`}
				</p>
			</button>)
		return (
			<ul class="list-group mt-3 ml-4">
				{boards.map(toList)}
			</ul>
		);
	}
}

export default BoardList;