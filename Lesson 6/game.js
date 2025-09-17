// The Legendary Spell Forge - Complete RPG Capstone
// Demonstrates ALL programming concepts from Lessons 1-6

// =============================================================================
// LESSON 1-2: Variables, Basic Data Types, and Conditionals
// =============================================================================

// Game state variables
let currentLocation = "village";
let gameCompleted = false;
let questsCompleted = [];

// =============================================================================
// LESSON 3: Functions and Code Organization
// =============================================================================

// Utility functions for common operations
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function calculateDamage(baseDamage, randomness = 10) {
    return baseDamage + rollDice(randomness);
}

function formatGold(amount) {
    return `${amount} gold`;
}

// =============================================================================
// LESSON 4: Arrays and Data Management
// =============================================================================

// Available items in the game (arrays of objects)
const availableItems = {
    weapons: [
        { id: 'wooden_sword', name: "Wooden Sword", attack: 5, price: 50, description: "A basic training sword" },
        { id: 'iron_sword', name: "Iron Sword", attack: 12, price: 150, description: "A reliable iron blade" },
        { id: 'silver_sword', name: "Silver Sword", attack: 20, price: 400, description: "Gleaming silver weapon" },
        { id: 'dragon_staff', name: "Dragon Staff", attack: 35, price: 1000, description: "Legendary magical staff" }
    ],
    armor: [
        { id: 'cloth_robe', name: "Cloth Robes", defense: 3, price: 40, description: "Simple cloth protection" },
        { id: 'leather_armor', name: "Leather Armor", defense: 8, price: 120, description: "Flexible leather protection" },
        { id: 'chain_mail', name: "Chain Mail", defense: 15, price: 300, description: "Interlocked metal rings" },
        { id: 'archmage_robes', name: "Archmage Robes", defense: 25, price: 800, description: "Magical protective robes" }
    ],
    consumables: [
        { id: 'health_potion', name: "Health Potion", effect: 'heal', power: 30, price: 25, description: "Restores 30 health" },
        { id: 'mana_potion', name: "Mana Potion", effect: 'mana', power: 40, price: 30, description: "Restores 40 mana" },
        { id: 'super_health', name: "Super Health Potion", effect: 'heal', power: 60, price: 50, description: "Restores 60 health" },
        { id: 'magic_crystal', name: "Magic Crystal", effect: 'mana', power: 80, price: 60, description: "Restores 80 mana" }
    ]
};

// Available quests (demonstrates arrays and complex data structures)
const availableQuests = [
    {
        id: 'rat_problem',
        name: "Rat Infestation",
        description: "The tavern cellar is overrun with giant rats! Clear them out.",
        goldReward: 100,
        xpReward: 150,
        completed: false,
        enemy: { name: "Giant Rat", health: 25, attack: 8 }
    },
    {
        id: 'goblin_camp',
        name: "Goblin Bandits",
        description: "Goblins are attacking merchant caravans. Stop them!",
        goldReward: 200,
        xpReward: 300,
        completed: false,
        enemy: { name: "Goblin Bandit", health: 45, attack: 12 }
    },
    {
        id: 'ancient_ruins',
        name: "Ancient Ruins",
        description: "Explore the mysterious ruins and retrieve the sacred artifact.",
        goldReward: 400,
        xpReward: 500,
        completed: false,
        enemy: { name: "Stone Guardian", health: 80, attack: 18 }
    },
    {
        id: 'dragon_lair',
        name: "The Dragon's Challenge",
        description: "Face the legendary dragon to prove your worth!",
        goldReward: 1000,
        xpReward: 1500,
        completed: false,
        enemy: { name: "Ancient Dragon", health: 150, attack: 25 }
    }
];

// =============================================================================
// LESSON 5: Loops and Advanced Array Operations
// =============================================================================

// Inventory management functions using loops
function findItemInInventory(itemId) {
    for (let i = 0; i < character.inventory.length; i++) {
        if (character.inventory[i].id === itemId) {
            return i;
        }
    }
    return -1;
}

function addItemToInventory(item, quantity = 1) {
    const existingIndex = findItemInInventory(item.id);

    if (existingIndex >= 0) {
        character.inventory[existingIndex].quantity += quantity;
    } else {
        character.inventory.push({ ...item, quantity: quantity });
    }

    effects.popup(`+${quantity} ${item.name}`, 'achievement');
    updateInventoryDisplay();
}

