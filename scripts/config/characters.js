export const Characters = {
    player: {
        emoji: '🍆',
        size: 50,
        speed: 20,
        maxHealth: 100
    },
    monsters: [
        {
            type: 'goblin',
            emoji: '👹',
            size: 35,
            speed: 1.2,  // Dikurangi dari 2
            maxHealth: 30,
            damage: 6    // Dikurangi dari 10
        },
        {
            type: 'ghost',
            emoji: '👻',
            size: 35,
            speed: 1.8,  // Dikurangi dari 3
            maxHealth: 25,
            damage: 5    // Dikurangi dari 8
        },
        {
            type: 'zombie',
            emoji: '🧟',
            size: 35,
            speed: 0.9,  // Dikurangi dari 1.5
            maxHealth: 40,
            damage: 8    // Dikurangi dari 12
        }
    ],
    resources: {
        wood: {
            emoji: '🌲',
            size: 30
        },
        stone: {
            emoji: '🪨',
            size: 30
        },
        food: {
            emoji: '🍎',
            size: 25
        },
        water: {
            emoji: '💧',
            size: 25
        }
    },
    craftedItems: {
        sword: {
            emoji: '⚔️',
            description: 'Meningkatkan damage serangan'
        },
        shield: {
            emoji: '🛡️',
            description: 'Mengurangi damage dari monster'
        },
        shelter: {
            emoji: '🏠',
            description: 'Memulihkan kesehatan'
        }
    }
};