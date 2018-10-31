
export function getBoardsTemp() {
	let data = [];
	for (let i = 0; i < 10; i++) {
		data.push({
			id: i.toString(),
			title: "Board title " + i,
			description: "Two line, very long description " + i
		})
	}
	return data;
}

const randomContent = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor blandit lacinia. In hac habitasse platea dictumst. Aliquam erat volutpat. Nam pretium ut enim ut ultrices. Praesent venenatis dictum turpis sed suscipit. Praesent eleifend sapien id nisi rhoncus, a congue odio posuere.";

export function getNotesByBoardID(boardID) {
	let data = [];
	let number = 1 + boardID;
	for (let i = 0; i < number; i++) {
		data.push({
			id: i.toString(),
			board_id: boardID.toString(),
			title: "Note title " + i,
			content: "Content " + i + randomContent,
			created_at: + new Date(),
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