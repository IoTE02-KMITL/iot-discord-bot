export const validateEnv = () => {
  const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_GUILD_ID } = process.env;

  let errors: string[] = [];

  if (!DISCORD_TOKEN) {
    errors.push("DISCORD_TOKEN is required");
  }

  if (!DISCORD_CLIENT_ID) {
    errors.push("DISCORD_CLIENT_ID is required");
  }

  if (!DISCORD_GUILD_ID) {
    errors.push("DISCORD_GUILD_ID is required");
  }

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }

  return true;
};
