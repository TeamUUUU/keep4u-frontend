const API_URL = 'http://188.246.233.13:8080/'

const responseHandler = (response) => {
	if (response.status < 300) {
		return response.json()
	}
};

function putData(url, data, user_id) {
	return fetch(url, {
		method: "PUT",
		headers: {
			"Authorization": user_id,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(response => response.json());
}

function postData(url, data, user_id) {
	// Default options are marked with *
	return fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Authorization": user_id,
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // no-referrer, *client
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then(response => response.json()); // parses response to JSON
}

function deleteDataById(url, user_id) {
	return fetch(url, {
		method: "DELETE",
		headers: {
			"Authorization": user_id,
			"Content-Type": "application/json",
		}
	})
		.then(response => response)
}

function patchData(url, data, user_id) {
	// Default options are marked with *
	return fetch(url, {
		method: "PATCH", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, cors, *same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Authorization": user_id,
			"Content-Type": "application/json",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		redirect: "follow", // manual, *follow, error
		referrer: "no-referrer", // no-referrer, *client
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	})
		.then(response => response.json()); // parses response to JSON
}



export const getBoards = async (user_id) => {
	const url = new URL(`boards`, API_URL);
    try {
	const response = await fetch(url, {
		headers: new Headers({
			"Authorization": user_id
		})
	})
	if ( response.status < 300) {
		return response.json()
	}
} catch(e) {
	const err = await e.json()
	throw new Error(err)
}		
};

export const getNotesByBoardId = (boardID, user_id) => {
	const url = new URL(`boards/${boardID}/notes`, API_URL);
	return fetch(url, {
		headers: {
			"Authorization": user_id
		}
	})
		.then(responseHandler);
};

export const getBoardById = (boardID, user_id) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return fetch(url, {
		headers: {
			"Authorization": user_id
		}
	})
		.then(responseHandler);
};

export const getNoteByID = (noteID, user_id) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return fetch(url, {
		headers: {
			"Authorization": user_id
		}
	})
		.then(responseHandler);
};

export const getAttachmentById = (attachmentID, user_id) => {
	const url = new URL(`attachments/${attachmentID}`, API_URL);
	return fetch(url, {
		headers: {
			"Authorization": user_id
		}
	})
		.then(responseHandler);
};

export const getSearchNotes = (text, limit, asc, user_id) => {
	const url = new URL(`search/notes`, API_URL);
	url.search = new URLSearchParams({
		text,
		limit,
		asc,
	});
	return fetch(url, {
		headers: {
			"Authorization": user_id
		}
	})
		.then(responseHandler);
};

export const postNewNote = (note, boardID, user_id) => {
	const url = new URL(`boards/${boardID}/notes`, API_URL);
	return postData(url, note, user_id);
};

export const putNote = (note, noteID, user_id) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return patchData(url, note, user_id);
};

export const putBoard = (board, boardID, user_id) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return patchData(url, board, user_id);
}

export const postNewBoard = (board, owner_id, collaboration) => {
	const url = new URL(`boards`, API_URL);
	board.owner_id = owner_id;
	board.collaboration = collaboration;
	return postData(url, board, owner_id);
};

export const deleteNote = (noteID, user_id) => {
	const url = new URL(`notes/${noteID}`, API_URL);
	return deleteDataById(url, user_id);
};

export const deleteBoard = (boardID, user_id) => {
	const url = new URL(`boards/${boardID}`, API_URL);
	return deleteDataById(url, user_id);
};

export const deleteAttachment = (attachmentID, user_id) => {
	const url = new URL(`attachments/${attachmentID}`, API_URL);
	return deleteDataById(url, user_id);
};