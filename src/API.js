const API_URL = 'http://188.246.233.13:8080/'

const responseHandler = (response) => {
	if (response.status === 200) {
		return response.json();
	}

	throw new Error(response.status);
};

function postData(url, data) {
	// Default options are marked with *
	console.log(JSON.stringify(data))
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
	console.log(url, note);
	return postData(url, note);
};

export const putNote = (note, noteID) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return patchData(url, note);
}