import { Command } from "../interfaces/Command";
import { ping } from "./ping";
import { register } from "./register";

export const CommandList: Command[] = [ping, register];
