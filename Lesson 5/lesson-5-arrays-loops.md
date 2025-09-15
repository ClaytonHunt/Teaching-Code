# Lesson 5: Arrays and Loops
## Managing Collections of Data

### Duration: 30-45 minutes

---

## Learning Objectives
By the end of this lesson, students will:
1. Understand arrays as collections of data
2. Master for loops and while loops
3. Learn array methods (push, pop, includes, filter)
4. Build data-driven game systems

---

## Part 1: Arrays - Lists of Things (10 minutes)

### What Is an Array?

An array is like a **numbered list** where each item has a position:

```javascript
// Creating arrays
let inventory = ["Sword", "Shield", "Potion"];
let healthValues = [100, 75, 50, 25];
let emptyBag = [];

// Arrays start counting at 0!
inventory[0]  // "Sword" (first item)
inventory[1]  // "Shield" (second item)
inventory[2]  // "Potion" (third item)
```

### Why Arrays Matter in Games

```javascript
// Without arrays (BAD):
let item1 = "Sword";
let item2 = "Shield";
let item3 = "Potion";
// What if player picks up 100 items?

// With arrays (GOOD):
let inventory = ["Sword", "Shield", "Potion"];
// Can hold unlimited items!
```

### Basic Array Operations

```javascript
let items = ["Apple", "Bread"];

// Add to end
items.push("Cheese");        // ["Apple", "Bread", "Cheese"]

// Remove from end
let lastItem = items.pop();  // Removes "Cheese"

// Get length
let count = items.length;    // 2

// Check if item exists
let hasApple = items.includes("Apple");  // true
```

---

## Part 2: For Loops - Doing Things Repeatedly (10 minutes)

### The For Loop Structure

```javascript
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}
// Prints: 0, 1, 2, 3, 4
```

Breaking it down:
- `let i = 0` - Start counter at 0
- `i < 5` - Keep going while i is less than 5
- `i++` - Add 1 to i each time

### Looping Through Arrays

```javascript
let enemies = ["Goblin", "Orc", "Dragon"];

// Loop through each enemy
for (let i = 0; i < enemies.length; i++) {
    console.log("Fight the " + enemies[i]);
}
// Prints:
// Fight the Goblin
// Fight the Orc
// Fight the Dragon
```

### For...Of Loop (Simpler!)

```javascript
let spells = ["Fireball", "Heal", "Shield"];

for (let spell of spells) {
    console.log("You can cast: " + spell);
}
// Same result, cleaner code!
```

---

## Part 3: Array Methods and Loops Together (10 minutes)

### Finding Items

```javascript
let inventory = ["Sword", "Potion", "Potion", "Key", "Potion"];

// Count how many potions
let potionCount = 0;
for (let item of inventory) {
    if (item === "Potion") {
        potionCount++;
    }
}
console.log("You have " + potionCount + " potions");  // 3
```

### Filtering Arrays

```javascript
let allItems = ["Sword", "Junk", "Gold", "Junk", "Potion"];

// Keep only valuable items
let valuableItems = [];
for (let item of allItems) {
    if (item !== "Junk") {
        valuableItems.push(item);
    }
}
// valuableItems = ["Sword", "Gold", "Potion"]
```

### Searching Arrays

```javascript
function findItemPosition(inventory, itemName) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === itemName) {
            return i;  // Found it! Return position
        }
    }
    return -1;  // Not found
}

let bag = ["Apple", "Sword", "Map"];
let swordPosition = findItemPosition(bag, "Sword");  // Returns 1
```

---

## Part 4: Building Game Systems with Arrays (10 minutes)

### Quest System

```javascript
let quests = [
    { name: "Find the key", completed: false },
    { name: "Defeat the dragon", completed: false },
    { name: "Rescue the princess", completed: false }
];

function completeQuest(questName) {
    for (let quest of quests) {
        if (quest.name === questName) {
            quest.completed = true;
            console.log("Quest completed: " + questName);
            break;  // Stop looking once found
        }
    }
}

function showActiveQuests() {
    console.log("Active Quests:");
    for (let quest of quests) {
        if (!quest.completed) {
            console.log("- " + quest.name);
        }
    }
}
```

### Shop System

```javascript
let shopItems = [
    { name: "Sword", price: 100 },
    { name: "Shield", price: 75 },
    { name: "Potion", price: 25 }
];

function displayShop(playerGold) {
    let shopHTML = "<h3>Shop</h3>";
    
    for (let i = 0; i < shopItems.length; i++) {
        let item = shopItems[i];
        
        if (playerGold >= item.price) {
            shopHTML += `<button onclick="buy(${i})">`;
            shopHTML += `Buy ${item.name} (${item.price} gold)`;
            shopHTML += `</button>`;
        } else {
            shopHTML += `<button disabled>`;
            shopHTML += `${item.name} (Need ${item.price} gold)`;
            shopHTML += `</button>`;
        }
    }
    
    document.getElementById('shop').innerHTML = shopHTML;
}
```

### Combat with Multiple Enemies

