
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

const randomContent = ` 
## Emphasis\n
**This is bold text**\n
__This is bold text__\n
*This is italic text*\n
_This is italic text_\n
~~Strikethrough~~\n
`;

export function getNotesByBoardID(boardID) {
	let data = [];
	let number = 1 + boardID;
	for (let i = 0; i < number; i++) {
		data.push({
			id: i.toString(),
			board_id: boardID.toString(),
			title: "Note title " + i,
			content: "Content " + boardID + randomContent,
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