const API_URL = 'http://188.246.233.13:8080/'

const responseHandler = (response) => {
	if (response.status === 200) {
		return response.json();
	}

	throw new Error(response.status);
};

function putData(url, data) {
	return fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(response => response.json());
}

function postData(url, data) {
	// Default options are marked with *
	return fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // no-referrer, *client
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then(response => response.json()); // parses response to JSON
}

function deleteDataById(url) {
	return fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	})
		.then(response => response)
}

function patchData(url, data) {
	// Default options are marked with *
	return fetch(url, {
		method: "PATCH", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // no-referrer, *client
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then(response => response.json()); // parses response to JSON
}



export const getBoards = (userID) => {
	const url = new URL(`boards`, API_URL);
	url.search = new URLSearchParams({
		user_id: userID,
	});
	return fetch(url)
		.then(responseHandler);
};

export const getNotesByBoardId = (boardID) => {
	const url = new URL(`boards/${boardID}/notes`, API_URL);
	return fetch(url)
		.then(responseHandler);
};

export const getBoardById = (boardID) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return fetch(url)
		.then(responseHandler);
};

export const getNoteByID = (noteID) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return fetch(url)
		.then(responseHandler);
};

export const getAttachmentById = (attachmentID) => {
	const url = new URL(`attachments/${attachmentID}`, API_URL);
	return fetch(url)
		.then(responseHandler);
};

export const getSearchNotes = (text, limit, asc) => {
	const url = new URL(`search/notes`, API_URL);
	url.search = new URLSearchParams({
		text,
		limit,
		asc,
	});
	return fetch(url)
		.then(responseHandler);
};

export const postNewNote = (note, boardID) => {
	const url = new URL(`boards/${boardID}/notes`, API_URL);
	return postData(url, note);
};

export const putNote = (note, noteID) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return patchData(url, note);
};

export const putBoard = (board, boardID) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return patchData(url, board);
}

export const postNewBoard = (board, owner_id, collaboration) => {
	const url = new URL(`boards`, API_URL);
	board.owner_id = owner_id;
	board.collaboration = collaboration;
	url.search = new URLSearchParams({
		user_id: owner_id,
	});
	return postData(url, board);
};

export const deleteNote = (noteID) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return deleteDataById(url);
};

export const deleteBoard = (boardID) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return deleteDataById(url);
};

export const deleteAttachment = (attachmentID) => {
	const url = new URL(`attachments/${attachmentID}`, API_URL);
	return deleteDataById(url);
};