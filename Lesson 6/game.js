// Epic Quest - Final Adventure Game
// Lesson 6: Objects and Polish

// Character object with properties and methods
const character = {
    name: "Adventurer",
    className: "Hero",
    avatar: "🧙‍♂️",
    level: 1,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    gold: 0,
    experience: 0,
    experienceToNext: 100,
    
    // Character methods
    gainExperience(amount) {
        this.experience += amount;
        logMessage(`Gained ${amount} experience!`, 'info');
        
        while (this.experience >= this.experienceToNext) {
            this.levelUp();
        }
        updateDisplay();
    },
    
    levelUp() {
        this.level++;
        this.experience -= this.experienceToNext;
        this.experienceToNext = this.level * 100;
        this.maxHealth += 20;
        this.maxMana += 10;
        this.health = this.maxHealth; // Full heal on level up
        this.mana = this.maxMana;
        
        logMessage(`Level up! Now level ${this.level}!`, 'achievement');
        showLevelUpAnimation();
        checkAchievements();
    },
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        logMessage(`Took ${amount} damage!`, 'damage');
        
        if (this.health === 0) {
            gameOver();
        }
        updateDisplay();
    },
    
    heal(amount) {
        const actualHeal = Math.min(amount, this.maxHealth - this.health);
        this.health += actualHeal;
        logMessage(`Healed ${actualHeal} health!`, 'healing');
        updateDisplay();
        return actualHeal;
    },
    
    spendMana(amount) {
        if (this.mana >= amount) {
            this.mana -= amount;
            updateDisplay();
            return true;
        }
        return false;
    }
};

// Game state object
const gameState = {
    currentLocation: null,
    currentStory: null,
    gameStarted: false,
    difficulty: 'normal',
    settings: {
        soundEnabled: true,
        animationsEnabled: true,
        autoSave: true
    }
};

// Equipment system with objects
const equipment = {
    weapon: null,
    armor: null,
    accessory: null,
    
    equip(item) {
        if (item.slot && this[item.slot] !== item) {
            this.unequip(item.slot);
            this[item.slot] = item;
            item.equipped = true;
            this.applyStats(item, true);
            logMessage(`Equipped ${item.name}!`, 'info');
            updateDisplay();
        }
    },
    
    unequip(slot) {
        if (this[slot]) {
            this.applyStats(this[slot], false);
            this[slot].equipped = false;
            this[slot] = null;
            updateDisplay();
        }
    },
    
    applyStats(item, isEquipping) {
        const multiplier = isEquipping ? 1 : -1;
        if (item.stats) {
            if (item.stats.health) character.maxHealth += item.stats.health * multiplier;
            if (item.stats.mana) character.maxMana += item.stats.mana * multiplier;
            if (item.stats.attack) character.attack = (character.attack || 10) + item.stats.attack * multiplier;
        }
    }
};

// Inventory system
const inventory = {
    items: [],
    maxSize: 20,
    
    add(item) {
        if (this.items.length < this.maxSize) {
            this.items.push(item);
            updateDisplay();
            return true;
        } else {
            logMessage("Inventory full!", 'info');
            return false;
        }
    },
    
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            updateDisplay();
            return true;
        }
        return false;
    },
    
    has(itemName) {
        return this.items.some(item => item.name === itemName);
    },
    
    getItem(itemName) {
        return this.items.find(item => item.name === itemName);
    },
    
    use(item) {
        if (item.type === 'consumable' && item.effect) {
            item.effect();
            this.remove(item);
        } else if (item.type === 'equipment') {
            equipment.equip(item);
        }
    }
};

// Item definitions with object properties
const items = {
    // Weapons
    ironSword: {
        name: "Iron Sword",
        type: "equipment",
        slot: "weapon",
        rarity: "common",
        stats: { attack: 5 },
        description: "A sturdy iron sword"
    },
    
    magicStaff: {
        name: "Magic Staff",
        type: "equipment",
        slot: "weapon",
        rarity: "rare",
        stats: { attack: 3, mana: 20 },
        description: "A staff crackling with magical energy"
    },
    
    // Armor
    leatherArmor: {
        name: "Leather Armor",
        type: "equipment",
        slot: "armor",
        rarity: "common",
        stats: { health: 15 },
        description: "Basic protection for adventurers"
    },
    
    // Consumables
    healthPotion: {
        name: "Health Potion",
        type: "consumable",
        rarity: "common",
        description: "Restores 30 health",
        effect: () => character.heal(30)
    },
    
    manaPotion: {
        name: "Mana Potion",
        type: "consumable",
        rarity: "common",
        description: "Restores 25 mana",
        effect: () => {
            const oldMana = character.mana;
            character.mana = Math.min(character.maxMana, character.mana + 25);
            const restored = character.mana - oldMana;
            logMessage(`Restored ${restored} mana!`, 'magic');
            updateDisplay();
        }
    }
};

