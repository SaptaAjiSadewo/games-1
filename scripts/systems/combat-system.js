import { GameConfig } from '../config/game-config.js';

export class CombatSystem {
    constructor(gameState, world) {
        this.gameState = gameState;
        this.world = world;
        this.lastSpawnCheck = Date.now();
    }

    update() {
        this.handleMonsterCombat();
        this.spawnNewMonsters();
        this.checkGameOver();
    }

    handleMonsterCombat() {
        this.gameState.monsters.forEach(monster => {
            // Monster movement dengan kecepatan yang sudah dikurangi
            monster.moveTowards(this.gameState.player, GameConfig.WORLD.WIDTH, GameConfig.WORLD.HEIGHT);
            
            // Combat check
            if (this.gameState.player.getDistance(monster) < GameConfig.COLLISION.COMBAT_DISTANCE) {
                const damage = this.gameState.player.equipment.shield ? 
                    monster.damage * 0.4 : monster.damage; // Protection lebih baik
                
                this.gameState.player.takeDamage(damage);
                
                // Player counter-attack with sword - damage dikurangi
                if (this.gameState.player.equipment.sword) {
                    monster.takeDamage(12); // Dikurangi dari 15
                }
            }
        });

        // Remove dead monsters
        this.gameState.monsters = this.gameState.monsters.filter(monster => 
            monster.health > 0
        );
    }

    attack() {
        if (this.gameState.isGameOver()) return;
        
        const attackableMonsters = this.gameState.getAttackableMonsters();
        
        if (attackableMonsters.length > 0) {
            const monster = attackableMonsters[0];
            const damage = this.gameState.player.equipment.sword ? 20 : 8; // Damage dikurangi
            
            if (!monster.takeDamage(damage)) {
                this.gameState.removeMonster(monster);
            }
            
            this.world.render();
        }
    }

    spawnNewMonsters() {
        const now = Date.now();
        // Check spawn every 3 seconds instead of every frame
        if (now - this.lastSpawnCheck > 1000) {
            if (Math.random() < GameConfig.SPAWN.MONSTER_SPAWN_RATE && 
                this.gameState.monsters.length < GameConfig.SPAWN.MAX_MONSTERS) {
                this.world.spawnMonster();
            }
            this.lastSpawnCheck = now;
        }
    }

    checkGameOver() {
        if (this.gameState.player.health <= 0 && !this.gameState.isGameOver()) {
            this.gameState.setGameOver();
            setTimeout(() => {
                alert('Game Over! Kamu telah dikalahkan monster. Tekan Reset untuk bermain lagi.');
            }, 100);
        }
    }
}