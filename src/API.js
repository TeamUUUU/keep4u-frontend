const API_URL = 'http://188.246.233.13:8080/'

const responseHandler = (response) => {
	if (response.status === 200) {
		return response.json();
	}

	throw new Error(response.status);
};

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