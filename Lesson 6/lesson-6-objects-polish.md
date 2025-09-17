# Objects and Polish - Quick Reference

## Core Concepts

### What Are Objects?
Objects are **smart containers** that hold both data AND the functions that work with that data:
- 📦 **Properties** - Store information like variables
- 🔧 **Methods** - Functions that belong to the object
- 🔗 **this** - Refers to the object itself inside methods
- 🏗️ **Organization** - Keep related data and functions together

```javascript
// Simple object with properties
let player = {
    name: "Alex",
    health: 100,
    level: 1
};

// Access properties
console.log(player.name);    // "Alex"
player.health = 75;          // Change value
```

---

## Object Fundamentals

### Objects with Methods
```javascript
let character = {
    name: "Hero",
    health: 100,
    maxHealth: 100,

    // Method: function inside an object
    takeDamage: function(amount) {
        this.health -= amount;  // 'this' refers to the character object
        if (this.health <= 0) {
            this.die();
        }
    },

    heal: function(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        console.log(`Healed ${amount}! Health: ${this.health}`);
    },

    die: function() {
        console.log(`${this.name} has fallen!`);
        this.health = 0;
    }
};

// Use the methods
character.takeDamage(30);  // Health becomes 70
character.heal(20);        // Health becomes 90
```

### Why Objects Beat Separate Variables
```javascript
// BAD: Scattered variables and functions
let playerName = "Alex";
let playerHealth = 100;
let playerInventory = ["sword"];

function playerTakeDamage(amount) {
    playerHealth -= amount;
}

// GOOD: Everything organized in one object
let player = {
    name: "Alex",
    health: 100,
    inventory: ["sword"],

    takeDamage(amount) {
        this.health -= amount;
    }
};
```

---

## Game Systems with Objects

### Inventory System
```javascript
let inventory = {
    items: [],
    maxSize: 10,

    add(item) {
        if (this.items.length < this.maxSize) {
            this.items.push(item);
            console.log(`Added ${item.name} to inventory`);
            this.updateDisplay();
            return true;
        } else {
            console.log("Inventory full!");
            return false;
        }
    },

    remove(itemName) {
        let index = this.items.findIndex(item => item.name === itemName);
        if (index > -1) {
            this.items.splice(index, 1);
            this.updateDisplay();
            return true;
        }
        return false;
    },

    has(itemName) {
        return this.items.some(item => item.name === itemName);
    },

    updateDisplay() {
        let html = "";
        for (let item of this.items) {
            html += `<div class="item">${item.name}</div>`;
        }
        document.getElementById('inventory').innerHTML = html;
    }
};
```

### Combat System
```javascript
let combat = {
    currentEnemy: null,

    start(enemy) {
        this.currentEnemy = { ...enemy }; // Create copy
        console.log(`Combat started with ${enemy.name}!`);
        this.showInterface();
    },

    playerAttack() {
        if (!this.currentEnemy) return;

        let damage = player.attack + Math.floor(Math.random() * 5);
        this.currentEnemy.health -= damage;
        console.log(`Dealt ${damage} damage!`);

        if (this.currentEnemy.health <= 0) {
            this.victory();
        } else {
            this.enemyAttack();
        }
    },

    enemyAttack() {
        let damage = this.currentEnemy.attack;
        player.takeDamage(damage);
        console.log(`${this.currentEnemy.name} dealt ${damage} damage!`);
    },

    victory() {
        console.log("You won!");
        player.gold += this.currentEnemy.gold;
        this.end();
    },

    end() {
        this.currentEnemy = null;
        document.getElementById('combat').style.display = 'none';
    }
};
```

---

## Professional Code Organization

### Separating Code into Files
**HTML (index.html):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Epic Quest</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="gameContainer">
        <!-- Game content -->
    </div>

    <script src="game.js"></script>
</body>
</html>
```

**CSS (styles.css):**
```css
body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
}

.game-container {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}
```

### Configuration Objects
```javascript
// Game settings in one place
const CONFIG = {
    PLAYER_START_HEALTH: 100,
    INVENTORY_MAX_SIZE: 20,
    SAVE_INTERVAL: 30000,

    ENEMY_TYPES: {
        goblin: { health: 20, attack: 5, gold: 10 },
        orc: { health: 40, attack: 10, gold: 25 },
        dragon: { health: 200, attack: 30, gold: 500 }
    }
};
```

---

## Adding Polish

### Sound Effects
```javascript
const audio = {
    sounds: {},
    enabled: true,

    load(name, url) {
        this.sounds[name] = new Audio(url);
    },

    play(name) {
        if (this.enabled && this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            this.sounds[name].play().catch(e => {
                console.log('Audio play failed:', e);
            });
        }
    }
};

