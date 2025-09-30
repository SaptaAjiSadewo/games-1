import { Entity } from './entity.js';
import { Characters } from '../config/Characters.js';
import { GameConfig } from '../config/game-config.js';

export class Player extends Entity {
    constructor(x, y) {
        const config = Characters.player;
        super(x, y, config.emoji, config.size, config.maxHealth, config.maxHealth);
        
        this.hunger = 100;
        this.thirst = 100;
        this.speed = config.speed;
        this.inventory = {
            wood: 0,
            stone: 0,
            food: 0,
            water: 0
        };
        this.equipment = {
            sword: false,
            shield: false,
            shelter: false
        };
        this.lastNeedUpdate = Date.now();
    }

    createElement() {
        return super.createElement('player');
    }

    move(dx, dy, worldWidth, worldHeight) {
        this.x = Math.max(20, Math.min(worldWidth - 20, this.x + dx));
        this.y = Math.max(20, Math.min(worldHeight - 20, this.y + dy));
        this.updatePosition();
    }

    updateNeeds() {
        const now = Date.now();
        const deltaTime = (now - this.lastNeedUpdate) / 1000; // Convert to seconds
        
        if (deltaTime >= 1) { // Update every second instead of every frame
            this.hunger = Math.max(0, this.hunger - GameConfig.PLAYER.HUNGER_DECAY);
            this.thirst = Math.max(0, this.thirst - GameConfig.PLAYER.THIRST_DECAY);
            
            if (this.hunger <= 0 || this.thirst <= 0) {
                this.health = Math.max(0, this.health - GameConfig.PLAYER.DAMAGE_TAKEN);
            }
            
            this.consumeResources();
            this.lastNeedUpdate = now;
        }
    }

    consumeResources() {
        // Auto-consume when below 30% (lebih longgar dari sebelumnya 50%)
        if (this.hunger < 30 && this.inventory.food > 0) {
            this.inventory.food--;
            this.hunger = Math.min(100, this.hunger + 40); // Lebih banyak recovery
        }
        
        if (this.thirst < 30 && this.inventory.water > 0) {
            this.inventory.water--;
            this.thirst = Math.min(100, this.thirst + 50); // Lebih banyak recovery
        }
    }

    takeDamage(damage) {
        const actualDamage = this.equipment.shield ? damage * 0.4 : damage; // Lebih baik protection
        this.health = Math.max(0, this.health - actualDamage);
        this.updateHealthBar();
        return this.health > 0;
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        this.updateHealthBar();
    }
}