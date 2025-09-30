// Konfigurasi karakter dan entitas game
const CHARACTERS = {
  player: {
    emoji: "😎",
    size: 40,
    speed: 5,
    maxHealth: 100,
  },
  monsters: [
    {
      type: "goblin",
      emoji: "👹",
      size: 35,
      speed: 2,
      maxHealth: 30,
      damage: 10,
    },
    {
      type: "ghost",
      emoji: "👻",
      size: 35,
      speed: 3,
      maxHealth: 25,
      damage: 8,
    },
    {
      type: "zombie",
      emoji: "🧟",
      size: 35,
      speed: 1.5,
      maxHealth: 40,
      damage: 12,
    },
  ],
  resources: {
    wood: {
      emoji: "🌲",
      size: 30,
    },
    stone: {
      emoji: "🪨",
      size: 30,
    },
    food: {
      emoji: "🍎",
      size: 25,
    },
    water: {
      emoji: "💧",
      size: 25,
    },
  },
  craftedItems: {
    sword: {
      emoji: "⚔️",
      description: "Meningkatkan damage serangan",
    },
    shield: {
      emoji: "🛡️",
      description: "Mengurangi damage dari monster",
    },
    shelter: {
      emoji: "🏠",
      description: "Memulihkan kesehatan",
    },
  },
};

// Fungsi untuk membuat elemen entitas
function createEntityElement(
  type,
  emoji,
  x,
  y,
  size,
  health = null,
  maxHealth = null
) {
  const entity = document.createElement("div");
  entity.className = `entity ${type}-entity`;
  entity.style.left = `${x}px`;
  entity.style.top = `${y}px`;

  // Tambahkan health bar jika health tersedia
  if (health !== null && maxHealth !== null) {
    const healthBarContainer = document.createElement("div");
    healthBarContainer.className = "health-bar-container";

    const healthBar = document.createElement("div");
    healthBar.className = "health-bar";
    healthBar.style.width = `${(health / maxHealth) * 100}%`;

    healthBarContainer.appendChild(healthBar);
    entity.appendChild(healthBarContainer);
  }

  const emojiElement = document.createElement("div");
  emojiElement.className = "emoji";
  emojiElement.textContent = emoji;
  emojiElement.style.fontSize = `${size}px`;

  entity.appendChild(emojiElement);

  return entity;
}

// Fungsi untuk update health bar
function updateHealthBar(entityElement, health, maxHealth) {
  const healthBar = entityElement.querySelector(".health-bar");
  if (healthBar) {
    healthBar.style.width = `${(health / maxHealth) * 100}%`;

    // Ubah warna berdasarkan kesehatan
    if (health < maxHealth * 0.25) {
      healthBar.style.backgroundColor = "#f44336";
    } else if (health < maxHealth * 0.5) {
      healthBar.style.backgroundColor = "#ff9800";
    } else {
      healthBar.style.backgroundColor = "#4CAF50";
    }
  }
}
