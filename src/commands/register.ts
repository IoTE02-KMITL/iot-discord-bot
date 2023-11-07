import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";

export const register: Command = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Register your account to the bot"),
  run: async (interaction) => {
    await interaction.reply("Register!");
  },
};