// Load and use sounds
audio.load('attack', 'sounds/sword-hit.mp3');
audio.play('attack');
```

### Visual Effects
```javascript
const effects = {
    shake(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    },

    popup(text, type = 'info') {
        const popup = document.createElement('div');
        popup.className = `popup ${type}`;
        popup.innerHTML = text;
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 2000);
    },

    typewrite(element, text, speed = 50) {
        element.innerHTML = '';
        let index = 0;

        const timer = setInterval(() => {
            element.innerHTML += text[index];
            index++;

            if (index >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
};
```

### Save/Load System
```javascript
const saveSystem = {
    save() {
        const saveData = {
            player: {
                name: player.name,
                level: player.level,
                health: player.health,
                gold: player.gold
            },
            inventory: inventory.items,
            timestamp: Date.now()
        };

        localStorage.setItem('epicQuestSave', JSON.stringify(saveData));
        effects.popup('Game saved!', 'success');
    },

    load() {
        const saveData = localStorage.getItem('epicQuestSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            Object.assign(player, data.player);
            inventory.items = data.inventory || [];
            return true;
        }
        return false;
    }
};
```

---

## Essential Object Patterns

### Game System Template
```javascript
const gameSystem = {
    // Properties
    isActive: false,
    config: {},

    // Initialization
    init() {
        this.setupEventListeners();
        this.loadConfig();
        this.isActive = true;
    },

    // Main functionality
    update() {
        if (!this.isActive) return;
        // Update logic here
    },

    // Cleanup
    destroy() {
        this.isActive = false;
        // Cleanup code here
    }
};
```

### Player Character Object
```javascript
const player = {
    // Stats
    name: "Hero",
    level: 1,
    health: 100,
    maxHealth: 100,
    gold: 0,

    // Equipment
    weapon: null,
    armor: null,

    // Actions
    attack(target) {
        let damage = this.getAttackPower();
        target.takeDamage(damage);
        effects.popup(`-${damage}`, 'damage');
    },

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        ui.updateHealthBar(this.health, this.maxHealth);

        if (this.health <= 0) {
            this.die();
        }
    },

    levelUp() {
        this.level++;
        this.maxHealth += 20;
        this.health = this.maxHealth;
        effects.popup('Level Up!', 'success');
    },

    getAttackPower() {
        let base = 10 + (this.level * 2);
        let weaponBonus = this.weapon ? this.weapon.attack : 0;
        return base + weaponBonus;
    }
};
```

---

## Quick Reference

### Object Syntax
```javascript
// Creating objects
let item = {
    name: "Sword",
    damage: 10,
    use: function() { console.log("Attacking!"); }
};

// Accessing properties
let damage = item.damage;        // Get value
item.damage = 15;               // Set value
item.use();                     // Call method
```

### Essential Object Methods
```javascript
Object.assign(target, source)    // Copy properties
Object.keys(obj)                 // Get property names
Object.values(obj)               // Get property values
{ ...obj }                       // Create copy (spread operator)
```

### The 'this' Keyword
```javascript
let character = {
    name: "Hero",
    greet: function() {
        console.log("Hello, I'm " + this.name);  // 'this' = character object
    }
};
```

### Common Game Patterns
```javascript
// Game state management
const gameState = {
    currentScene: "menu",
    isPaused: false,

    changeScene(newScene) {
        this.currentScene = newScene;
        this.updateDisplay();
    }
};

// Item creation
function createItem(name, type, value) {
    return {
        name: name,
        type: type,
        value: value,
        use: function() {
            console.log(`Using ${this.name}`);
        }
    };
}

// System organization
const game = {
    player: { /* player data */ },
    inventory: { /* inventory system */ },
    combat: { /* combat system */ },
    ui: { /* user interface */ },

    init() {
        this.player.init();
        this.inventory.init();
        this.combat.init();
        this.ui.init();
    }
};
```

### Best Practices
- Group related data and functions into objects
- Use meaningful property and method names
- Keep objects focused on one responsibility
- Use `this` to refer to the current object
- Organize complex games with system objects
- Separate configuration from logic

### Building on Previous Knowledge
This lesson combines **everything from Lessons 1-5**: clean code principles, variables for object properties, conditionals for object logic, functions as object methods, and arrays for managing collections of objects.