function removeItemFromInventory(itemId, quantity = 1) {
    const index = findItemInInventory(itemId);
    if (index >= 0) {
        character.inventory[index].quantity -= quantity;
        if (character.inventory[index].quantity <= 0) {
            character.inventory.splice(index, 1);
        }
        updateInventoryDisplay();
        return true;
    }
    return false;
}

function updateInventoryDisplay() {
    const inventoryDiv = document.getElementById('inventory');
    if (!inventoryDiv) return;

    let html = '<h4>📦 Inventory:</h4>';

    if (character.inventory.length === 0) {
        html += '<p>Empty inventory</p>';
    } else {
        for (let item of character.inventory) {
            let buttons = '';

            if (item.effect) {
                buttons += `<button onclick="useItem('${item.id}')">Use</button>`;
            }

            if (item.attack !== undefined) {
                buttons += `<button onclick="equipItem('${item.id}', 'weapon')">Equip</button>`;
            }

            if (item.defense !== undefined) {
                buttons += `<button onclick="equipItem('${item.id}', 'armor')">Equip</button>`;
            }

            html += `<div class="inventory-item">
                <span>${item.name} x${item.quantity}</span>
                <div class="item-buttons">${buttons}</div>
            </div>`;
        }
    }

    inventoryDiv.innerHTML = html;
}

// =============================================================================
// LESSON 6: Objects and Professional Organization
// =============================================================================

// Main character object with comprehensive methods
const character = {
    name: "Hero",
    health: 80,
    maxHealth: 80,
    mana: 60,
    maxMana: 60,
    gold: 200,
    level: 1,
    experience: 0,
    experienceToNext: 100,

    // Equipment system
    equipment: {
        weapon: { id: 'wooden_sword', name: "Wooden Sword", attack: 5 },
        armor: { id: 'cloth_robe', name: "Cloth Robes", defense: 3 }
    },

    // Inventory system (array of items)
    inventory: [
        { id: 'health_potion', name: "Health Potion", effect: 'heal', power: 30, quantity: 2 },
        { id: 'mana_potion', name: "Mana Potion", effect: 'mana', power: 40, quantity: 1 }
    ],

    // Known spells array
    spells: ['heal', 'fireball'],

    // Methods for character management
    modifyStats: function(changes) {
        if (changes.health !== undefined) {
            const oldHealth = this.health;
            this.health = Math.max(0, Math.min(this.maxHealth, this.health + changes.health));

            if (changes.health < 0) {
                effects.shake(document.querySelector('.status-panel'));
                effects.popup(`-${Math.abs(changes.health)} HP`, 'damage');
            } else if (changes.health > 0) {
                effects.popup(`+${changes.health} HP`, 'healing');
            }
        }

        if (changes.mana !== undefined) {
            this.mana = Math.max(0, Math.min(this.maxMana, this.mana + changes.mana));
            if (changes.mana < 0) {
                effects.popup(`-${Math.abs(changes.mana)} MP`, 'info');
            }
        }

        if (changes.gold !== undefined) {
            this.gold = Math.max(0, this.gold + changes.gold);
            if (changes.gold > 0) {
                effects.popup(`+${changes.gold} Gold!`, 'achievement');
            }
        }

        this.updateDisplay();
    },

    gainExperience: function(amount) {
        this.experience += amount;
        effects.popup(`+${amount} XP`, 'achievement');

        while (this.experience >= this.experienceToNext) {
            this.levelUp();
        }
    },

    levelUp: function() {
        this.level++;
        this.experience -= this.experienceToNext;
        this.experienceToNext = this.level * 100;

        this.maxHealth += 15;
        this.maxMana += 10;
        this.health = this.maxHealth;
        this.mana = this.maxMana;

        effects.popup(`Level Up! Now level ${this.level}!`, 'achievement');
        this.updateDisplay();
    },

    equipItem: function(item, slot) {
        const oldItem = this.equipment[slot];
        this.equipment[slot] = { ...item };

        // Add old item back to inventory if it exists
        if (oldItem && oldItem.id !== 'wooden_sword' && oldItem.id !== 'cloth_robe') {
            addItemToInventory(oldItem);
        }

        effects.popup(`Equipped ${item.name}!`, 'info');
        this.updateDisplay();
        updateInventoryDisplay();
    },

    updateDisplay: function() {
        document.getElementById('health').textContent = `${this.health}/${this.maxHealth}`;
        document.getElementById('mana').textContent = `${this.mana}/${this.maxMana}`;
        document.getElementById('gold').textContent = this.gold;
        document.getElementById('level').textContent = this.level;
        document.getElementById('experience').textContent = `${this.experience}/${this.experienceToNext}`;

        // Update equipment display
        document.getElementById('weapon').textContent = this.equipment.weapon.name;
        document.getElementById('armor').textContent = this.equipment.armor.name;
    }
};

