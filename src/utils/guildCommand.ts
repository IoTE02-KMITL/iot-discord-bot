import { Client, REST, Routes } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import prisma from "../database/prisma";

export const guildCommand = async (client: Client, guildId: string) => {
  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(client.user?.id || "missing id", guildId),
    { body: commandData }
  );

  const guild = await prisma.guild.findUnique({
    where: {
      id: guildId,
    },
  });

  console.log(
    `Successfully registered application commands for ${
      guild ? guild.name : guildId
    }`
  );
};
