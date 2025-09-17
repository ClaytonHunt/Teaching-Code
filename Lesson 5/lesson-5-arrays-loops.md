# Arrays and Loops - Quick Reference

## Core Concepts

### What Are Arrays?
Arrays are **numbered lists** that solve the "many variables" problem:
- 📦 **Collections of Data** - Store multiple items in one variable
- 🔢 **Indexed Access** - Each item has a numbered position (starting at 0)
- 🔄 **Dynamic Size** - Can grow and shrink as needed
- 🎮 **Perfect for Games** - Inventory, enemies, quests, locations

```javascript
// BAD: Managing inventory with many variables
let item1 = "Sword";
let item2 = "Shield";
let item3 = "Potion";
// What if player finds 100 items?

// GOOD: One array handles unlimited items
let inventory = ["Sword", "Shield", "Potion"];
// Arrays start counting at 0!
inventory[0]  // "Sword" (first item)
inventory[1]  // "Shield" (second item)
```

---

## Array Fundamentals

### Creating and Accessing Arrays
```javascript
// Creating arrays
let inventory = ["Sword", "Shield", "Potion"];
let healthValues = [100, 75, 50, 25];
let emptyBag = [];

// Accessing items (arrays start at 0!)
let firstItem = inventory[0];  // "Sword"
let lastItem = inventory[inventory.length - 1];  // "Potion"
```

### Essential Array Methods
```javascript
let items = ["Apple", "Bread"];

// Add to end
items.push("Cheese");        // ["Apple", "Bread", "Cheese"]

// Remove from end
let lastItem = items.pop();   // Removes "Cheese", returns it

// Get array size
let count = items.length;     // 2

// Check if item exists
let hasApple = items.includes("Apple");  // true

// Find position of item
let position = items.indexOf("Bread");   // 1
```

---

## Loop Fundamentals

### For Loop Structure
```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}
// Prints: 0, 1, 2, 3, 4

// Breaking it down:
// let i = 0     - Start counter at 0
// i < 5         - Keep going while i is less than 5
// i++           - Add 1 to i each time
```

### Looping Through Arrays
```javascript
let enemies = ["Goblin", "Orc", "Dragon"];

// Method 1: Standard for loop
for (let i = 0; i < enemies.length; i++) {
    console.log("Fight the " + enemies[i]);
}

// Method 2: For...of loop (simpler!)
for (let enemy of enemies) {
    console.log("Fight the " + enemy);
}
```

---

## Essential Game Functions

### Array Operations for Games
```javascript
// Count specific items
function countItem(inventory, itemName) {
    let count = 0;
    for (let item of inventory) {
        if (item === itemName) {
            count++;
        }
    }
    return count;
}

// Find item position
function findItemPosition(inventory, itemName) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === itemName) {
            return i;  // Found it!
        }
    }
    return -1;  // Not found
}

// Filter items (remove junk)
function filterValuableItems(allItems) {
    let valuableItems = [];
    for (let item of allItems) {
        if (item !== "Junk") {
            valuableItems.push(item);
        }
    }
    return valuableItems;
}
```

---

## Game Systems with Arrays

### Smart Quest System
```javascript
let quests = [
    { name: "Find the key", completed: false, progress: 0, target: 1 },
    { name: "Defeat 5 goblins", completed: false, progress: 0, target: 5 },
    { name: "Collect 10 gold", completed: false, progress: 0, target: 10 }
];

function updateQuestProgress(questName, newProgress) {
    for (let quest of quests) {
        if (quest.name === questName && !quest.completed) {
            quest.progress = newProgress;
            if (quest.progress >= quest.target) {
                quest.completed = true;
                console.log("Quest completed: " + questName);
            }
            break;
        }
    }
}

function showActiveQuests() {
    for (let quest of quests) {
        if (!quest.completed) {
            console.log(`- ${quest.name} (${quest.progress}/${quest.target})`);
        }
    }
}
```

### Dynamic Shop System
```javascript
let shopItems = [
    { name: "Sword", price: 100, type: "weapon" },
    { name: "Shield", price: 75, type: "armor" },
    { name: "Potion", price: 25, type: "consumable" }
];

function displayShop(playerGold) {
    console.log("=== SHOP ===");
    for (let i = 0; i < shopItems.length; i++) {
        let item = shopItems[i];
        let status = playerGold >= item.price ? "[BUY]" : "[Need more gold]";
        console.log(`${i + 1}. ${item.name} - ${item.price}g ${status}`);
    }
}

function buyItem(itemIndex, playerGold) {
    let item = shopItems[itemIndex];
    if (playerGold >= item.price) {
        return { success: true, item: item.name, cost: item.price };
    }
    return { success: false, message: "Not enough gold!" };
}
```

