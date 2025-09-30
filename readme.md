# 🛡️ Survival Emoji: Neo Brutalism

A survival game with neo brutalism aesthetic where characters, enemies, and resources are represented by emojis. Built with HTML, CSS, and JavaScript using modular architecture.

## 🎮 Features

- **Emoji-based Graphics**: All game elements represented by emojis
- **Survival Mechanics**: Manage health, hunger, and thirst while fighting monsters
- **Crafting System**: Create swords, shields, and shelters from collected resources
- **Open World**: Free movement in a dynamic game world
- **Neo Brutalism Design**: Clean, geometric UI with high contrast colors
- **Real-time Combat**: Fight emoji monsters with attack mechanics

## 🚀 Quick Start

### Prerequisites

- Modern web browser with JavaScript enabled
- Local web server (for local development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SaptaAjiSadewo/games-1.git
```
2. Navigate to the project directory:

```bash
cd games-1
```

3. Open index.html with local server
    1. Live Server
    2. Live Preview

## 🎯 How to Play
**Controls** :Movement: W, A, S, D keys

**Collect** : Resources: E key

**Craft Items** : C key

**Attack** : Spacebar

**Reset Game** : Reset button in UI

## Gameplay
**Collect resources** : (🌲 wood, 🪨 stone, 🍎 food, 💧 water)

**Craft equipment** : (⚔️ sword, 🛡️ shield, 🏠 shelter)

**Fight monsters** : (👹 goblins, 👻 ghosts, 🧟 zombies)

**Manage your health, hunger, and thirst**

**Survive as long as possible!**

## 🏗️ Project Structure

```txt
survival-emoji-game/
├── index.html
├── config-panel.html
├── readme.md
├── styles/
│   └── main.css
└── scripts/
    ├── main.js
    ├── config/
    │   ├── characters.js
    │   └── game-config.js
    ├── game/
    │   ├── game-state.js
    │   ├── world.js
    │   └── game-loop.js
    ├── entities/
    │   ├── entity.js
    │   ├── player.js
    │   ├── monster.js
    │   └── resource.js
    └── systems/
        ├── input-system.js
        ├── combat-system.js
        ├── crafting-system.js
        └── ui-system.js
```

## 🔧 Configuration
**The game is highly configurable through two main files** :

- scripts/config/characters.js: Define player, monsters, resources, and items

- scripts/config/game-config.js: Adjust game mechanics and balance

## 🛠️ Development
**Modular Architecture**
- The game uses a modular ES6 architecture for maintainability:

- Entities: Game objects (Player, Monster, Resource)

- Systems: Game mechanics (Input, Combat, Crafting)

- Game Core: State management and game loop

- Adding New Features
Create new entity classes in scripts/entities/

- Add systems in scripts/systems/

- Update configuration files

- Import and integrate in main.js

## 🤝 Contributing
1. Fork the project

2. Create your feature branch (git checkout -b feature/BlaBlaBleFeature)

3. Commit your changes (git commit -m 'Add some BlaBlaBleFeature')

4. Push to the branch (git push origin feature/BlaBlaBleFeature)

5. Open a Pull Request

## 🙏 Acknowledgments
- Emoji graphics from Unicode Standard

- Neo brutalism design inspiration

- Game mechanics inspired by survival genre classics