// Spell system object
const spellSystem = {
    spells: {
        heal: { name: "Heal", manaCost: 15, effect: 'heal', power: 25 },
        fireball: { name: "Fireball", manaCost: 20, effect: 'damage', power: 30 },
        shield: { name: "Magic Shield", manaCost: 25, effect: 'shield', power: 20 },
        lightning: { name: "Lightning Bolt", manaCost: 35, effect: 'damage', power: 45 }
    },

    castSpell: function(spellName) {
        const spell = this.spells[spellName];
        if (!spell) return false;

        if (!character.spells.includes(spellName)) {
            effects.popup("You don't know that spell!", 'damage');
            return false;
        }

        if (character.mana >= spell.manaCost) {
            character.modifyStats({ mana: -spell.manaCost });

            if (spell.effect === 'heal') {
                character.modifyStats({ health: spell.power });
            } else if (spell.effect === 'damage' && combat.currentEnemy) {
                combat.currentEnemy.health -= spell.power;
                effects.popup(`${spell.name} deals ${spell.power} damage!`, 'achievement');
            } else if (spell.effect === 'shield') {
                character.shieldActive = spell.power;
                setTimeout(() => { character.shieldActive = 0; }, 30000);
            }

            effects.popup(`Cast ${spell.name}!`, 'info');
            return true;
        } else {
            effects.popup('Not enough mana!', 'damage');
            return false;
        }
    }
};

