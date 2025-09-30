import { Resource } from "../entities/resource.js";
import { Monster } from "../entities/monster.js";
import { Characters } from "../config/characters.js";
import { GameConfig } from "../config/game-config.js";

export class World {
  constructor(gameState) {
    this.gameState = gameState;
    this.worldElement = document.getElementById("game-world");
  }

  render() {
    this.worldElement.innerHTML = "";

    // Render player
    this.worldElement.appendChild(this.gameState.player.createElement());

    // Render monsters
    this.gameState.monsters.forEach((monster) => {
      this.worldElement.appendChild(monster.createElement());
    });

    // Render resources
    this.gameState.resources.forEach((resource) => {
      this.worldElement.appendChild(resource.createElement());
    });
  }

  spawnResource(type) {
    const config = Characters.resources[type];
    const x = Math.random() * (GameConfig.WORLD.WIDTH - 50) + 25;
    const y = Math.random() * (GameConfig.WORLD.HEIGHT - 50) + 25;

    const resource = new Resource(x, y, type, config);
    this.gameState.addResource(resource);
    return resource;
  }

  spawnInitialResources() {
    const resources = GameConfig.SPAWN.RESOURCES;

    Object.keys(resources).forEach((type) => {
      for (let i = 0; i < resources[type]; i++) {
        this.spawnResource(type.toLowerCase());
      }
    });
  }

  spawnMonster() {
    const monsterTypes = Characters.monsters;
    const typeConfig =
      monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    let x, y;
    do {
      x = Math.random() * (GameConfig.WORLD.WIDTH - 50) + 25;
      y = Math.random() * (GameConfig.WORLD.HEIGHT - 50) + 25;
    } while (
      this.getDistance(x, y, this.gameState.player.x, this.gameState.player.y) <
      100
    );

    const monster = new Monster(x, y, typeConfig.type, typeConfig);
    this.gameState.addMonster(monster);
    return monster;
  }

  spawnInitialMonsters() {
    for (let i = 0; i < GameConfig.SPAWN.INITIAL_MONSTERS; i++) {
      this.spawnMonster();
    }
  }

  getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
}
