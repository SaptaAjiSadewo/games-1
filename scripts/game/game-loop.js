import { GameConfig } from '../config/game-config.js';

export class GameLoop {
    constructor(gameState, world, combatSystem, uiSystem) {
        this.gameState = gameState;
        this.world = world;
        this.combatSystem = combatSystem;
        this.uiSystem = uiSystem;
        this.isRunning = false;
        this.lastUpdateTime = Date.now();
    }

    start() {
        this.isRunning = true;
        this.lastUpdateTime = Date.now();
        this.loop();
    }

    stop() {
        this.isRunning = false;
    }

    loop() {
        if (!this.isRunning || this.gameState.isGameOver()) return;

        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastUpdateTime;

        // Update game systems dengan interval yang lebih terkontrol
        if (deltaTime >= GameConfig.GAME_LOOP.INTERVAL) {
            this.gameState.player.updateNeeds();
            this.combatSystem.update();
            this.world.render();
            this.uiSystem.updateUI();
            this.lastUpdateTime = currentTime;
        }

        // Continue loop
        requestAnimationFrame(() => this.loop());
    }
}