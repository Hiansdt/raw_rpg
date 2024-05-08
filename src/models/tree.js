import { GAME_SETTINGS } from "../utils/constants.js";
export class Tree {
    constructor(trees) {
        this.id = Math.floor(Math.random() * 1000);
        this.width = GAME_SETTINGS.TREE_WIDTH;
        this.height = GAME_SETTINGS.TREE_HEIGHT;
        this.element = null;
        this.getTreePosition(trees);
    }

    createTreeElement() {
        let treeElement = document.createElement('div');
        
        treeElement.classList.add('tree');

        treeElement.style.width = this.width + 'px';
        treeElement.style.height = this.height + 'px';
        treeElement.style.position = 'absolute';
        treeElement.style.top = this.y + '%';
        treeElement.style.left = this.x + '%';
        treeElement.style.backgroundImage = `url(./assets/images/tree.svg)`;
        treeElement.style.backgroundSize = 'cover';
        this.element = treeElement;
        return treeElement;
    }

    getTreePosition() {
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        const isNearBorder = (x < 5 || x > 95 || y < 5 || y > 80 );
        const isNearPlayer =  (x <= 65 && x >= 40 && y <= 55 && y >= 30);

        if (isNearBorder || isNearPlayer) {
            return this.getTreePosition();
        }
        this.x = x;
        this.y = y;
    }
}