// Location system with objects
const locations = {
    village: {
        name: "Peaceful Village",
        description: "A quiet village where your adventure begins",
        image: "🏘️",
        visited: false,
        events: ['meetMerchant', 'visitTavern', 'exploreShop']
    },
    
    forest: {
        name: "Mystic Forest",
        description: "Ancient trees whisper secrets of old magic",
        image: "🌲",
        visited: false,
        events: ['encounterWolf', 'findTreasure', 'meetWiseOldMan']
    },
    
    dungeon: {
        name: "Dark Dungeon",
        description: "A foreboding dungeon filled with danger and treasure",
        image: "⚫",
        visited: false,
        requirements: { level: 3 },
        events: ['trapRoom', 'treasureChest', 'bossMonster']
    },
    
    castle: {
        name: "Royal Castle",
        description: "The magnificent castle of the realm",
        image: "🏰",
        visited: false,
        requirements: { reputation: 50 },
        events: ['meetKing', 'royalQuest', 'knightTraining']
    }
};

// Enemy objects
const enemies = {
    wolf: {
        name: "Forest Wolf",
        health: 25,
        maxHealth: 25,
        attack: 8,
        gold: 15,
        experience: 20,
        image: "🐺"
    },
    
    goblin: {
        name: "Sneaky Goblin",
        health: 20,
        maxHealth: 20,
        attack: 6,
        gold: 12,
        experience: 18,
        image: "👹"
    },
    
    dragon: {
        name: "Ancient Dragon",
        health: 100,
        maxHealth: 100,
        attack: 25,
        gold: 200,
        experience: 500,
        image: "🐉"
    }
};

// Achievement system
const achievements = {
    firstBlood: {
        name: "First Blood",
        description: "Defeat your first enemy",
        unlocked: false,
        icon: "⚔️"
    },
    
    collector: {
        name: "Collector",
        description: "Collect 10 items",
        unlocked: false,
        icon: "📦"
    },
    
    explorer: {
        name: "Explorer",
        description: "Visit all locations",
        unlocked: false,
        icon: "🗺️"
    },
    
    dragonSlayer: {
        name: "Dragon Slayer",
        description: "Defeat the Ancient Dragon",
        unlocked: false,
        icon: "🐲"
    }
};

// Combat system with objects
const combat = {
    currentEnemy: null,
    
    start(enemyType) {
        this.currentEnemy = { ...enemies[enemyType] }; // Create copy
        showCombatInterface();
        logMessage(`Combat started with ${this.currentEnemy.name}!`, 'info');
    },
    
    playerAttack() {
        if (!this.currentEnemy) return;
        
        const damage = this.calculateDamage();
        this.currentEnemy.health -= damage;
        
        const isCritical = Math.random() < 0.1; // 10% crit chance
        if (isCritical) {
            logMessage(`Critical hit! Dealt ${damage * 2} damage!`, 'damage');
            this.currentEnemy.health -= damage; // Double damage
        } else {
            logMessage(`Dealt ${damage} damage!`, 'damage');
        }
        
        if (this.currentEnemy.health <= 0) {
            this.victory();
        } else {
            this.enemyAttack();
        }
        
        updateCombatDisplay();
    },
    
    calculateDamage() {
        let baseDamage = 10;
        if (equipment.weapon && equipment.weapon.stats.attack) {
            baseDamage += equipment.weapon.stats.attack;
        }
        return baseDamage + Math.floor(Math.random() * 5); // Random 0-4 bonus
    },
    
    enemyAttack() {
        if (!this.currentEnemy) return;
        
        let damage = this.currentEnemy.attack;
        if (equipment.armor && equipment.armor.stats.defense) {
            damage = Math.max(1, damage - equipment.armor.stats.defense);
        }
        
        character.takeDamage(damage);
        logMessage(`${this.currentEnemy.name} attacked for ${damage} damage!`, 'damage');
    },
    
    victory() {
        character.gold += this.currentEnemy.gold;
        character.gainExperience(this.currentEnemy.experience);
        
        logMessage(`Victory! Gained ${this.currentEnemy.gold} gold!`, 'achievement');
        
        // Chance for item drop
        if (Math.random() < 0.3) {
            const possibleDrops = [items.healthPotion, items.manaPotion];
            const drop = possibleDrops[Math.floor(Math.random() * possibleDrops.length)];
            inventory.add({ ...drop }); // Create copy
            logMessage(`Found ${drop.name}!`, 'info');
        }
        
        this.currentEnemy = null;
        checkAchievements();
        hideCombatInterface();
        continueStory();
    },
    
    flee() {
        logMessage("You fled from battle!", 'info');
        this.currentEnemy = null;
        hideCombatInterface();
        continueStory();
    }
};

