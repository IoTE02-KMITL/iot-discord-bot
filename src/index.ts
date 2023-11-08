import { Client, Events, Guild } from "discord.js";
import { IntentsOptions } from "./config/IntentOptions";
import { onGuildCreate } from "./events/onGuildCreate";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { validateEnv } from "./utils/validateEnv";

validateEnv();

(async () => {
  const client = new Client({ intents: IntentsOptions });

  client.on(Events.ClientReady, () => onReady(client));

  client.on(Events.GuildCreate, (guild) => onGuildCreate(client, guild));

  client.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );

  await client.login(process.env.DISCORD_TOKEN);
})();