// Combat system object
const combat = {
    currentEnemy: null,
    isInCombat: false,
    currentQuest: null,

    startCombat: function(enemy, quest = null) {
        this.currentEnemy = { ...enemy };
        this.currentQuest = quest;
        this.isInCombat = true;

        ui.updateStory(`A ${enemy.name} appears! It has ${enemy.health} health and looks dangerous!`);

        ui.updateChoices(`
            <button onclick="combat.attack()">⚔️ Attack (${character.equipment.weapon.name})</button>
            <button onclick="combat.showSpells()">🔮 Cast Spell</button>
            <button onclick="combat.showItems()">🧪 Use Item</button>
            <button onclick="combat.flee()">🏃 Flee</button>
        `);
    },

    attack: function() {
        const weaponDamage = character.equipment.weapon.attack;
        const damage = calculateDamage(weaponDamage);

        this.currentEnemy.health -= damage;
        effects.popup(`Dealt ${damage} damage!`, 'achievement');

        if (this.currentEnemy.health <= 0) {
            this.victory();
        } else {
            this.enemyTurn();
        }
    },

    showSpells: function() {
        let spellButtons = '';
        for (let spellName of character.spells) {
            const spell = spellSystem.spells[spellName];
            spellButtons += `<button onclick="combat.castSpell('${spellName}')">${spell.name} (${spell.manaCost} MP)</button>`;
        }
        spellButtons += '<button onclick="combat.backToMenu()">🔙 Back</button>';

        ui.updateChoices(spellButtons);
    },

    showItems: function() {
        let itemButtons = '';
        for (let item of character.inventory) {
            if (item.effect) {
                itemButtons += `<button onclick="combat.useItemInCombat('${item.id}')">${item.name} x${item.quantity}</button>`;
            }
        }
        itemButtons += '<button onclick="combat.backToMenu()">🔙 Back</button>';

        ui.updateChoices(itemButtons);
    },

    castSpell: function(spellName) {
        const success = spellSystem.castSpell(spellName);
        if (success && this.currentEnemy && this.currentEnemy.health <= 0) {
            this.victory();
        } else if (success) {
            this.enemyTurn();
        }
    },

    useItemInCombat: function(itemId) {
        useItem(itemId);
        this.enemyTurn();
    },

    backToMenu: function() {
        ui.updateChoices(`
            <button onclick="combat.attack()">⚔️ Attack (${character.equipment.weapon.name})</button>
            <button onclick="combat.showSpells()">🔮 Cast Spell</button>
            <button onclick="combat.showItems()">🧪 Use Item</button>
            <button onclick="combat.flee()">🏃 Flee</button>
        `);
    },

    enemyTurn: function() {
        const damage = Math.max(1, this.currentEnemy.attack - character.equipment.armor.defense - (character.shieldActive || 0));
        character.modifyStats({ health: -damage });

        ui.updateStory(`The ${this.currentEnemy.name} attacks for ${damage} damage! Your health: ${character.health}/${character.maxHealth}`);

        if (character.health <= 0) {
            this.defeat();
        } else {
            this.backToMenu();
        }
    },

    victory: function() {
        let goldReward = 50;
        let xpReward = 75;

        if (this.currentQuest) {
            goldReward = this.currentQuest.goldReward;
            xpReward = this.currentQuest.xpReward;
            this.currentQuest.completed = true;
            questsCompleted.push(this.currentQuest.id);
        }

        character.modifyStats({ gold: goldReward });
        character.gainExperience(xpReward);

        ui.updateStory(`Victory! You defeated the ${this.currentEnemy.name}! Gained ${goldReward} gold and ${xpReward} experience.`);

        this.endCombat();

        // Check win condition
        this.checkWinCondition();

        ui.updateChoices('<button onclick="returnToLocation()">Continue</button>');
    },

    defeat: function() {
        ui.updateStory("You have been defeated! You wake up back in the village with half health.");
        character.health = Math.floor(character.maxHealth / 2);
        character.updateDisplay();
        this.endCombat();
        currentLocation = "village";

        ui.updateChoices('<button onclick="goToLocation(\'village\')">Return to Village</button>');
    },

    flee: function() {
        if (rollDice(6) > 2) {
            this.endCombat();
            ui.updateStory("You successfully escape from combat!");
            ui.updateChoices('<button onclick="returnToLocation()">Continue</button>');
        } else {
            effects.popup("Can't escape!", 'damage');
            this.enemyTurn();
        }
    },

    endCombat: function() {
        this.currentEnemy = null;
        this.currentQuest = null;
        this.isInCombat = false;
        character.shieldActive = 0;
    },

    checkWinCondition: function() {
        // Win condition: complete all 4 quests
        if (questsCompleted.length >= 4) {
            gameCompleted = true;
            setTimeout(() => {
                ui.showVictoryScreen();
            }, 2000);
        }
    }
};

// Location and navigation system
const locations = {
    village: {
        name: "Peaceful Village",
        description: "A quiet village where your adventure begins. The tavern bustles with activity, and a merchant sells supplies.",
        actions: [
            { text: "🍺 Visit Tavern", action: "goToLocation('tavern')" },
            { text: "🛒 Visit Merchant", action: "goToLocation('merchant')" },
            { text: "🏰 Travel to Spell Forge", action: "goToLocation('forge')" }
        ]
    },

    tavern: {
        name: "The Prancing Pony Tavern",
        description: "A warm tavern filled with adventurers sharing tales and seeking quests.",
        actions: [
            { text: "📋 Check Quest Board", action: "showQuests()" },
            { text: "🍻 Rest and Recover", action: "restAtTavern()" },
            { text: "🚪 Return to Village", action: "goToLocation('village')" }
        ]
    },

    merchant: {
        name: "Merchant's Shop",
        description: "A well-stocked shop with weapons, armor, and supplies for brave adventurers.",
        actions: [
            { text: "⚔️ Browse Weapons", action: "showShop('weapons')" },
            { text: "🛡️ Browse Armor", action: "showShop('armor')" },
            { text: "🧪 Browse Potions", action: "showShop('consumables')" },
            { text: "🚪 Return to Village", action: "goToLocation('village')" }
        ]
    },

    forge: {
        name: "The Legendary Spell Forge",
        description: "An ancient magical workshop where powerful spells can be learned and mastered.",
        actions: [
            { text: "📚 Learn Lightning Spell (500g)", action: "learnSpell('lightning', 500)" },
            { text: "🔮 Practice Magic", action: "practiceMagic()" },
            { text: "🚪 Return to Village", action: "goToLocation('village')" }
        ]
    }
};

