const assert = require("assert");
const { generateResetToken, randomString } = require("../utilities/auth.utils");

describe("auth utils test", () => {
	it("generates reset token", () => {
		const email = "example@example.com";
		const username = "randomUser";

		const token = generateResetToken(email, username);

		assert.equal(
			true,
			token.includes(
				Buffer.from(email).toString("base64") +
					Buffer.from(username).toString("base64")
			)
		);
	});

	it("generates random string", () => {
		const length = 10;
		const stringRandom = randomString(length);

		assert.equal(length, stringRandom.length);
	});
});
