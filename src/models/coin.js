import { GAME_SETTINGS } from "../utils/constants.js";
export class Coin {
    constructor() {
        this.id = Math.floor(Math.random() * 1000);
        this.x = Math.floor(Math.random() * 100);
        this.y = Math.floor(Math.random() * 100);
        this.width = GAME_SETTINGS.COIN_WIDTH;
        this.height = GAME_SETTINGS.COIN_HEIGHT;
        this.value = GAME_SETTINGS.COIN_VALUE;
        this.element = null;
    }

    createCoinElement() {
        let coinElement = document.createElement('div');
        coinElement.classList.add('coin');
        coinElement.style.width = this.width + 'px';
        coinElement.style.height = this.height + 'px';
        coinElement.style.position = 'absolute';
        coinElement.style.top = this.y + '%';
        coinElement.style.left = this.x + '%';
        coinElement.style.backgroundImage = `url(./assets/images/coin.svg)`;
        coinElement.style.backgroundSize = 'cover';
        this.element = coinElement;
        return coinElement;
    }
}