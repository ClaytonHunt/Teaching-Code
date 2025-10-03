# Functions and Reusability - Quick Reference

## Core Concepts

### What Are Functions?
Functions are **reusable packages of code** that solve the DRY principle:
- 🔄 **Don't Repeat Yourself** - Write once, use many times
- 📦 **Packages of Instructions** - Organized, named blocks of code
- 🎛️ **Flexible with Parameters** - Same function, different inputs
- 📤 **Can Return Values** - Functions can give back information

### Why Functions Matter
```javascript
// BAD: Repetitive code
function findGoldInForest() {
    playerGold = playerGold + 10;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML = "You found 10 gold!";
}
function findGoldInCave() {
    playerGold = playerGold + 15;
    // ... same code with different numbers
}

// GOOD: One flexible function
function findGold(amount, location) {
    playerGold = playerGold + amount;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML =
        "You found " + amount + " gold in the " + location + "!";
}
```

---

## Function Fundamentals

### Basic Function Structure
```javascript
// Function definition (the recipe)
function functionName() {
    // Instructions go here
}

// Function call (following the recipe)
functionName();
```

### Functions with Parameters
```javascript
// Parameters are like mail slots - pass information in
function greetPlayer(name) {
    return "Hello, " + name + "!";
}

// Using the function with different values
greetPlayer("Alex");    // Returns: "Hello, Alex!"
greetPlayer("Jordan");  // Returns: "Hello, Jordan!"
```

### Multiple Parameters
```javascript
function calculateDamage(attackPower, defense) {
    let damage = attackPower - defense;
    if (damage < 0) damage = 0;  // Can't do negative damage
    return damage;
}

// Usage
let damageDealt = calculateDamage(50, 20);  // Returns: 30
```

---

## Essential Game Functions

### Helper Functions for Stories
```javascript
// 1. Update story text
function updateStory(text) {
    document.getElementById('story').innerHTML = text;
}

// 2. Change player stats
function changeHealth(amount) {
    playerHealth = playerHealth + amount;
    if (playerHealth > 100) playerHealth = 100;
    if (playerHealth < 0) playerHealth = 0;
    document.getElementById('health').innerHTML = playerHealth;
}

// 3. Manage inventory (using individual variables)
function hasItem(itemName) {
    if (itemName === "Red Key") return hasRedKey;
    if (itemName === "Blue Key") return hasBlueKey;
    if (itemName === "Gold Key") return hasGoldKey;
    return false;
}

function addItem(itemName) {
    if (itemName === "Red Key" && !hasRedKey) {
        hasRedKey = true;
        return true;  // Successfully added
    }
    if (itemName === "Blue Key" && !hasBlueKey) {
        hasBlueKey = true;
        return true;
    }
    if (itemName === "Gold Key" && !hasGoldKey) {
        hasGoldKey = true;
        return true;
    }
    return false;  // Already had item or unknown item
}
```

### Smart Functions Using Conditionals
```javascript
// Building on Lesson 3: Conditionals!
function tryOpenDoor(doorColor, requiredKey, newRoom) {
    if (hasItem(requiredKey)) {
        updateStory("The " + doorColor + " door opens!");
        currentRoom = newRoom;
        return true;
    } else {
        updateStory("You need a " + requiredKey + "!");
        return false;
    }
}

// Usage - much cleaner than copying code!
tryOpenDoor("red", "Red Key", "treasure_room");
tryOpenDoor("blue", "Blue Key", "library");
tryOpenDoor("gold", "Gold Key", "throne_room");
```

---

## Advanced Function Patterns

### Functions That Return Information
```javascript
// Check if player can afford something
function canAfford(price) {
    if (playerGold >= price) {
        return true;
    } else {
        return false;
    }
}

// Enhanced shop system
function buyItem(itemName, price) {
    if (canAfford(price)) {
        playerGold = playerGold - price;
        addItem(itemName);
        updateStory("You bought " + itemName + "!");
        return true;
    } else {
        let goldNeeded = price - playerGold;
        updateStory("You need " + goldNeeded + " more gold!");
        return false;
    }
}
```

