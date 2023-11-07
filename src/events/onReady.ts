import { Client, REST, Routes } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onReady = async (client: Client) => {
  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      client.user?.id || "missing id",
      process.env.DISCORD_GUILD_ID
    ),
    { body: commandData }
  );

  console.log("Successfully registered application commands.");
};
