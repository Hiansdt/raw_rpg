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
        this.isTransitioning = ''
        this.createPlayerElement();
    }

    createPlayerElement() {
        let playerElement = document.createElement('div');
        let gameContainer = document.querySelector('#game-container');
        playerElement.id = 'player';
        playerElement.style.width = this.width + 'px';
        playerElement.style.height = this.height + 'px';
        playerElement.style.position = 'absolute';
        playerElement.style.top = this.y + '%';
        playerElement.style.left = this.x + '%';
        playerElement.style.backgroundColor = this.color;
        this.element = playerElement;
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

        console.log(this.isTransitioning)

        if (!collidedWithTree && !this.isTransitioning) {
            this.x = newX;
            this.y = newY;
        }
    }

    checkTreeCollision(newXPercent, newYPercent, trees) {
        // Implement tree collision logic based on player position and tree positions
        const gameContainer = document.querySelector('#game-container');
        const gameContainerRect = gameContainer.getBoundingClientRect();
        const gameContainerWidth = gameContainerRect.width;
        const gameContainerHeight = gameContainerRect.height;
    
        // Convert percentages to pixel values based on game container dimensions
        const newX = (newXPercent / 100) * gameContainerWidth;
        const newY = (newYPercent / 100) * gameContainerHeight;
        for (let tree of trees) {
            const treeRect = tree.element.getBoundingClientRect();

            // Calculate the potential new player rectangle based on newX, newY
            const playerRect = {
                top: newY,
                bottom: newY + this.height,
                left: newX,
                right: newX + this.width
            };

            // Check for collision between player and tree rectangles
            if (
                playerRect.left < treeRect.right &&
                playerRect.right > treeRect.left &&
                playerRect.top < treeRect.bottom &&
                playerRect.bottom > treeRect.top
            ) {
                // Collision detected, return true
                return true;
            }
        }
    }

    checkCoinCollision(coins) {
        // Implement coin collision logic based on player position and coin positions
    }

    update(deltaTime, trees, coins) {
        this.move(deltaTime, trees, coins);
        this.updateVisualPosition();
    }
    
    updateVisualPosition() {
        this.element.style.left = this.x + '%';
        this.element.style.top = this.y + '%';
    }
}
