import { GameConfig } from "../config/game-config.js";

export class InputSystem {
  constructor(gameState, world, combatSystem, craftingSystem) {
    this.gameState = gameState;
    this.world = world;
    this.combatSystem = combatSystem;
    this.craftingSystem = craftingSystem;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.addEventListener("keyup", (e) => this.handleKeyUp(e));

    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetGame());
    document
      .getElementById("craft-btn")
      .addEventListener("click", () => this.craftingSystem.openCrafting());
    document
      .getElementById("collect-btn")
      .addEventListener("click", () => this.collectResource());
    document
      .getElementById("attack-btn")
      .addEventListener("click", () => this.combatSystem.attack());
  }

  handleKeyDown(e) {
    if (this.gameState.isGameOver()) return;

    const key = e.key.toLowerCase();
    this.gameState.keys[key] = true;

    this.handleMovement();

    // Handle actions
    if (key === "e") {
      this.collectResource();
    } else if (key === "c") {
      this.craftingSystem.openCrafting();
    } else if (key === " ") {
      this.combatSystem.attack();
    }
  }

  handleKeyUp(e) {
    this.gameState.keys[e.key.toLowerCase()] = false;
  }

  handleMovement() {
    let dx = 0,
      dy = 0;

    if (this.gameState.keys["w"] || this.gameState.keys["arrowup"])
      dy -= this.gameState.player.speed;
    if (this.gameState.keys["s"] || this.gameState.keys["arrowdown"])
      dy += this.gameState.player.speed;
    if (this.gameState.keys["a"] || this.gameState.keys["arrowleft"])
      dx -= this.gameState.player.speed;
    if (this.gameState.keys["d"] || this.gameState.keys["arrowright"])
      dx += this.gameState.player.speed;

    if (dx !== 0 || dy !== 0) {
      this.gameState.player.move(
        dx,
        dy,
        GameConfig.WORLD.WIDTH,
        GameConfig.WORLD.HEIGHT
      );
    }
  }

  collectResource() {
    const nearbyResources = this.gameState.getNearbyResources();
    nearbyResources.forEach((resource) => {
      this.gameState.player.inventory[resource.type]++;
      this.gameState.removeResource(resource);
    });
    this.world.render();
  }

  resetGame() {
    // Dispatch custom event for reset
    document.dispatchEvent(new CustomEvent("gameReset"));
  }
}
