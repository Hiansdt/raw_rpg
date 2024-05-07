import { Area } from '../models/area.js';
import { GAME_SETTINGS } from '../utils/constants.js';

export default class AreaManager {
    constructor(player) {
        this.currentArea = null;
        this.allAreas = [];
        this.player = player
        this.gameContainer = document.querySelector('#game-container');
    }

    createInitialArea(maxTrees, maxCoins, location) {
        this.currentArea = new Area(maxTrees, maxCoins, location);
        this.allAreas.push(this.currentArea);
        this.currentArea.renderArea(this.gameContainer);
    }

    areaExistsInDirection(xOffset, yOffset) {
        const targetX = this.currentArea.location.x + xOffset;
        const targetY = this.currentArea.location.y + yOffset;
        return this.allAreas.find(area => area.location.x === targetX && area.location.y === targetY);
    }

    update(deltaTime, player) {
        this.handleAreaChange(player);
    }

    handleAreaChange(player) {
        if (player.x < 0) {
            player.x = 100;
            const areaExists = this.areaExistsInDirection(-1, 0);
            this.currentArea = areaExists ? areaExists : new Area(GAME_SETTINGS.STANDARD_TREE_COUNT, 3, { x: this.currentArea.location.x - 1, y: this.currentArea.location.y });
            this.allAreas.push(this.currentArea);
            this.currentArea.renderArea(player);
            return;
        }

        if (player.x > 100) {
            player.x = 0;
            const areaExists = this.areaExistsInDirection(1, 0);
            this.currentArea = areaExists ? areaExists : new Area(GAME_SETTINGS.STANDARD_TREE_COUNT, 3, { x: this.currentArea.location.x + 1, y: this.currentArea.location.y });
            this.allAreas.push(this.currentArea);
            this.currentArea.renderArea(player);
            return;
        }

        if (player.y < 0) {
            player.y = 100;
            const areaExists = this.areaExistsInDirection(0, -1);
            this.currentArea = areaExists ? areaExists : new Area(GAME_SETTINGS.STANDARD_TREE_COUNT, 3, { x: this.currentArea.location.x, y: this.currentArea.location.y - 1 });
            this.allAreas.push(this.currentArea);
            this.currentArea.renderArea(player);
            return;
        }

        if (player.y > 100) {
            player.y = 0;
            const areaExists = this.areaExistsInDirection(0, 1);
            this.currentArea = areaExists ? areaExists : new Area(GAME_SETTINGS.STANDARD_TREE_COUNT, 3, { x: this.currentArea.location.x, y: this.currentArea.location.y + 1 });
            this.allAreas.push(this.currentArea);
            this.currentArea.renderArea(player);
            return;
        }
    }
}