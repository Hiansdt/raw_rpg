import { Coin } from '../models/coin.js';

export default class CoinManager {
    constructor(maxCoins) {
        this.maxCoins = maxCoins;
        this.coins = [];
        this.generateCoins();
    }

    generateCoins() {
        for (let i = 0; i < this.maxCoins; i++) {
            let coin = new Coin();
            this.coins.push(coin);
        }
    }

    renderCoins(areaElement) {
        this.coins.forEach(coin => {
            const coinElement = coin.createCoinElement();
            areaElement.appendChild(coinElement);
        });
    }
}