// Shop system
const shopSystem = {
    showShop: function(category) {
        const items = availableItems[category];
        let html = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;

        for (let item of items) {
            const canAfford = character.gold >= item.price;
            const buttonClass = canAfford ? '' : 'disabled';

            html += `
                <div class="shop-item">
                    <strong>${item.name}</strong> - ${formatGold(item.price)}
                    <br><small>${item.description}</small>
                    <br><button class="${buttonClass}" onclick="shopSystem.buyItem('${item.id}', '${category}')" ${canAfford ? '' : 'disabled'}>Buy</button>
                </div>
            `;
        }

        html += '<button onclick="goToLocation(\'merchant\')">🔙 Back to Shop</button>';
        ui.updateChoices(html);
    },

    buyItem: function(itemId, category) {
        const items = availableItems[category];
        const item = items.find(i => i.id === itemId);

        if (!item || character.gold < item.price) {
            effects.popup("Can't afford that!", 'damage');
            return;
        }

        character.modifyStats({ gold: -item.price });

        if (category === 'weapons' || category === 'armor') {
            // Equipment goes to inventory for manual equipping
            addItemToInventory(item);
        } else {
            // Consumables go directly to inventory
            addItemToInventory(item);
        }

        this.showShop(category);
    }
};

// UI and effects systems
const effects = {
    shake: function(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    },

    popup: function(text, type = 'info') {
        const popup = document.createElement('div');
        popup.className = `popup ${type}`;
        popup.textContent = text;
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 3000);
    },

    fadeIn: function(element) {
        element.classList.add('fade-in');
        setTimeout(() => element.classList.remove('fade-in'), 500);
    }
};

const ui = {
    updateStory: function(newText) {
        const storyElement = document.getElementById('story');
        effects.fadeIn(storyElement);
        storyElement.innerHTML = newText;
    },

    updateChoices: function(choicesHtml) {
        const choicesElement = document.getElementById('choices');
        choicesElement.innerHTML = choicesHtml;
        effects.fadeIn(choicesElement);
    },

    showVictoryScreen: function() {
        this.updateStory(`
            <h2>🎉 CONGRATULATIONS! 🎉</h2>
            <p>You have completed all quests and proven yourself a true hero!</p>
            <p>Final Stats:</p>
            <ul>
                <li>Level: ${character.level}</li>
                <li>Health: ${character.health}/${character.maxHealth}</li>
                <li>Gold: ${character.gold}</li>
                <li>Quests Completed: ${questsCompleted.length}/4</li>
            </ul>
            <p>Thank you for playing this demonstration of programming concepts!</p>
        `);

        this.updateChoices(`
            <button onclick="resetGame()">🔄 Play Again</button>
            <button onclick="showProgrammingConcepts()">🎓 View Programming Concepts</button>
        `);
    }
};

// =============================================================================
// GAME FUNCTIONS - Bringing it all together
// =============================================================================

function goToLocation(locationName) {
    currentLocation = locationName;
    const location = locations[locationName];

    ui.updateStory(`<h2>${location.name}</h2><p>${location.description}</p>`);

    let actionsHtml = '';
    for (let action of location.actions) {
        actionsHtml += `<button onclick="${action.action}">${action.text}</button>`;
    }

    ui.updateChoices(actionsHtml);
}

function returnToLocation() {
    goToLocation(currentLocation);
}

function showQuests() {
    let html = '<h3>📋 Available Quests</h3>';

    for (let quest of availableQuests) {
        if (!quest.completed) {
            html += `
                <div class="quest-item">
                    <strong>${quest.name}</strong>
                    <br><small>${quest.description}</small>
                    <br>Reward: ${formatGold(quest.goldReward)} + ${quest.xpReward} XP
                    <br><button onclick="startQuest('${quest.id}')">Accept Quest</button>
                </div>
            `;
        }
    }

    html += '<button onclick="goToLocation(\'tavern\')">🔙 Back to Tavern</button>';
    ui.updateChoices(html);
}

