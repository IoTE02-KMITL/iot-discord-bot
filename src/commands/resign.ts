import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { resignFill, removeTemp } from "../utils/resignFill";
import prisma from "../database/prisma";

export const resign: Command = {
  data: new SlashCommandBuilder()
    .setName("resign")
    .setDescription("Resign from KMITL"),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();
    const { user } = interaction;

    const userExists = await prisma.user.findUnique({
      where: {
        discordUid: user.id,
      },
    });

    if (!userExists) {
      await interaction.editReply({
        content: "คุณยังไม่ได้ลงทะเบียน",
      });
      return;
    }

    const pdf = await resignFill(userExists.id);
    if (pdf.error) {
      await interaction.editReply({
        content: "เกิดข้อผิดพลาด",
      });

      await removeTemp(pdf.path);
      return;
    }

    if (pdf.path) {
      await interaction.editReply({
        content: "ขอให้สมหวัง",
        files: [
          {
            attachment: pdf.path,
            name: "resign.pdf",
          },
        ],
      });

      await removeTemp(pdf.path);
      return;
    }

    await interaction.editReply({
      content: "เกิดข้อผิดพลาด",
    });
  },
};
