export default class Player {
    constructor(x, y, speed, width, height, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
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
        playerElement.style.width = this.width + 'px';
        playerElement.style.height = this.height + 'px';
        playerElement.style.position = 'absolute';
        playerElement.style.top = this.y + '%';
        playerElement.style.left = this.x + '%';
        playerElement.style.backgroundColor = this.color;
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
        }
        if (this.keys.ArrowRight) {
            dx += this.speed * deltaTime / 1000;
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

    checkTreeCollision(newXPercent, newYPercent, trees) {
        const gameContainer = document.querySelector('#game-container');
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const gameContainerWidth = gameContainerRect.width;
        const gameContainerHeight = gameContainerRect.height;

        const newX = (newXPercent / 100) * gameContainerWidth;
        const newY = (newYPercent / 100) * gameContainerHeight;
        for (let tree of trees) {
            const treeRect = tree.element.getBoundingClientRect();

            const playerRect = {
                top: newY - 10,
                bottom: newY + this.height - 10,
                left: newX - 9,
                right: newX + this.width - 20
            };

            if (
                playerRect.left < treeRect.right &&
                playerRect.right > treeRect.left &&
                playerRect.top < treeRect.bottom &&
                playerRect.bottom > treeRect.top
            ) {
                return true;
            }
        }
    }

    checkCoinCollision(newXPercent, newYPercent, coins) {
        const gameContainer = document.querySelector('#game-container');
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const gameContainerWidth = gameContainerRect.width;
        const gameContainerHeight = gameContainerRect.height;

        const newX = (newXPercent / 100) * gameContainerWidth;
        const newY = (newYPercent / 100) * gameContainerHeight;
        const playerRect = {
            top: newY,
            bottom: newY + this.height,
            left: newX,
            right: newX + this.width
        };

        for (let coin of coins) {
            const coinRect = coin.element.getBoundingClientRect();

            if (
                playerRect.left < coinRect.right &&
                playerRect.right > coinRect.left &&
                playerRect.top < coinRect.bottom &&
                playerRect.bottom > coinRect.top
            ) {
                coin.element.remove();
                coins.splice(coins.indexOf(coin), 1);
                this.coins += coin.value;
                document.querySelector('#coins-amount').innerText = 'Coins: ' + this.coins;
            }
        }
    }

    update(deltaTime, trees, coins) {
        this.move(deltaTime, trees, coins);
        this.updateVisuals();
    }

    updateVisuals() {
        this.element.style.left = this.x + '%';
        this.element.style.top = this.y + '%';
    }
}
