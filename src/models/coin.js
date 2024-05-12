import { GAME_SETTINGS } from "../utils/constants.js";
export class Coin {
    constructor() {
        this.id = Math.floor(Math.random() * 1000);
        this.width = GAME_SETTINGS.COIN_WIDTH;
        this.height = GAME_SETTINGS.COIN_HEIGHT;
        this.value = GAME_SETTINGS.COIN_VALUE;
        this.element = null;
        this.getCoinPosition();
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

    getCoinPosition() {
        const window = document.querySelector('#game-container').getBoundingClientRect();
        const x = Math.floor(Math.random() * window.width);
        const y = Math.floor(Math.random() * window.height);
        this.x = x;
        this.y = y;
    }
}