// Story system with branching paths
const stories = {
    intro: {
        text: "Choose your character class to begin your epic adventure:",
        image: "✨",
        choices: [
            {
                text: "🗡️ Warrior - Strong and brave",
                action: () => selectClass('warrior')
            },
            {
                text: "🔮 Mage - Wise and magical",
                action: () => selectClass('mage')
            },
            {
                text: "🏹 Ranger - Swift and skilled",
                action: () => selectClass('ranger')
            }
        ]
    },
    
    villageStart: {
        text: "You arrive at a peaceful village. The villagers seem friendly, but you sense adventure calling from beyond.",
        image: "🏘️",
        choices: [
            {
                text: "🛍️ Visit the merchant",
                action: () => showStory('merchantEncounter')
            },
            {
                text: "🌲 Explore the nearby forest",
                action: () => goToLocation('forest'),
                requirements: { level: 1 }
            },
            {
                text: "🏰 Head towards the castle",
                action: () => goToLocation('castle'),
                requirements: { level: 5 }
            }
        ]
    },
    
    merchantEncounter: {
        text: "The friendly merchant shows you various wares. 'Take this starter pack, young adventurer!' he says with a smile.",
        image: "🧙‍♂️",
        choices: [
            {
                text: "📦 Accept the starter pack",
                action: () => {
                    inventory.add({ ...items.healthPotion });
                    inventory.add({ ...items.ironSword });
                    character.gold += 50;
                    logMessage("Received starter pack!", 'achievement');
                    showStory('villageStart');
                }
            },
            {
                text: "🛍️ Browse the shop",
                action: () => openShop()
            },
            {
                text: "🚶 Leave politely",
                action: () => showStory('villageStart')
            }
        ]
    }
};

// Game initialization
function initializeGame() {
    // Add starting items
    inventory.add({ ...items.healthPotion });
    
    // Set initial location
    gameState.currentLocation = locations.village;
    
    // Start the game
    showStory('intro');
    updateDisplay();
    
    logMessage("Welcome to Epic Quest!", 'info');
    logMessage("Your adventure begins now...", 'info');
}

// Character class selection
function selectClass(className) {
    switch(className) {
        case 'warrior':
            character.className = "Warrior";
            character.avatar = "⚔️";
            character.maxHealth = 120;
            character.health = 120;
            character.attack = 15;
            inventory.add({ ...items.ironSword });
            break;
            
        case 'mage':
            character.className = "Mage";
            character.avatar = "🔮";
            character.maxMana = 80;
            character.mana = 80;
            character.attack = 8;
            inventory.add({ ...items.magicStaff });
            inventory.add({ ...items.manaPotion });
            break;
            
        case 'ranger':
            character.className = "Ranger";
            character.avatar = "🏹";
            character.maxHealth = 110;
            character.health = 110;
            character.maxMana = 60;
            character.mana = 60;
            character.attack = 12;
            inventory.add({ ...items.leatherArmor });
            break;
    }
    
    updateDisplay();
    showStory('villageStart');
    logMessage(`You are now a ${character.className}!`, 'achievement');
}

