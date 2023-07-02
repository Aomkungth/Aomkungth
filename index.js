const { Client, Events, GatewayIntentBits, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, REST, Routes, ModalBuilder, TextInputBuilder, TextInputStyle, ActivityType } = require('discord.js');

// Config

token = "MTEwMTUwNDkzMTk1OTE0ODU5Ng.GuOyBJ.M8AYih2riPg6WpB4cn3qGIwLLk4V9T2_Ei_f10"

client_id = "1101504931959148596"

ch_id = "1101505853091217478"

adnin = [
	"1032488860187373619"
]

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	
	client.user.setActivity({
		
		name: "Dev by Meoaw",

		type: ActivityType.Streaming,

		url: "https://www.youtube.com/watch?v=LLZ16pIoDf8&t=6s"
		
    })

	const meoaw_x = client.channels.cache.get(`${ch_id}`);

	const web_embed = new EmbedBuilder()

		.setColor(0xc675ff)

		.setTitle('**Meoaw Store**')

		.setDescription('_ _')

		.setThumbnail('https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png')

		.setImage('https://cdn.discordapp.com/attachments/1090081082373840989/1100582297356476467/standard.gif')

		.addFields(

			{ name: '> วิธีใช้งาน', value: '_ _\n`❓`: กดเลือกปุ่มด้านล่างได้เลยค้าบ !\n_ _\n_ _'},

		)

		.setTimestamp()

		.setFooter({ text: '© 2023 MeoawJi Studio All rights reserved', iconURL: 'https://cdn.discordapp.com/attachments/1090081082373840989/1098958590238281759/Untitled_design.png'});

	const key_input = new ButtonBuilder()

		.setCustomId('kip')
		.setLabel('กรอก Key')
		.setStyle(ButtonStyle.Success);

	const row = new ActionRowBuilder()

		.addComponents(key_input);

	meoaw_x.send({ embeds: [web_embed], components: [row]});

	console.log(`Welcome ${c.user.tag} to Meoaw Open ( Web )`);
	
});

const commands = [
	{
		name: 'gen',
		description: 'สร้าง Key',
	},
	{
	  name: 'open',
	  description: 'เปิดเว็บ Auto',
	},
	{
	  name: 'add',
	  description: 'เพิ่มแอดมิน',
	},
	{
	  name: 'remove',
	  description: 'ลบแอดมิน',
	},
	{
	  name: 'del',
	  description: 'ลบเว็บ',
	},
	{
	  name: 'status',
	  description: 'เช็คสถานะเว็บ',
	},
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(client_id), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {

	if (interaction.isButton()) {

		if (interaction.customId.includes('kip')) {

			const modal = new ModalBuilder()

				.setCustomId('key_cb')

				.setTitle('🔒 กรุณากรอก Key เพื่อเปิดเว็บ !');

				const key_n = new TextInputBuilder()

				.setCustomId('key')

				.setLabel("🔑 กรอก Key")

				.setRequired(true)

				.setStyle(TextInputStyle.Short);

				const main_key = new ActionRowBuilder().addComponents(key_n);

				modal.addComponents(main_key);

				await interaction.showModal(modal)

		}

	} else {

		if(interaction.commandName == 'gen') {

			if (interaction.user.id == adnin) {

				interaction.reply({content: "Welcome Admin !", ephemeral: true})

			} else {

				interaction.reply({content: "Unknow user :(", ephemeral: true})
			}

		}
	}

})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'key_cb') {

		const key_x = interaction.fields.getTextInputValue('key');

		const ex_key = "123"

		if (ex_key == key_x) {

			await interaction.reply({ content: "มี Key ในระบบ !", ephemeral: true});

		} else {

			await interaction.reply({ content: "ไม่พบ Key ในระบบ !", ephemeral: true});

		}

	}
});

client.login(token);