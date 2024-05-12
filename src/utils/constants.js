const gameContainer = document.querySelector('#game-container');
const gameContainerRect = gameContainer.getBoundingClientRect();
export const GAME_SETTINGS = {
    AREA_WIDTH: 100,
    AREA_HEIGHT: 100,
    PLAYER_SPEED: 100,
    PLAYER_WIDTH: 3,
    PLAYER_HEIGHT: 4,
    PLAYER_COLOR: 'blue',
    STARTING_PLAYER_X: gameContainerRect.width / 2,
    STARTING_PLAYER_Y: gameContainerRect.height / 2,
    TREE_WIDTH: 8,
    TREE_HEIGHT: 12,
    STANDARD_TREE_COUNT: 40,
    COIN_WIDTH: 1.5,
    COIN_HEIGHT: 1.5,
    COIN_VALUE: 2,  
}