function startQuest(questId) {
    const quest = availableQuests.find(q => q.id === questId);
    if (!quest) return;

    ui.updateStory(`<h3>${quest.name}</h3><p>${quest.description}</p><p>Prepare for battle!</p>`);

    setTimeout(() => {
        combat.startCombat(quest.enemy, quest);
    }, 1500);
}

function showShop(category) {
    shopSystem.showShop(category);
}

function restAtTavern() {
    character.health = character.maxHealth;
    character.mana = character.maxMana;
    character.modifyStats({ gold: -10 });

    ui.updateStory("You rest at the tavern, fully recovering your health and mana for 10 gold.");
    ui.updateChoices('<button onclick="goToLocation(\'tavern\')">Continue</button>');
}

function useItem(itemId) {
    const itemIndex = findItemInInventory(itemId);
    if (itemIndex < 0) return;

    const item = character.inventory[itemIndex];

    if (item.effect === 'heal') {
        character.modifyStats({ health: item.power });
    } else if (item.effect === 'mana') {
        character.modifyStats({ mana: item.power });
    }

    removeItemFromInventory(itemId, 1);
    effects.popup(`Used ${item.name}!`, 'healing');
}

function equipItem(itemId, slot) {
    const itemIndex = findItemInInventory(itemId);
    if (itemIndex < 0) return;

    const item = character.inventory[itemIndex];

    // Remove the item from inventory before equipping
    removeItemFromInventory(itemId, 1);

    // Equip the item
    character.equipItem(item, slot);
}

function learnSpell(spellName, cost) {
    if (character.gold >= cost && !character.spells.includes(spellName)) {
        character.modifyStats({ gold: -cost });
        character.spells.push(spellName);
        effects.popup(`Learned ${spellSystem.spells[spellName].name}!`, 'achievement');
    } else if (character.spells.includes(spellName)) {
        effects.popup("You already know that spell!", 'info');
    } else {
        effects.popup("Not enough gold!", 'damage');
    }
}

function practiceMagic() {
    character.gainExperience(50);
    character.modifyStats({ mana: -10 });
    ui.updateStory("You practice your magical abilities, gaining experience!");
    ui.updateChoices('<button onclick="goToLocation(\'forge\')">Continue</button>');
}

function resetGame() {
    // Reset all game state
    character.health = 80;
    character.maxHealth = 80;
    character.mana = 60;
    character.maxMana = 60;
    character.gold = 200;
    character.level = 1;
    character.experience = 0;
    character.experienceToNext = 100;
    character.equipment = {
        weapon: { id: 'wooden_sword', name: "Wooden Sword", attack: 5 },
        armor: { id: 'cloth_robe', name: "Cloth Robes", defense: 3 }
    };
    character.inventory = [
        { id: 'health_potion', name: "Health Potion", effect: 'heal', power: 30, quantity: 2 }
    ];
    character.spells = ['heal', 'fireball'];

    questsCompleted = [];
    gameCompleted = false;

    for (let quest of availableQuests) {
        quest.completed = false;
    }

    initializeGame();
}

function showProgrammingConcepts() {
    ui.updateStory(`
        <h2>🎓 Programming Concepts Demonstrated</h2>
        <p>This game showcases everything learned in Lessons 1-6:</p>
        <ul>
            <li><strong>Variables & Data Types:</strong> Game state, player stats, gold amounts</li>
            <li><strong>Conditionals:</strong> Quest completion checks, combat logic, shop affordability</li>
            <li><strong>Functions:</strong> Combat system, location navigation, item management</li>
            <li><strong>Arrays:</strong> Inventory system, quest lists, spell collections</li>
            <li><strong>Loops:</strong> Inventory searching, shop display generation</li>
            <li><strong>Objects:</strong> Character stats, equipment system, organized code structure</li>
            <li><strong>Professional Organization:</strong> Separate files, commented code sections</li>
        </ul>
    `);

    ui.updateChoices('<button onclick="resetGame()">🔄 Play Again</button>');
}

// Initialize the game
function initializeGame() {
    character.updateDisplay();
    updateInventoryDisplay();
    goToLocation('village');
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', initializeGame);