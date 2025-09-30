import { Entity } from './entity.js';

export class Monster extends Entity {
    constructor(x, y, type, config) {
        super(x, y, config.emoji, config.size, config.maxHealth, config.maxHealth);
        this.type = type;
        this.speed = config.speed; // Sudah dikurangi di config
        this.damage = config.damage; // Sudah dikurangi di config
        this.config = config;
        this.lastMoveTime = Date.now();
    }

    createElement() {
        return super.createElement('monster');
    }

    moveTowards(target, worldWidth, worldHeight) {
        const now = Date.now();
        // Limit movement to every 100ms for smoother movement
        if (now - this.lastMoveTime < 100) return;
        
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only move if not too close to player
        if (distance > 10) { 
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
        
        this.x = Math.max(20, Math.min(worldWidth - 20, this.x));
        this.y = Math.max(20, Math.min(worldHeight - 20, this.y));
        this.updatePosition();
        this.lastMoveTime = now;
    }

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
        this.updateHealthBar();
        return this.health > 0;
    }
}