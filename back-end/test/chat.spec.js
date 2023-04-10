const assert = require("assert");
const {
	search_chatId,
	fetch_chatList,
} = require("../controllers/chat.controller");
const {
	fetch_msgList,
	create_message,
} = require("../controllers/message.controller");

describe("chat & message controller test", () => {
	it("search chatId and validate", () => {
		const user_id = "1";
		const buddy_id = "2";

		const chatId = search_chatId(user_id, buddy_id);
		const { userId } = fetch_msgList(user_id, chatId);

		assert.equal(buddy_id, userId);
	});
	it("create message", () => {
		const success = create_message({});
		assert.equal(true, success);
	});

	it("fetch chatList", () => {
		const user_id = "1";
		const chats = fetch_chatList(user_id);
		for (var i = 0; i < chats.length; i++) {
			const chat = chats[i];
			assert.equal(true, chat.members.includes(user_id));
		}
	});
});