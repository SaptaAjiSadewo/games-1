export const GameConfig = {
    WORLD: {
        WIDTH: 800,
        HEIGHT: 500
    },
    COLLISION: {
        COLLECT_DISTANCE: 30,
        COMBAT_DISTANCE: 35,
        ATTACK_DISTANCE: 50
    },
    SPAWN: {
        INITIAL_MONSTERS: 4, // Dikurangi agar tidak terlalu banyak
        MAX_MONSTERS: 8,
        MONSTER_SPAWN_RATE: 1, // Dikurangi dari 0.02
        RESOURCES: {
            WOOD: 15,
            STONE: 12,
            FOOD: 10,
            WATER: 8
        }
    },
    PLAYER: {
        BASE_SPEED: 5,
        BASE_HEALTH: 100,
        HUNGER_DECAY: 0.08,  // Dikurangi dari 0.2
        THIRST_DECAY: 0.12,  // Dikurangi dari 0.3
        DAMAGE_TAKEN: 1
    },
    GAME_LOOP: {
        INTERVAL: 150 // Ditambah dari 100ms (lebih lambat)
    }
};