import { Command } from "../interfaces/Command";
import { ping } from "./ping";
import { register } from "./register";
import { resign } from "./resign";

export const CommandList: Command[] = [ping, register, resign];
