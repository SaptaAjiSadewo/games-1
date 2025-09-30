// State game
let gameState = {
  player: {
    x: 400,
    y: 250,
    health: 100,
    hunger: 100,
    thirst: 100,
    inventory: {
      wood: 0,
      stone: 0,
      food: 0,
      water: 0,
    },
    equipment: {
      sword: false,
      shield: false,
      shelter: false,
    },
  },
  monsters: [],
  resources: [],
  gameOver: false,
  keys: {},
};

// Dimensi game world
const WORLD_WIDTH = 800;
const WORLD_HEIGHT = 500;

// Inisialisasi game
function initGame() {
  spawnInitialResources();
  spawnInitialMonsters();
  renderGameWorld();
  updateUI();

  // Event listeners
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("craft-btn").addEventListener("click", openCrafting);
  document
    .getElementById("collect-btn")
    .addEventListener("click", collectResource);
  document.getElementById("attack-btn").addEventListener("click", attack);

  // Game loop untuk pergerakan monster
  setInterval(gameLoop, 100);
}

// Game loop untuk pergerakan monster
function gameLoop() {
  if (gameState.gameOver) return;

  moveMonsters();
  checkForCombat();
  updateNeeds();
  renderGameWorld();
  updateUI();
}

// Render game world
function renderGameWorld() {
  const gameWorld = document.getElementById("game-world");
  gameWorld.innerHTML = "";

  // Render player
  const playerElement = createEntityElement(
    "player",
    CHARACTERS.player.emoji,
    gameState.player.x,
    gameState.player.y,
    CHARACTERS.player.size,
    gameState.player.health,
    CHARACTERS.player.maxHealth
  );
  gameWorld.appendChild(playerElement);

  // Render monsters
  gameState.monsters.forEach((monster) => {
    const monsterConfig = CHARACTERS.monsters.find(
      (m) => m.type === monster.type
    );
    const monsterElement = createEntityElement(
      "monster",
      monsterConfig.emoji,
      monster.x,
      monster.y,
      monsterConfig.size,
      monster.health,
      monsterConfig.maxHealth
    );
    gameWorld.appendChild(monsterElement);
  });

  // Render resources
  gameState.resources.forEach((resource) => {
    const resourceElement = createEntityElement(
      "resource",
      CHARACTERS.resources[resource.type].emoji,
      resource.x,
      resource.y,
      CHARACTERS.resources[resource.type].size
    );
    gameWorld.appendChild(resourceElement);
  });
}

// Spawn resource awal
function spawnInitialResources() {
  gameState.resources = [];

  // Spawn wood
  for (let i = 0; i < 15; i++) {
    spawnResource("wood");
  }

  // Spawn stone
  for (let i = 0; i < 12; i++) {
    spawnResource("stone");
  }

  // Spawn food
  for (let i = 0; i < 10; i++) {
    spawnResource("food");
  }

  // Spawn water
  for (let i = 0; i < 8; i++) {
    spawnResource("water");
  }
}

// Spawn monster awal
function spawnInitialMonsters() {
  gameState.monsters = [];

  for (let i = 0; i < 6; i++) {
    spawnMonster();
  }
}

// Spawn resource di posisi acak
function spawnResource(type) {
  const x = Math.random() * (WORLD_WIDTH - 50) + 25;
  const y = Math.random() * (WORLD_HEIGHT - 50) + 25;

  gameState.resources.push({ x, y, type });
}

// Spawn monster di posisi acak
function spawnMonster() {
  const monsterTypes = CHARACTERS.monsters.map((m) => m.type);
  const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  const monsterConfig = CHARACTERS.monsters.find((m) => m.type === type);

  let x, y;
  // Pastikan monster tidak muncul terlalu dekat dengan player
  do {
    x = Math.random() * (WORLD_WIDTH - 50) + 25;
    y = Math.random() * (WORLD_HEIGHT - 50) + 25;
  } while (getDistance(x, y, gameState.player.x, gameState.player.y) < 100);

  gameState.monsters.push({
    x,
    y,
    type,
    health: monsterConfig.maxHealth,
    lastMove: Date.now(),
  });
}

// Handle key down
function handleKeyDown(e) {
  if (gameState.gameOver) return;

  gameState.keys[e.key.toLowerCase()] = true;

  // Handle movement
  let newX = gameState.player.x;
  let newY = gameState.player.y;

  if (gameState.keys["w"] || gameState.keys["arrowup"])
    newY -= CHARACTERS.player.speed;
  if (gameState.keys["s"] || gameState.keys["arrowdown"])
    newY += CHARACTERS.player.speed;
  if (gameState.keys["a"] || gameState.keys["arrowleft"])
    newX -= CHARACTERS.player.speed;
  if (gameState.keys["d"] || gameState.keys["arrowright"])
    newX += CHARACTERS.player.speed;

  // Batasi pergerakan player dalam game world
  newX = Math.max(20, Math.min(WORLD_WIDTH - 20, newX));
  newY = Math.max(20, Math.min(WORLD_HEIGHT - 20, newY));

  gameState.player.x = newX;
  gameState.player.y = newY;

  // Handle actions
  if (e.key === "e" || e.key === "E") {
    collectResource();
  } else if (e.key === "c" || e.key === "C") {
    openCrafting();
  } else if (e.key === " ") {
    attack();
  }

  checkForResourceCollection();
  renderGameWorld();
}

