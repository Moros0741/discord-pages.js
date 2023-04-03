const { MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
 
exports.smTextEmojiButtons = function(emojis) {
	let row = new MessageActionRow().addComponents(
		new MessageButton()
			.setEmojis(emojis.first || emojis.previous || null)
			.setLabel("Previous")
			.setCustomId("previous"),
		new MessageButton()
			.setEmojis(emojis.cancel || null)
			.setLabel("Close")
			.setCustomId("close"),
		new MessageButton()
			.setEmojis(emojis.last || emojis.next || null)
			.setLabel("Next")
			.setCustomId("next")
	);

	return row;
};

exports.lgTextEmojiButtons = function(emojis) {
	let row = new MessageActionRow().addComponents(
		new MessageButton()
			.setEmojis(emojis.first || null)
			.setLabel("First")
			.setCustomId("first"),
		new MessageButton()
			.setEmojis(emojis.previous || null)
			.setLabel("Previous")
			.setCustomId("previous"),
		new MessageButton()
			.setEmojis(emojis.cancel || null)
			.setLabel("Close")
			.setCustomId("close"),
		new MessageButton()
			.setEmojis(emojis.next || null)
			.setLabel("Next")
			.setCustomId("next"),
		new MessageButton()
			.setEmojis(emojis.last || null)
			.setLabel("Last")
			.setCustomId("last")
	);
	return row;
}

exports.smTextButtonRow = function(emojis) {

}