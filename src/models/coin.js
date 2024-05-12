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
        coinElement.style.width = this.width + '%';
        coinElement.style.height = 'auto';
        coinElement.style.paddingTop = this.height + '%';
        coinElement.style.position = 'absolute';
        coinElement.style.top = this.y + 'px';
        coinElement.style.left = this.x + 'px';
        coinElement.style.backgroundImage = `url(./assets/images/coin.svg)`;
        coinElement.style.backgroundSize = 'cover';
        coinElement.style.borderRadius = '50%';
        coinElement.style.zIndex = '1';
        this.element = coinElement;
        return coinElement;
    }
}