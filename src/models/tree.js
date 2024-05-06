import { GAME_SETTINGS } from "../utils/constants.js";
export class Tree {
    constructor() {
        this.id = Math.floor(Math.random() * 1000);
        this.x = Math.floor(Math.random() * 100);
        this.y = Math.floor(Math.random() * 100);
        this.width = GAME_SETTINGS.TREE_WIDTH;
        this.height = GAME_SETTINGS.TREE_HEIGHT;
        this.element = null;
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
}