// Story display functions
function showStory(storyKey) {
    const story = stories[storyKey];
    if (!story) return;
    
    gameState.currentStory = storyKey;
    
    document.getElementById('storyText').innerHTML = story.text;
    document.getElementById('storyImage').innerHTML = story.image;
    
    displayChoices(story.choices);
}

function displayChoices(choices) {
    const choicesGrid = document.getElementById('choicesGrid');
    choicesGrid.innerHTML = '';
    
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.innerHTML = choice.text;
        
        // Check requirements
        let canChoose = true;
        let requirementText = '';
        
        if (choice.requirements) {
            if (choice.requirements.level && character.level < choice.requirements.level) {
                canChoose = false;
                requirementText = `<span class="choice-requirement">Requires level ${choice.requirements.level}</span>`;
            }
            if (choice.requirements.gold && character.gold < choice.requirements.gold) {
                canChoose = false;
                requirementText = `<span class="choice-requirement">Requires ${choice.requirements.gold} gold</span>`;
            }
            if (choice.requirements.item && !inventory.has(choice.requirements.item)) {
                canChoose = false;
                requirementText = `<span class="choice-requirement">Requires ${choice.requirements.item}</span>`;
            }
        }
        
        if (!canChoose) {
            button.disabled = true;
            button.innerHTML += requirementText;
        } else {
            button.onclick = choice.action;
        }
        
        // Add special styling
        if (choice.type) {
            button.classList.add(choice.type);
        }
        
        choicesGrid.appendChild(button);
    });
}

// Location system
function goToLocation(locationKey) {
    const location = locations[locationKey];
    if (!location) return;
    
    gameState.currentLocation = location;
    location.visited = true;
    
    document.getElementById('locationName').innerHTML = location.name;
    document.getElementById('locationDescription').innerHTML = location.description;
    document.getElementById('storyImage').innerHTML = location.image;
    
    // Random event
    const randomEvent = location.events[Math.floor(Math.random() * location.events.length)];
    handleLocationEvent(randomEvent);
    
    checkAchievements();
}

function handleLocationEvent(eventName) {
    switch(eventName) {
        case 'encounterWolf':
            document.getElementById('storyText').innerHTML = "A fierce wolf blocks your path!";
            combat.start('wolf');
            break;
            
        case 'findTreasure':
            document.getElementById('storyText').innerHTML = "You discover a hidden treasure chest!";
            character.gold += 25 + Math.floor(Math.random() * 25);
            inventory.add({ ...items.healthPotion });
            logMessage("Found treasure!", 'achievement');
            updateDisplay();
            showLocationChoices();
            break;
            
        case 'meetWiseOldMan':
            document.getElementById('storyText').innerHTML = "A wise old man offers to teach you ancient secrets.";
            if (character.gold >= 30) {
                displayChoices([
                    {
                        text: "💰 Pay 30 gold for training",
                        action: () => {
                            character.gold -= 30;
                            character.gainExperience(100);
                            showLocationChoices();
                        },
                        requirements: { gold: 30 }
                    },
                    {
                        text: "🚶 Decline and continue",
                        action: () => showLocationChoices()
                    }
                ]);
            } else {
                showLocationChoices();
            }
            break;
            
        default:
            showLocationChoices();
    }
}

function showLocationChoices() {
    const location = gameState.currentLocation;
    const choices = [
        {
            text: "🔍 Explore more",
            action: () => goToLocation(Object.keys(locations).find(key => locations[key] === location))
        },
        {
            text: "🏘️ Return to village",
            action: () => goToLocation('village')
        }
    ];
    
    // Add location-specific choices
    if (location === locations.village) {
        choices.push(
            {
                text: "🛍️ Visit shop",
                action: () => openShop()
            },
            {
                text: "🌲 Go to forest",
                action: () => goToLocation('forest')
            }
        );
    }
    
    displayChoices(choices);
}

// Combat interface
function showCombatInterface() {
    const enemy = combat.currentEnemy;
    document.getElementById('storyText').innerHTML = `
        <h3>Combat: ${enemy.name} ${enemy.image}</h3>
        <p>Enemy Health: ${enemy.health}/${enemy.maxHealth}</p>
    `;
    
    displayChoices([
        {
            text: "⚔️ Attack",
            action: () => combat.playerAttack()
        },
        {
            text: "🧪 Use Health Potion",
            action: () => useHealthPotion(),
            requirements: { item: "Health Potion" }
        },
        {
            text: "🏃 Flee",
            action: () => combat.flee()
        }
    ]);
}