### Multi-Enemy Combat
```javascript
let currentEnemies = [];

function startBattle(enemyTypes) {
    currentEnemies = [];
    for (let enemyType of enemyTypes) {
        currentEnemies.push({
            name: enemyType.name,
            health: enemyType.health,
            attack: enemyType.attack
        });
    }
}

function attackAllEnemies(playerDamage) {
    for (let i = currentEnemies.length - 1; i >= 0; i--) {
        let enemy = currentEnemies[i];
        enemy.health -= playerDamage;
        console.log(`${enemy.name} takes ${playerDamage} damage!`);

        if (enemy.health <= 0) {
            console.log(`${enemy.name} defeated!`);
            currentEnemies.splice(i, 1);  // Remove defeated enemy
        }
    }
}
```

---

## While Loops

### When You Don't Know How Many Times
```javascript
// Game loop - runs until game ends
let gameRunning = true;
let turn = 1;

while (gameRunning && turn <= 100) {
    console.log("Turn " + turn);

    // Player and enemy actions
    playerTurn();
    enemyTurn();

    // Check win/lose conditions
    if (playerHealth <= 0 || allEnemiesDefeated()) {
        gameRunning = false;
    }

    turn++;
}

// Random events
let health = 100;
let poisoned = true;

while (poisoned && health > 0) {
    health -= 5;
    console.log("Poison damage! Health: " + health);

    if (Math.random() > 0.7) {
        poisoned = false;
        console.log("Poison wore off!");
    }
}
```

## Your Assignment: Array-Powered Adventure

### Requirements
Build an adventure game that demonstrates arrays and loops working together:

1. **Dynamic Inventory System:**
   - Array-based inventory that grows and shrinks
   - Item limits and overflow handling
   - Smart item categorization

2. **Multi-Enemy Combat:**
   - Battle multiple enemies simultaneously
   - Enemy arrays that change during combat
   - Victory conditions and loot distribution

3. **Quest Tracking System:**
   - Array of active and completed quests
   - Progress tracking with loops
   - Dynamic quest updates

4. **Location Discovery:**
   - Unlock new areas dynamically
   - Track visited locations in arrays
   - Location-based events and encounters

5. **Advanced Features:**
   - Shop systems with dynamic pricing
   - High score tracking
   - Save/load game state using arrays

---

## Quick Reference

### Array Syntax
```javascript
// Creating arrays
let items = ["Sword", "Shield", "Potion"];
let numbers = [1, 2, 3, 4, 5];
let empty = [];

// Accessing items (arrays start at 0!)
let first = items[0];        // "Sword"
let last = items[items.length - 1];  // "Potion"
```

### Essential Array Methods
```javascript
array.push(item)             // Add to end
array.pop()                  // Remove from end, return it
array.includes(item)         // Check if exists (true/false)
array.indexOf(item)          // Find position (-1 if not found)
array.length                 // Get size
array.splice(index, 1)       // Remove item at position
```

### Loop Patterns
```javascript
// Standard for loop (when you need the index)
for (let i = 0; i < array.length; i++) {
    console.log(i + ": " + array[i]);
}

// For...of loop (when you just need the item)
for (let item of array) {
    console.log(item);
}

// While loop (when you don't know how many times)
while (condition) {
    // Keep going until condition becomes false
}
```

### Common Game Patterns
```javascript
// Count specific items
let potionCount = 0;
for (let item of inventory) {
    if (item === "Potion") potionCount++;
}

// Find and update item
for (let enemy of enemies) {
    if (enemy.name === "Dragon") {
        enemy.health -= 50;
        break;  // Stop looking once found
    }
}

// Filter out unwanted items
let valuableItems = [];
for (let item of allItems) {
    if (item !== "Junk") {
        valuableItems.push(item);
    }
}

// Process all items with conditions
for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].health <= 0) {
        enemies.splice(i, 1);  // Remove defeated enemy
    }
}
```

### Best Practices
- Use descriptive array names (`inventory` not `arr`)
- Remember arrays start at index 0
- Use `break` to exit loops early when possible
- Be careful when modifying arrays while looping
- Use `for...of` when you don't need the index
- Check array length before accessing items

### Building on Previous Knowledge
This lesson builds directly on **Lessons 2-4**. We use variables to store arrays, conditionals to make smart decisions, and functions to organize our array operations into reusable code.