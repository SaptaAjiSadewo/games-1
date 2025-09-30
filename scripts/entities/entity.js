export class Entity {
  constructor(x, y, emoji, size, health = null, maxHealth = null) {
    this.x = x;
    this.y = y;
    this.emoji = emoji;
    this.size = size;
    this.health = health;
    this.maxHealth = maxHealth;
    this.element = null;
  }

  createElement(type) {
    const entity = document.createElement("div");
    entity.className = `entity ${type}-entity`;
    entity.style.left = `${this.x}px`;
    entity.style.top = `${this.y}px`;

    if (this.health !== null && this.maxHealth !== null) {
      const healthBarContainer = document.createElement("div");
      healthBarContainer.className = "health-bar-container";

      const healthBar = document.createElement("div");
      healthBar.className = "health-bar";
      healthBar.style.width = `${(this.health / this.maxHealth) * 100}%`;

      healthBarContainer.appendChild(healthBar);
      entity.appendChild(healthBarContainer);
    }

    const emojiElement = document.createElement("div");
    emojiElement.className = "emoji";
    emojiElement.textContent = this.emoji;
    emojiElement.style.fontSize = `${this.size}px`;

    entity.appendChild(emojiElement);
    this.element = entity;

    return entity;
  }

  updateHealthBar() {
    if (this.element && this.health !== null && this.maxHealth !== null) {
      const healthBar = this.element.querySelector(".health-bar");
      if (healthBar) {
        healthBar.style.width = `${(this.health / this.maxHealth) * 100}%`;

        if (this.health < this.maxHealth * 0.25) {
          healthBar.style.backgroundColor = "#f44336";
        } else if (this.health < this.maxHealth * 0.5) {
          healthBar.style.backgroundColor = "#ff9800";
        } else {
          healthBar.style.backgroundColor = "#4CAF50";
        }
      }
    }
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }

  getDistance(otherEntity) {
    return Math.sqrt(
      (otherEntity.x - this.x) ** 2 + (otherEntity.y - this.y) ** 2
    );
  }
}
