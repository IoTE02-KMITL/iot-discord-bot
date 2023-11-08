import { Client } from "discord.js";
import { guildCommand } from "../utils/guildCommand";
import prisma from "../database/prisma";

export const onReady = async (client: Client) => {
  const guilds = await prisma.guild.findMany({
    select: {
      id: true,
    },
  });

  await guildCommand(client, process.env.DISCORD_GUILD_ID);
  for (const guild of guilds) {
    await guildCommand(client, guild.id);
  }
};
