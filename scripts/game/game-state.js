import { Player } from "../entities/player.js";
import { GameConfig } from "../config/game-config.js";

export class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.player = new Player(
      GameConfig.WORLD.WIDTH / 2,
      GameConfig.WORLD.HEIGHT / 2
    );
    this.monsters = [];
    this.resources = [];
    this.gameOver = false;
    this.keys = {};
  }

  isGameOver() {
    return this.gameOver;
  }

  setGameOver() {
    this.gameOver = true;
  }

  addMonster(monster) {
    this.monsters.push(monster);
  }

  removeMonster(monster) {
    this.monsters = this.monsters.filter((m) => m !== monster);
  }

  addResource(resource) {
    this.resources.push(resource);
  }

  removeResource(resource) {
    this.resources = this.resources.filter((r) => r !== resource);
  }

  getNearbyResources(distance = GameConfig.COLLISION.COLLECT_DISTANCE) {
    return this.resources.filter(
      (resource) => this.player.getDistance(resource) < distance
    );
  }

  getNearbyMonsters(distance = GameConfig.COLLISION.COMBAT_DISTANCE) {
    return this.monsters.filter(
      (monster) => this.player.getDistance(monster) < distance
    );
  }

  getAttackableMonsters(distance = GameConfig.COLLISION.ATTACK_DISTANCE) {
    return this.monsters.filter(
      (monster) => this.player.getDistance(monster) < distance
    );
  }
}