// Handle key up
function handleKeyUp(e) {
  gameState.keys[e.key.toLowerCase()] = false;
}

// Cek apakah player mengumpulkan resource
function checkForResourceCollection() {
  const collectDistance = 30;

  gameState.resources = gameState.resources.filter((resource) => {
    const distance = getDistance(
      gameState.player.x,
      gameState.player.y,
      resource.x,
      resource.y
    );

    if (distance < collectDistance) {
      gameState.player.inventory[resource.type]++;
      return false; // Hapus resource dari world
    }
    return true;
  });
}

// Kumpulkan resource secara manual
function collectResource() {
  checkForResourceCollection();
  renderGameWorld();
  updateUI();
}

// Gerakkan monster
function moveMonsters() {
  gameState.monsters.forEach((monster) => {
    const monsterConfig = CHARACTERS.monsters.find(
      (m) => m.type === monster.type
    );

    // Monster bergerak menuju player
    const dx = gameState.player.x - monster.x;
    const dy = gameState.player.y - monster.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 50) {
      // Jangan terlalu dekat dengan player
      monster.x += (dx / distance) * monsterConfig.speed;
      monster.y += (dy / distance) * monsterConfig.speed;
    }

    // Batasi pergerakan monster dalam game world
    monster.x = Math.max(20, Math.min(WORLD_WIDTH - 20, monster.x));
    monster.y = Math.max(20, Math.min(WORLD_HEIGHT - 20, monster.y));
  });
}

// Cek apakah terjadi pertarungan
function checkForCombat() {
  const combatDistance = 35;

  gameState.monsters.forEach((monster) => {
    const distance = getDistance(
      gameState.player.x,
      gameState.player.y,
      monster.x,
      monster.y
    );

    if (distance < combatDistance) {
      // Player diserang monster
      const monsterConfig = CHARACTERS.monsters.find(
        (m) => m.type === monster.type
      );
      const damage = gameState.player.equipment.shield
        ? monsterConfig.damage * 0.5
        : monsterConfig.damage;

      gameState.player.health = Math.max(0, gameState.player.health - damage);

      // Jika player punya pedang, monster juga menerima damage
      if (gameState.player.equipment.sword) {
        monster.health -= 15;
      }
    }
  });

  // Hapus monster yang mati
  gameState.monsters = gameState.monsters.filter((monster) => {
    const monsterConfig = CHARACTERS.monsters.find(
      (m) => m.type === monster.type
    );
    return monster.health > 0;
  });

  // Spawn monster baru secara acak
  if (Math.random() < 0.02 && gameState.monsters.length < 10) {
    spawnMonster();
  }

  // Cek game over
  if (gameState.player.health <= 0 && !gameState.gameOver) {
    gameState.gameOver = true;
    setTimeout(() => {
      alert(
        "Game Over! Kamu telah dikalahkan monster. Tekan Reset untuk bermain lagi."
      );
    }, 100);
  }
}

// Serang monster
function attack() {
  if (gameState.gameOver) return;

  const attackDistance = 50;

  // Cari monster dalam jarak serang
  const nearbyMonsters = gameState.monsters.filter((monster) => {
    const distance = getDistance(
      gameState.player.x,
      gameState.player.y,
      monster.x,
      monster.y
    );
    return distance < attackDistance;
  });

  if (nearbyMonsters.length > 0) {
    // Serang monster terdekat
    const monster = nearbyMonsters[0];
    const damage = gameState.player.equipment.sword ? 25 : 10;
    monster.health -= damage;

    // Hapus monster yang mati
    if (monster.health <= 0) {
      gameState.monsters = gameState.monsters.filter((m) => m !== monster);
    }

    renderGameWorld();
    updateUI();
  }
}

// Update kebutuhan player (kelaparan, haus)
function updateNeeds() {
  gameState.player.hunger = Math.max(0, gameState.player.hunger - 0.2);
  gameState.player.thirst = Math.max(0, gameState.player.thirst - 0.3);

  // Jika kelaparan atau kehausan, kesehatan berkurang
  if (gameState.player.hunger <= 0 || gameState.player.thirst <= 0) {
    gameState.player.health = Math.max(0, gameState.player.health - 1);
  }

  // Gunakan makanan dan air jika tersedia
  if (gameState.player.hunger < 50 && gameState.player.inventory.food > 0) {
    gameState.player.inventory.food--;
    gameState.player.hunger = Math.min(100, gameState.player.hunger + 30);
  }

  if (gameState.player.thirst < 50 && gameState.player.inventory.water > 0) {
    gameState.player.inventory.water--;
    gameState.player.thirst = Math.min(100, gameState.player.thirst + 40);
  }
}

