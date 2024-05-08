import AreaManager from './managers/areaManager.js';
import GameManager from './managers/gameManager.js';
import { GAME_SETTINGS } from './utils/constants.js';
import Player from './models/player.js';

const player = new Player(
    GAME_SETTINGS.STARTING_PLAYER_X,
    GAME_SETTINGS.STARTING_PLAYER_Y,
    GAME_SETTINGS.PLAYER_SPEED,
    GAME_SETTINGS.PLAYER_WIDTH,
    GAME_SETTINGS.PLAYER_HEIGHT,
    GAME_SETTINGS.PLAYER_COLOR
);
const areaManager = new AreaManager(player);
const gameManager = new GameManager(player, areaManager);

gameManager.startGameLoop();
areaManager.createInitialArea(GAME_SETTINGS.STANDARD_TREE_COUNT, 3, { x: 0, y: 0 });