### Combat System with Type Effectiveness
```javascript
function attackEnemy(attackType, targetEnemy) {
    let damage = playerAttack;

    // Type effectiveness using conditionals from Lesson 3!
    if (attackType === "fire" && targetEnemy === "ice_troll") {
        damage = damage * 2;
        updateStory("Super effective! Fire melts the ice troll!");
    } else if (attackType === "fire" && targetEnemy === "fire_demon") {
        damage = damage / 2;
        updateStory("Not very effective against a fire demon...");
    } else if (attackType === "water" && targetEnemy === "fire_demon") {
        damage = damage * 2;
        updateStory("The water extinguishes the fire demon!");
    }

    // Apply damage
    enemyHealth = enemyHealth - damage;

    if (enemyHealth <= 0) {
        updateStory(targetEnemy + " is defeated!");
        return "victory";
    } else {
        updateStory("You deal " + damage + " damage!");
        return "continue";
    }
}
```

### Level-Based Requirements
```javascript
function checkRequirements(requiredLevel, item1, item2, item3) {
    // Check level first
    if (playerLevel < requiredLevel) {
        return "Need level " + requiredLevel;
    }

    // Check required items using individual parameters
    if (item1 && !hasItem(item1)) {
        return "Need " + item1;
    }
    if (item2 && !hasItem(item2)) {
        return "Need " + item2;
    }
    if (item3 && !hasItem(item3)) {
        return "Need " + item3;
    }

    return "requirements_met";
}

// Usage
function startBossQuest() {
    let result = checkRequirements(10, "Silver Sword", "Magic Shield", null);

    if (result === "requirements_met") {
        updateStory("You're ready to face the boss!");
        startBossBattle();
    } else {
        updateStory("Quest requirements not met: " + result);
    }
}
```

---

## Your Assignment: Smart Story Quest

### Requirements
Build a function-powered story that demonstrates the DRY principle:

1. **Core Helper Functions:**
   - `updateStory(text)` - Update story display
   - `changeHealth(amount)` - Modify player health
   - `changeGold(amount)` - Modify player gold
   - `hasItem(itemName)` - Check inventory
   - `addItem(itemName)` - Add to inventory

2. **Smart Game Functions:**
   - `tryOpenContainer(containerType, requiredKey)` - Conditional access
   - `buyItem(itemName, price, discountCondition)` - Dynamic pricing
   - `attackEnemy(attackType, enemyType)` - Type effectiveness
   - `checkAccess(location, requirements)` - Multi-requirement validation

3. **Advanced Systems:**
   - Reputation system with conditional effects
   - Level-based quest availability
   - Dynamic pricing based on player status
   - Smart NPC interactions

### Example Implementation
```javascript
// Smart container system using functions + conditionals
function tryOpenContainer(containerType, requiredKey) {
    let containers = {
        "chest": { gold: 50, items: ["Health Potion"] },
        "vault": { gold: 200, items: ["Magic Sword"] },
        "lockbox": { gold: 25, items: ["Key Fragment"] }
    };

    if (requiredKey && !hasItem(requiredKey)) {
        updateStory("The " + containerType + " is locked. You need: " + requiredKey);
        return false;
    }

    let container = containers[containerType];
    changeGold(container.gold);

    for (let i = 0; i < container.items.length; i++) {
        addItem(container.items[i]);
    }

    updateStory("You opened the " + containerType + " and found treasures!");
    return true;
}

// Dynamic NPC interaction
function talkToNPC(npcName) {
    if (npcName === "merchant") {
        if (playerReputation >= 50) {
            updateStory("The merchant offers you a special discount!");
            // Show discounted shop
        } else if (playerReputation <= -25) {
            updateStory("The merchant refuses to serve you!");
            return;
        } else {
            updateStory("The merchant shows you their wares.");
        }
        showShop();
    }
}
```

---

## Quick Reference

### Function Syntax
```javascript
// Basic function
function functionName() {
    // code here
}

// Function with parameters
function functionName(param1, param2) {
    // code here
}

// Function with return value
function functionName(param) {
    return someValue;
}
```

### Best Practices
- Use descriptive function names (`calculateDamage` not `calc`)
- Keep functions focused on one task
- Use parameters to make functions flexible
- Return values when functions need to give back information
- Combine functions with conditionals for smart behavior

### Common Patterns
```javascript
// Validation function
function isValidInput(input) {
    return input !== "" && input !== null;
}

// Calculation function
function calculateTotal(baseValue, modifier) {
    return baseValue * modifier;
}

// Action function with feedback
function performAction(actionType) {
    if (canPerformAction(actionType)) {
        // do action
        return "success";
    } else {
        return "failed";
    }
}
```

---

## Building on Previous Knowledge
This lesson builds directly on **Lesson 3: Conditionals**. We use if/else statements throughout to make our functions smart and responsive to different game situations.