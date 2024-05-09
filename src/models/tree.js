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
        treeElement.style.top = this.y + '%';
        treeElement.style.left = this.x + '%';
        treeElement.style.borderRadius = '50%';
        // treeElement.style.backgroundImage = `url(./assets/images/pineTree.png)`;
        treeElement.style.backgroundImage = `url(./assets/images/pineTreeNight.png)`;
        treeElement.style.backgroundSize = 'cover';
        treeElement.style.filter = 'drop-shadow(10px -30px 2px rgba(0, 0, 0, 0.5))';
        treeElement.style.zIndex = this.zIndex;
        this.element = treeElement;
        return treeElement;
    }

    getTreePosition(trees) {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);

        const isNearBorder = (x > 96.5 || y > 86.5 );
        const isNearPlayer =  (x <= 55 && x >= 40 && y <= 55 && y >= 30);
        if (isNearBorder || isNearPlayer) {
            return this.getTreePosition(trees);
        }
        this.zIndex = y;
        this.x = x;
        this.y = y;
    }
}