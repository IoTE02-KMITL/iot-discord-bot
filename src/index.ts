import { Client, Events } from "discord.js";
import { IntentsOptions } from "./config/IntentOptions";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { validateEnv } from "./utils/validateEnv";

validateEnv();

(async () => {
  const client = new Client({ intents: IntentsOptions });

  client.on(Events.ClientReady, () => onReady(client));

  client.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );

  await client.login(process.env.DISCORD_TOKEN);
})();
