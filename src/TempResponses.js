
export function getBoardsTemp() {
	let data = [];
	for (let i = 0; i < 10; i++) {
		data.push({
			id: i.toString(),
			title: "title" + i,
			description: "description" + i
		})
	}
	return data;
}


export function getNotesByBoardID(boardID) {
	let data = [];
	for (let i = 0; i < 10; i++) {
		data.push({
			id: i.toString(),
			board_id: boardID.toString(),
			title: "Note title " + i,
			content: "Content " + i,
			created_at: +new Date(),
			attachments: [
				{
					kind: "file",
					name: "File",
					url: "https://www.putinLOH.tarzan/static/Oleg/video.mp3"
				},
				{
					kind: "link",
					name: "Link",
					url: "https://www.putinLOH.tarzan"
				},
				{
					kind: "pic",
					name: "Picture",
					url: "https://www.putinLOH.tarzan/static/Oleg/nude.gif"
				}
			]
		})
	}
	return data;
}