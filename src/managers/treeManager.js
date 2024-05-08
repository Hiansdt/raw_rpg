import { Tree } from '../models/tree.js';

export default class TreeManager {
    constructor(maxTrees) {
        this.maxTrees = maxTrees;
        this.trees = [];
        this.createTrees();
    }

    createTrees() {
        for (let i = 0; i < this.maxTrees; i++) {
            let tree = new Tree(this.trees);
            this.trees.push(tree);
        }
    }

    renderTrees(areaElement) {
        this.trees.forEach(tree => {
            const treeElement = tree.createTreeElement();
            areaElement.appendChild(treeElement);
        });
    }

}