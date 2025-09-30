import { GameState } from "./game/game-state.js";
import { World } from "./game/world.js";
import { GameLoop } from "./game/game-loop.js";
import { InputSystem } from "./systems/input-system.js";
import { CombatSystem } from "./systems/combat-system.js";
import { CraftingSystem } from "./systems/crafting-system.js";
import { UISystem } from "./systems/ui-system.js";

class Game {
  constructor() {
    this.gameState = new GameState();
    this.world = new World(this.gameState);
    this.uiSystem = new UISystem(this.gameState);
    this.combatSystem = new CombatSystem(this.gameState, this.world);
    this.craftingSystem = new CraftingSystem(this.gameState, this.uiSystem);
    this.inputSystem = new InputSystem(
      this.gameState,
      this.world,
      this.combatSystem,
      this.craftingSystem
    );
    this.gameLoop = new GameLoop(
      this.gameState,
      this.world,
      this.combatSystem,
      this.uiSystem
    );

    this.setupGlobalAccess();
    this.setupEventListeners();
    this.init();
  }

  setupGlobalAccess() {
    // Expose game instance globally for HTML onclick events
    window.game = this;
  }

  setupEventListeners() {
    document.addEventListener("gameReset", () => this.reset());
  }

  init() {
    this.world.spawnInitialResources();
    this.world.spawnInitialMonsters();
    this.world.render();
    this.uiSystem.updateUI();
    this.gameLoop.start();
  }

  reset() {
    this.gameLoop.stop();
    this.gameState.reset();
    this.init();
  }
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
