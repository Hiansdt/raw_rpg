import { GAME_SETTINGS } from "../utils/constants.js";
export default class Player {
    constructor(x, y, speed, width, height, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.element = null;
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        }
        this.coins = 0;
        this.isTransitioning = ''
        this.createPlayerElement();
    }

    createPlayerElement() {
        let playerElement = document.createElement('div');
        let coinsAmount = document.createElement('div');
        coinsAmount.id = 'coins-amount';
        coinsAmount.innerText = 'Coins: ' + this.coins;
        coinsAmount.style.position = 'absolute';
        coinsAmount.style.top = '10px';
        coinsAmount.style.right = '10px';

        let gameContainer = document.querySelector('#game-container');
        playerElement.id = 'player';
        this.element = playerElement;
        gameContainer.appendChild(coinsAmount);
        gameContainer.appendChild(playerElement);

        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });
    }

    move(deltaTime, trees, coins) {
        let dx = 0;
        let dy = 0;

        if (this.keys.ArrowUp) {
            dy -= this.speed * deltaTime / 1000;
        }
        if (this.keys.ArrowDown) {
            dy += this.speed * deltaTime / 1000;
        }
        if (this.keys.ArrowLeft) {
            dx -= this.speed * deltaTime / 1000;
            this.element.classList.remove('playerRight')
            this.element.classList.add('playerLeft')
        }
        if (this.keys.ArrowRight) {
            dx += this.speed * deltaTime / 1000;
            this.element.classList.remove('playeLeft')
            this.element.classList.add('playerRight')
        }

        if(!this.keys.ArrowUp && !this.keys.ArrowDown && !this.keys.ArrowLeft && !this.keys.ArrowRight) {
            this.element.classList.remove('playerRunning')
            this.element.classList.add('playerIdle')
        } else {
            this.element.classList.remove('playerIdle')
            this.element.classList.add('playerRunning')
        }

        const newX = this.x + dx;
        const newY = this.y + dy;

        const collidedWithTree = this.checkTreeCollision(newX, newY, trees);

        this.checkCoinCollision(newX, newY, coins);

        if (!collidedWithTree && !this.isTransitioning) {
            this.x = newX;
            this.y = newY;
        }
    }

    checkTreeCollision(newX, newY, trees) {
        const playerRect = this.element.getBoundingClientRect();
        const newPlayerRect = {
            top: newY + playerRect.height * 0.1,
            bottom: newY + playerRect.height - playerRect.height * 0.1,
            left: newX + playerRect.width * 0.35,
            right: newX + playerRect.width - playerRect.width * 0.35
        };
        for (let tree of trees) {
            const treeRect = tree.element.getBoundingClientRect();
            const newTreeRect = {
                top: treeRect.bottom,
                bottom: treeRect.bottom,
                left: treeRect.left + treeRect.width * 0.4,
                right: treeRect.right - treeRect.width * 0.4
            }

            if (
                newPlayerRect.left < newTreeRect.right &&
                newPlayerRect.right > newTreeRect.left &&
                newPlayerRect.top < newTreeRect.bottom &&
                newPlayerRect.bottom > newTreeRect.top
            ) {
                return true;
            }
        }
    }

    checkCoinCollision(newX, newY, coins) {
        const playerRect = this.element.getBoundingClientRect();
        const newPlayerRect = {
            top: newY + playerRect.height * 0.1,
            bottom: newY + playerRect.height - playerRect.height * 0.1,
            left: newX + playerRect.width * 0.35,
            right: newX + playerRect.width - playerRect.width * 0.35
        };

        for (let coin of coins) {
            const coinRect = coin.element.getBoundingClientRect();

            if (
                newPlayerRect.left < coinRect.right &&
                newPlayerRect.right > coinRect.left &&
                newPlayerRect.top < coinRect.bottom &&
                newPlayerRect.bottom > coinRect.top
            ) {
                coin.element.remove();
                coins.splice(coins.indexOf(coin), 1);
                this.coins += coin.value;
                this.updateCoinAmount();
            }
        }
    }

    updateCoinAmount() {
        document.querySelector('#coins-amount').innerText = 'Coins: ' + this.coins;
    }

    update(deltaTime, trees, coins) {
        this.move(deltaTime, trees, coins);
        this.updateVisuals();
    }

    updateVisuals() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}