```javascript
let enemies = [
    { name: "Goblin", health: 20, attack: 5 },
    { name: "Goblin", health: 20, attack: 5 },
    { name: "Orc", health: 40, attack: 10 }
];

function attackAllEnemies(playerDamage) {
    for (let enemy of enemies) {
        if (enemy.health > 0) {
            enemy.health -= playerDamage;
            console.log(`${enemy.name} takes ${playerDamage} damage!`);
            
            if (enemy.health <= 0) {
                console.log(`${enemy.name} defeated!`);
            }
        }
    }
    
    // Remove defeated enemies
    enemies = enemies.filter(enemy => enemy.health > 0);
}
```

---

## Part 5: While Loops (5 minutes)

### When You Don't Know How Many Times

```javascript
// Keep going until condition is false
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

### Game Loop Example

```javascript
let gameRunning = true;
let turn = 1;

while (gameRunning) {
    console.log("Turn " + turn);
    
    // Player action
    playerTurn();
    
    // Enemy actions
    for (let enemy of enemies) {
        enemyTurn(enemy);
    }
    
    // Check win/lose
    if (playerHealth <= 0 || enemies.length === 0) {
        gameRunning = false;
    }
    
    turn++;
}
```

---

## Homework: The Chronicles of Data

### Assignment: Array-Powered Adventure

Enhance your game with powerful array systems!

### Requirements:

1. **Inventory System with Arrays:**
```javascript
let inventory = [];
let maxInventorySize = 10;

function addToInventory(item) {
    if (inventory.length < maxInventorySize) {
        inventory.push(item);
        updateInventoryDisplay();
        return true;
    } else {
        showMessage("Inventory full!");
        return false;
    }
}

function removeFromInventory(item) {
    let index = inventory.indexOf(item);
    if (index > -1) {
        inventory.splice(index, 1);
        updateInventoryDisplay();
    }
}
```

2. **Multiple Enemies System:**
```javascript
let battleEnemies = [];

function startBattle(enemyGroup) {
    battleEnemies = [...enemyGroup];  // Copy array
    
    // Display all enemies
    for (let i = 0; i < battleEnemies.length; i++) {
        createEnemyButton(i, battleEnemies[i]);
    }
}

function attackEnemy(index) {
    battleEnemies[index].health -= playerAttack;
    
    if (battleEnemies[index].health <= 0) {
        battleEnemies.splice(index, 1);  // Remove defeated enemy
    }
    
    updateBattleDisplay();
}
```

3. **Location Discovery System:**
```javascript
let allLocations = ["Town", "Forest", "Cave", "Castle", "Tower"];
let discoveredLocations = ["Town"];

function discoverLocation(locationName) {
    if (!discoveredLocations.includes(locationName)) {
        discoveredLocations.push(locationName);
        showMessage("New location discovered: " + locationName);
        updateMapDisplay();
    }
}

function canTravelTo(locationName) {
    return discoveredLocations.includes(locationName);
}
```

### Bonus Challenges:

1. **Crafting System:**
```javascript
function canCraft(recipe) {
    // Check if player has all required items
    for (let ingredient of recipe.requires) {
        if (!inventory.includes(ingredient)) {
            return false;
        }
    }
    return true;
}

function craft(recipe) {
    if (canCraft(recipe)) {
        // Remove ingredients
        for (let ingredient of recipe.requires) {
            removeFromInventory(ingredient);
        }
        // Add crafted item
        addToInventory(recipe.creates);
    }
}
```

2. **High Score System:**
```javascript
let highScores = [
    { name: "Alice", score: 1000 },
    { name: "Bob", score: 800 },
    { name: "Charlie", score: 600 }
];

function addHighScore(name, score) {
    highScores.push({ name, score });
    
    // Sort by score (highest first)
    highScores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    highScores = highScores.slice(0, 10);
    
    displayHighScores();
}
```

---

## Teacher Notes

### Common Array Mistakes:
1. **Off-by-one errors**: Remember arrays start at 0!
2. **Modifying array while looping**: Can cause skipped items
3. **Not checking array length**: Accessing beyond array causes undefined

### Debugging Arrays:
```javascript
console.log("Inventory:", inventory);
console.log("Length:", inventory.length);
console.log("First item:", inventory[0]);
console.log("Last item:", inventory[inventory.length - 1]);
```

### Performance Tips:
- Use `break` to exit loops early when found
- Consider `includes()` instead of loops for simple checks
- Be careful with nested loops (loop inside loop)

### Assessment Criteria:
- Correct array manipulation
- Proper loop usage
- No infinite loops
- Efficient array searching

### Next Lesson Preview:
"Final lesson: Objects and polish - making your game professional!"

---

## Quick Reference

### Array Methods:
```javascript
array.push(item)          // Add to end
array.pop()               // Remove from end
array.includes(item)      // Check if exists
array.indexOf(item)       // Find position
array.length              // Get size
array.splice(index, 1)    // Remove at position
```

### Loop Patterns:
```javascript
// Standard for loop
for (let i = 0; i < array.length; i++) {
    // Use array[i]
}

// For...of loop
for (let item of array) {
    // Use item directly
}

// While loop
while (condition) {
    // Keep going until condition is false
}
```

### Useful Patterns:
```javascript
// Count items
let count = 0;
for (let item of array) {
    if (item === target) count++;
}

// Find item
let found = null;
for (let item of array) {
    if (item.name === searchName) {
        found = item;
        break;
    }
}

// Filter items
let filtered = [];
for (let item of array) {
    if (condition) {
        filtered.push(item);
    }
}
```