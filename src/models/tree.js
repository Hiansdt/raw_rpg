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

        treeElement.style.width = this.width + '%';
        treeElement.style.height = 'auto';
        treeElement.style.paddingTop = this.height + '%';
        treeElement.style.position = 'absolute';
        treeElement.style.top = this.y + '%';
        treeElement.style.left = this.x + '%';
        treeElement.style.backgroundImage = `url(./assets/images/tree.svg)`;
        treeElement.style.backgroundSize = 'cover';
        treeElement.style.zIndex = '1';
        this.element = treeElement;
        return treeElement;
    }

    getTreePosition() {
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        const isNearBorder = (x > 96.5 || y > 86.5 );
        const isNearPlayer =  (x <= 55 && x >= 40 && y <= 55 && y >= 30);

        if (isNearBorder || isNearPlayer) {
            return this.getTreePosition();
        }
        this.x = x;
        this.y = y;
    }
}