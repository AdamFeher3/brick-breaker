import { Menu } from "./ui/Menu.js";
import { Game } from "./game/Game.js";
import { AudioManager } from "./util/Audio.js";

const audio = new AudioManager();
const game = new Game(audio);
Menu.init(game, audio);