function updateCombatDisplay() {
    if (combat.currentEnemy) {
        const enemy = combat.currentEnemy;
        document.getElementById('storyText').innerHTML = `
            <h3>Combat: ${enemy.name} ${enemy.image}</h3>
            <p>Enemy Health: ${enemy.health}/${enemy.maxHealth}</p>
        `;
    }
}

function hideCombatInterface() {
    // Combat interface is hidden when choices are updated
}

function continueStory() {
    showLocationChoices();
}

// Utility functions
function useHealthPotion() {
    const potion = inventory.getItem("Health Potion");
    if (potion) {
        inventory.use(potion);
    }
}

function openShop() {
    document.getElementById('storyText').innerHTML = "Welcome to the shop! What would you like to buy?";
    
    const shopItems = [
        { item: items.healthPotion, price: 15 },
        { item: items.manaPotion, price: 20 },
        { item: items.ironSword, price: 50 },
        { item: items.leatherArmor, price: 75 }
    ];
    
    const choices = shopItems.map(shopItem => ({
        text: `💰 Buy ${shopItem.item.name} (${shopItem.price} gold)`,
        action: () => buyItem(shopItem.item, shopItem.price),
        requirements: { gold: shopItem.price }
    }));
    
    choices.push({
        text: "🚶 Leave shop",
        action: () => showStory('villageStart')
    });
    
    displayChoices(choices);
}

function buyItem(item, price) {
    if (character.gold >= price && inventory.add({ ...item })) {
        character.gold -= price;
        logMessage(`Bought ${item.name} for ${price} gold!`, 'info');
        updateDisplay();
    }
    openShop(); // Refresh shop
}

// Achievement system
function checkAchievements() {
    // First Blood achievement
    if (!achievements.firstBlood.unlocked && combat.currentEnemy === null) {
        unlockAchievement('firstBlood');
    }
    
    // Collector achievement
    if (!achievements.collector.unlocked && inventory.items.length >= 10) {
        unlockAchievement('collector');
    }
    
    // Explorer achievement
    const visitedCount = Object.values(locations).filter(loc => loc.visited).length;
    if (!achievements.explorer.unlocked && visitedCount >= Object.keys(locations).length) {
        unlockAchievement('explorer');
    }
}

function unlockAchievement(achievementKey) {
    const achievement = achievements[achievementKey];
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        logMessage(`🏆 Achievement Unlocked: ${achievement.name}!`, 'achievement');
        updateAchievementsDisplay();
    }
}

// Display update functions
function updateDisplay() {
    updateStatsDisplay();
    updateInventoryDisplay();
    updateEquipmentDisplay();
}

function updateStatsDisplay() {
    document.getElementById('characterName').innerHTML = character.name;
    document.getElementById('characterClass').innerHTML = character.className;
    document.getElementById('avatar').innerHTML = character.avatar;
    
    const healthPercent = (character.health / character.maxHealth) * 100;
    const manaPercent = (character.mana / character.maxMana) * 100;
    
    document.getElementById('healthBar').style.width = healthPercent + '%';
    document.getElementById('manaBar').style.width = manaPercent + '%';
    document.getElementById('healthText').innerHTML = `${character.health}/${character.maxHealth}`;
    document.getElementById('manaText').innerHTML = `${character.mana}/${character.maxMana}`;
    document.getElementById('goldText').innerHTML = character.gold;
    document.getElementById('levelText').innerHTML = character.level;
}

function updateInventoryDisplay() {
    const inventoryGrid = document.getElementById('inventoryGrid');
    inventoryGrid.innerHTML = '';
    
    inventory.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = `inventory-item ${item.rarity || ''}`;
        itemDiv.innerHTML = item.name;
        itemDiv.title = item.description;
        itemDiv.onclick = () => inventory.use(item);
        inventoryGrid.appendChild(itemDiv);
    });
}

function updateEquipmentDisplay() {
    document.getElementById('weaponSlot').innerHTML = equipment.weapon ? equipment.weapon.name : '⚔️';
    document.getElementById('armorSlot').innerHTML = equipment.armor ? equipment.armor.name : '🛡️';
    document.getElementById('accessorySlot').innerHTML = equipment.accessory ? equipment.accessory.name : '💍';
}

