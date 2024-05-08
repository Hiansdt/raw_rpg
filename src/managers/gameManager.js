export default class GameManager {
    constructor(player, areaManager) {
        this.player = player;
        this.areaManager = areaManager;
    }

    update(deltaTime) {
        const trees = this.areaManager.currentArea.treeManager.trees;
        const coins = this.areaManager.currentArea.coinManager.coins;
        this.player.update(deltaTime, trees, coins);

        this.areaManager.update(deltaTime, this.player);
    }

    startGameLoop() {
        const loop = (timestamp) => {
            const deltaTime = timestamp - lastTimestamp;
            lastTimestamp = timestamp;
            
            this.update(deltaTime);
            requestAnimationFrame(loop);
        };
        
        let lastTimestamp = 0;
        requestAnimationFrame(loop);
    }
}