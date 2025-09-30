import { Characters } from '../config/Characters.js';

export class CraftingSystem {
    constructor(gameState, uiSystem) {
        this.gameState = gameState;
        this.uiSystem = uiSystem;
    }

    craftItem(item) {
        if (this.gameState.isGameOver()) return false;
        
        let canCraft = false;
        const player = this.gameState.player;
        
        switch(item) {
            case 'sword':
                if (player.inventory.stone >= 2 && player.inventory.wood >= 1) {
                    player.inventory.stone -= 2;
                    player.inventory.wood -= 1;
                    player.equipment.sword = true;
                    canCraft = true;
                }
                break;
                
            case 'shield':
                if (player.inventory.stone >= 1 && player.inventory.wood >= 2) {
                    player.inventory.stone -= 1;
                    player.inventory.wood -= 2;
                    player.equipment.shield = true;
                    canCraft = true;
                }
                break;
                
            case 'shelter':
                if (player.inventory.wood >= 5 && player.inventory.stone >= 3) {
                    player.inventory.wood -= 5;
                    player.inventory.stone -= 3;
                    player.equipment.shelter = true;
                    player.heal(40); // Increased healing
                    canCraft = true;
                }
                break;
        }
        
        if (canCraft) {
            alert(`Kamu berhasil membuat ${Characters.craftedItems[item].emoji}! ${Characters.craftedItems[item].description}`);
            this.uiSystem.updateUI();
            return true;
        } else {
            alert('Resource tidak cukup!');
            return false;
        }
    }

    openCrafting() {
        // Improved crafting menu
        const craftChoice = prompt(
            'Pilih item untuk dibuat:\n\n' +
            '1. ⚔️ Pedang (2 batu, 1 kayu) - Meningkatkan damage serangan\n' +
            '2. 🛡️ Perisai (1 batu, 2 kayu) - Mengurangi damage dari monster\n' +
            '3. 🏠 Shelter (5 kayu, 3 batu) - Memulihkan 40 health\n\n' +
            'Masukkan angka pilihan (1-3):'
        );
        
        switch(craftChoice) {
            case '1': this.craftItem('sword'); break;
            case '2': this.craftItem('shield'); break;
            case '3': this.craftItem('shelter'); break;
            default: alert('Pilihan tidak valid!');
        }
    }
}