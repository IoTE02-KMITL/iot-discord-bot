import { Client, Guild } from "discord.js";
import { guildCommand } from "../utils/guildCommand";
import prisma from "../database/prisma";

export const onGuildCreate = async (client: Client, guild: Guild) => {
  await prisma.guild.upsert({
    where: {
      id: guild.id,
    },
    create: {
      id: guild.id,
      name: guild.name,
      guild: JSON.stringify(guild),
    },
    update: {
      name: guild.name,
      guild: JSON.stringify(guild),
    },
  });

  await guildCommand(client, guild.id);
};
