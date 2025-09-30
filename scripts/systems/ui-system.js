import { Characters } from "../config/characters.js";

export class UISystem {
  constructor(gameState) {
    this.gameState = gameState;
  }

  updateUI() {
    this.updatePlayerStats();
    this.updateInventory();
    this.updateCraftingOptions();
  }

  updatePlayerStats() {
    const statsElement = document.getElementById("player-stats");
    const player = this.gameState.player;

    statsElement.innerHTML = `
            <div class="stat">❤️ Health: ${Math.round(player.health)}</div>
            <div class="stat">🍖 Hunger: ${Math.round(player.hunger)}</div>
            <div class="stat">💧 Thirst: ${Math.round(player.thirst)}</div>
        `;
  }

  updateInventory() {
    const inventoryElement = document.getElementById("inventory");
    const inventory = this.gameState.player.inventory;

    inventoryElement.innerHTML = `
            <div class="resource">${Characters.resources.wood.emoji} Wood: ${inventory.wood}</div>
            <div class="resource">${Characters.resources.stone.emoji} Stone: ${inventory.stone}</div>
            <div class="resource">${Characters.resources.food.emoji} Food: ${inventory.food}</div>
            <div class="resource">${Characters.resources.water.emoji} Water: ${inventory.water}</div>
        `;
  }

  updateCraftingOptions() {
    const craftingElement = document.getElementById("crafting-options");

    craftingElement.innerHTML = `
            <div class="craft-item" onclick="window.game.craftingSystem.craftItem('sword')">
                <span>${Characters.craftedItems.sword.emoji} Sword</span>
                <span>2${Characters.resources.stone.emoji} 1${Characters.resources.wood.emoji}</span>
            </div>
            <div class="craft-item" onclick="window.game.craftingSystem.craftItem('shield')">
                <span>${Characters.craftedItems.shield.emoji} Shield</span>
                <span>1${Characters.resources.stone.emoji} 2${Characters.resources.wood.emoji}</span>
            </div>
            <div class="craft-item" onclick="window.game.craftingSystem.craftItem('shelter')">
                <span>${Characters.craftedItems.shelter.emoji} Shelter</span>
                <span>5${Characters.resources.wood.emoji} 3${Characters.resources.stone.emoji}</span>
            </div>
        `;
  }
}
