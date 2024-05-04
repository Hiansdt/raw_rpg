import TreeManager from '../managers/treeManager.js';
import CoinManager from '../managers/coinManager.js';

export class Area {
    constructor(maxTrees, maxCoins, location) {
        this.treeManager = new TreeManager(maxTrees);
        this.coinManager = new CoinManager(maxCoins);
        this.location = location;
    }

    removeArea() {
        let oldAreaElement = document.querySelector('.area');
        if (oldAreaElement) {
            oldAreaElement.style.animation = 'area-fade-out 1s forwards';
            oldAreaElement.addEventListener('animationend', () => {
                oldAreaElement.remove();
            });
        }
    }

    renderArea() {
        this.removeArea()
        let areaElement = document.createElement('div');
        let gameContainer = document.querySelector('#game-container');
        gameContainer.appendChild(areaElement);
        areaElement.classList.add('area');
        areaElement.style.width = '100%';
        areaElement.style.height = '100%';
        areaElement.style.position = 'absolute';
        areaElement.style.top = '0';
        areaElement.style.left = '0';

        let currentAreaText = document.createElement('p');
        currentAreaText.innerHTML = `Area: x:${this.location.x}, y:${this.location.y}`;
        currentAreaText.style.position = 'absolute';
        currentAreaText.style.top = '10px';
        currentAreaText.style.left = '10px';
        areaElement.appendChild(currentAreaText);
        this.treeManager.renderTrees(areaElement);
        this.coinManager.renderCoins(areaElement);
    }
}