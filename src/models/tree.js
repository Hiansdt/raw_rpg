import { GAME_SETTINGS } from "../utils/constants.js";
export class Tree {
    constructor(trees) {
        this.id = Math.floor(Math.random() * 1000);
        this.width = GAME_SETTINGS.TREE_WIDTH;
        this.height = GAME_SETTINGS.TREE_HEIGHT;
        this.zIndex = 0;
        this.element = null;
        this.getTreePosition(trees);
    }

    createTreeElement() {
        let treeElement = document.createElement('div');
        
        treeElement.classList.add('tree');

        treeElement.style.width = this.width + '%';
        treeElement.style.height = 'auto';
        treeElement.style.paddingTop = this.height + '%';
        treeElement.style.position = 'absolute';
        treeElement.style.top = this.y + 'px';
        treeElement.style.left = this.x + 'px';
        // treeElement.style.backgroundImage = `url(./assets/images/pineTree.png)`;
        treeElement.style.backgroundImage = `url(./assets/images/pineTreeNight.png)`;
        treeElement.style.backgroundSize = 'cover';
        treeElement.style.filter = 'drop-shadow(10px -50px 3px rgba(0, 0, 0, 0.5))';
        treeElement.style.zIndex = this.zIndex;
        this.element = treeElement;
        return treeElement;
    }

    getTreePosition(trees) {
        const window = document.querySelector('#game-container').getBoundingClientRect();
        const x = Math.floor(Math.random() * window.width);
        const y = Math.floor(Math.random() * window.height);
        const isNearBorder = (x > window.width * 0.95 || y > window.height*0.85 );
        const isNearPlayer =  (x <= window.width/2 + 150 && x >= window.width/2 - 150 && y <= window.height/2 + 150 && y >= window.height/2 - 150);
        if (isNearBorder || isNearPlayer) {
            return this.getTreePosition(trees);
        }
        this.zIndex = y;
        this.x = x;
        this.y = y;
    }
}