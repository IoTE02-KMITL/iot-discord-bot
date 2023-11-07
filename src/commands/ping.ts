import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Reply with pong!"),
  run: async (interaction) => {
    await interaction.reply("Pong!");
  },
};