function updateAchievementsDisplay() {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    Object.values(achievements).forEach(achievement => {
        const achievementDiv = document.createElement('div');
        achievementDiv.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
        achievementDiv.innerHTML = `${achievement.icon} ${achievement.name}`;
        achievementDiv.title = achievement.description;
        achievementsList.appendChild(achievementDiv);
    });
}

// Game log
function logMessage(message, type = 'info') {
    const gameLog = document.getElementById('gameLog');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = message;
    gameLog.appendChild(logEntry);
    gameLog.scrollTop = gameLog.scrollHeight;
    
    // Keep only last 20 messages
    while (gameLog.children.length > 20) {
        gameLog.removeChild(gameLog.firstChild);
    }
}

// Animation functions
function showLevelUpAnimation() {
    const characterCard = document.querySelector('.character-card');
    characterCard.classList.add('pulse');
    setTimeout(() => characterCard.classList.remove('pulse'), 2000);
}

// Modal functions
function showGameMenu() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>Game Menu</h2>
        <button onclick="saveGame()">💾 Save Game</button><br><br>
        <button onclick="loadGame()">📂 Load Game</button><br><br>
        <button onclick="showSettings()">⚙️ Settings</button><br><br>
        <button onclick="restartGame()">🔄 Restart Game</button><br><br>
        <button onclick="closeModal()">❌ Close</button>
    `;
    
    modal.style.display = 'block';
}

function showSettings() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>Settings</h2>
        <label><input type="checkbox" ${gameState.settings.soundEnabled ? 'checked' : ''}> Sound Effects</label><br><br>
        <label><input type="checkbox" ${gameState.settings.animationsEnabled ? 'checked' : ''}> Animations</label><br><br>
        <label><input type="checkbox" ${gameState.settings.autoSave ? 'checked' : ''}> Auto Save</label><br><br>
        <button onclick="closeModal()">✅ Apply Settings</button>
    `;
    
    modal.style.display = 'block';
}

function showHelp() {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>How to Play</h2>
        <p><strong>Combat:</strong> Click Attack to fight enemies. Use potions to heal.</p>
        <p><strong>Equipment:</strong> Click items in inventory to equip them.</p>
        <p><strong>Leveling:</strong> Gain experience by defeating enemies and completing quests.</p>
        <p><strong>Exploration:</strong> Visit different locations to find new adventures.</p>
        <p><strong>Achievements:</strong> Complete special objectives to unlock achievements.</p>
        <button onclick="closeModal()">❌ Close</button>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Save/Load functions
function saveGame() {
    const saveData = {
        character: character,
        inventory: inventory.items,
        equipment: equipment,
        gameState: gameState,
        achievements: achievements
    };
    
    localStorage.setItem('epicQuestSave', JSON.stringify(saveData));
    logMessage('Game saved!', 'info');
}

function loadGame() {
    const saveData = localStorage.getItem('epicQuestSave');
    if (saveData) {
        const data = JSON.parse(saveData);
        
        // Restore game state
        Object.assign(character, data.character);
        inventory.items = data.inventory || [];
        Object.assign(equipment, data.equipment);
        Object.assign(gameState, data.gameState);
        Object.assign(achievements, data.achievements);
        
        updateDisplay();
        logMessage('Game loaded!', 'info');
        closeModal();
    } else {
        logMessage('No saved game found!', 'info');
    }
}

function restartGame() {
    if (confirm('Are you sure you want to restart? This will delete your current progress.')) {
        location.reload();
    }
}

function gameOver() {
    document.getElementById('storyText').innerHTML = `
        <h2 style="color: #e74c3c;">Game Over</h2>
        <p>Your adventure has come to an end...</p>
        <p>Final Level: ${character.level}</p>
        <p>Gold Earned: ${character.gold}</p>
        <p>But every ending is a new beginning!</p>
    `;
    
    displayChoices([
        {
            text: "🔄 Try Again",
            action: () => location.reload()
        }
    ]);
}

// Initialize the game when page loads
window.onload = function() {
    initializeGame();
    updateAchievementsDisplay();
    
    // Auto-save every 30 seconds if enabled
    setInterval(() => {
        if (gameState.settings.autoSave) {
            saveGame();
        }
    }, 30000);
};