// Craft item
function craftItem(item) {
  if (gameState.gameOver) return;

  let canCraft = false;

  switch (item) {
    case "sword":
      if (
        gameState.player.inventory.stone >= 2 &&
        gameState.player.inventory.wood >= 1
      ) {
        gameState.player.inventory.stone -= 2;
        gameState.player.inventory.wood -= 1;
        gameState.player.equipment.sword = true;
        canCraft = true;
      }
      break;

    case "shield":
      if (
        gameState.player.inventory.stone >= 1 &&
        gameState.player.inventory.wood >= 2
      ) {
        gameState.player.inventory.stone -= 1;
        gameState.player.inventory.wood -= 2;
        gameState.player.equipment.shield = true;
        canCraft = true;
      }
      break;

    case "shelter":
      if (
        gameState.player.inventory.wood >= 5 &&
        gameState.player.inventory.stone >= 3
      ) {
        gameState.player.inventory.wood -= 5;
        gameState.player.inventory.stone -= 3;
        gameState.player.equipment.shelter = true;
        canCraft = true;

        // Shelter memulihkan kesehatan
        gameState.player.health = Math.min(100, gameState.player.health + 30);
      }
      break;
  }

  if (canCraft) {
    alert(
      `Kamu berhasil membuat ${CHARACTERS.craftedItems[item].emoji}! ${CHARACTERS.craftedItems[item].description}`
    );
    updateUI();
  } else {
    alert("Resource tidak cukup!");
  }
}

// Buka menu crafting
function openCrafting() {
  const craftChoice = prompt(
    "Pilih item untuk dibuat:\n1. Pedang (2 batu, 1 kayu)\n2. Perisai (1 batu, 2 kayu)\n3. Shelter (5 kayu, 3 batu)"
  );

  switch (craftChoice) {
    case "1":
      craftItem("sword");
      break;
    case "2":
      craftItem("shield");
      break;
    case "3":
      craftItem("shelter");
      break;
  }
}

// Update tampilan UI
function updateUI() {
  // Update status player
  const statsElement = document.getElementById("player-stats");
  statsElement.innerHTML = `
        <div class="stat">❤️ Health: ${Math.round(
          gameState.player.health
        )}</div>
        <div class="stat">🍖 Hunger: ${Math.round(
          gameState.player.hunger
        )}</div>
        <div class="stat">💧 Thirst: ${Math.round(
          gameState.player.thirst
        )}</div>
    `;

  // Update inventory
  const inventoryElement = document.getElementById("inventory");
  inventoryElement.innerHTML = `
        <div class="resource">${CHARACTERS.resources.wood.emoji} Wood: ${gameState.player.inventory.wood}</div>
        <div class="resource">${CHARACTERS.resources.stone.emoji} Stone: ${gameState.player.inventory.stone}</div>
        <div class="resource">${CHARACTERS.resources.food.emoji} Food: ${gameState.player.inventory.food}</div>
        <div class="resource">${CHARACTERS.resources.water.emoji} Water: ${gameState.player.inventory.water}</div>
    `;

  // Update crafting options
  const craftingElement = document.getElementById("crafting-options");
  craftingElement.innerHTML = `
        <div class="craft-item" onclick="craftItem('sword')">
            <span>${CHARACTERS.craftedItems.sword.emoji} Sword</span>
            <span>2${CHARACTERS.resources.stone.emoji} 1${CHARACTERS.resources.wood.emoji}</span>
        </div>
        <div class="craft-item" onclick="craftItem('shield')">
            <span>${CHARACTERS.craftedItems.shield.emoji} Shield</span>
            <span>1${CHARACTERS.resources.stone.emoji} 2${CHARACTERS.resources.wood.emoji}</span>
        </div>
        <div class="craft-item" onclick="craftItem('shelter')">
            <span>${CHARACTERS.craftedItems.shelter.emoji} Shelter</span>
            <span>5${CHARACTERS.resources.wood.emoji} 3${CHARACTERS.resources.stone.emoji}</span>
        </div>
    `;
}

// Reset game
function resetGame() {
  gameState = {
    player: {
      x: 400,
      y: 250,
      health: 100,
      hunger: 100,
      thirst: 100,
      inventory: {
        wood: 0,
        stone: 0,
        food: 0,
        water: 0,
      },
      equipment: {
        sword: false,
        shield: false,
        shelter: false,
      },
    },
    monsters: [],
    resources: [],
    gameOver: false,
    keys: {},
  };

  spawnInitialResources();
  spawnInitialMonsters();
  renderGameWorld();
  updateUI();
}

// Helper function untuk menghitung jarak
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Jalankan game saat halaman dimuat
window.onload = initGame;
