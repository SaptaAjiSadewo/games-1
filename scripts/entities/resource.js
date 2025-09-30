import { Entity } from "./entity.js";

export class Resource extends Entity {
  constructor(x, y, type, config) {
    super(x, y, config.emoji, config.size);
    this.type = type;
  }

  createElement() {
    return super.createElement("resource");
  }
}
