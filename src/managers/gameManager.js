export default class GameManager {
    constructor(player, areaManager) {
        this.player = player;
        this.areaManager = areaManager;
    }

    update(deltaTime) {
        // Update game logic here
        this.player.update(deltaTime, this.areaManager.currentArea.treeManager.trees, this.areaManager.currentArea.coinManager.coins);
        this.areaManager.update(deltaTime, this.player);
        // Other game updates
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
