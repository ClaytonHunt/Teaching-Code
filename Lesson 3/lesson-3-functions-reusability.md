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

// 3. Manage inventory
function hasItem(itemName) {
    return inventory.includes(itemName);
}

function addItem(itemName) {
    if (!hasItem(itemName)) {
        inventory.push(itemName);
        return true;  // Successfully added
    }
    return false;  // Already had it
}
```

### Return Values
```javascript
// Functions that answer questions
function canAfford(cost) {
    return playerGold >= cost;
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Using return values
if (canAfford(10)) {
    buyItem("Sword");
}

let myRoll = rollDice();
if (myRoll >= 5) {
    updateStory("Critical hit!");
}
```

---

## Practical Function Patterns

### Combat System
```javascript
function combat(enemyName, enemyHealth, enemyAttack) {
    let playerWins = false;

    if (playerAttack > enemyHealth) {
        playerWins = true;
        updateStory("You defeated the " + enemyName + "!");
        addItem("Victory Trophy");
    } else {
        changeHealth(-enemyAttack);
        updateStory("The " + enemyName + " hurt you!");
    }

    return playerWins;
}

// Usage
let victory = combat("Dragon", 50, 20);
if (victory) {
    changeGold(100);
}
```

### Shop System
```javascript
function buyItem(itemName, cost) {
    if (canAfford(cost)) {
        changeGold(-cost);
        addItem(itemName);
        return "Purchased " + itemName + "!";
    }
    return "Not enough gold!";
}

// Usage
let result = buyItem("Health Potion", 25);
updateStory(result);
```

### Choice Management
```javascript
function setChoices(choice1Text, choice1Func, choice2Text, choice2Func) {
    document.getElementById('choices').innerHTML =
        '<button onclick="' + choice1Func + '">' + choice1Text + '</button>' +
        '<button onclick="' + choice2Func + '">' + choice2Text + '</button>';
}

// Usage
setChoices("Enter Cave", "enterCave()", "Go Home", "goHome()");
```

---

## Your Assignment: Function Makeover

### Requirements
Refactor your story from Lesson 2 using functions:

1. **Create Essential Helper Functions:**
   - `updateStory(text)` - Updates story display
   - `changeHealth(amount)` - Modifies player health
   - `changeGold(amount)` - Modifies player gold
   - `hasItem(itemName)` - Checks inventory
   - `addItem(itemName)` - Adds to inventory

2. **Use Parameters** - At least 3 functions with parameters

3. **Eliminate Repetition** - No copy-paste code

4. **Add Combat System** - Using function-based battles

### Example Implementation
```javascript
// Story progression using functions
function exploreForest() {
    updateStory("You enter a dark forest...");

    let encounter = rollDice();
    if (encounter >= 4) {
        let victory = combat("Wolf", 30, 15);
        if (victory) {
            findTreasure(10, "forest");
        }
    } else {
        findTreasure(5, "clearing");
    }

    setChoices("Continue", "nextArea()", "Rest", "restInForest()");
}

function findTreasure(amount, location) {
    changeGold(amount);
    updateStory("You found " + amount + " gold in the " + location + "!");
}
```

---

## Quick Reference

### Function Syntax
```javascript
// Basic function
function doSomething() {
    // code here
}

// Function with parameters
function doSomething(param1, param2) {
    // use param1 and param2
}

// Function with return value
function getSomething() {
    return someValue;
}
```

### Calling Functions
```javascript
doSomething();                    // No parameters
doSomething(value1, value2);     // With parameters
let result = getSomething();     // Capture return value
```

### Key Principles
- **DRY**: Don't Repeat Yourself
- **Parameters**: Make functions flexible
- **Return Values**: Get information back
- **Helper Functions**: Break complex tasks into simple pieces