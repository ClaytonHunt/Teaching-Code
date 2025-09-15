# Lesson 3: Functions and Reusability
## Don't Repeat Yourself (DRY Programming)

### Duration: 30-45 minutes

---

## Learning Objectives
By the end of this lesson, students will:
1. Understand why functions make code reusable
2. Learn to create functions with parameters
3. Practice the DRY principle (Don't Repeat Yourself)
4. Build a more complex game with less code

---

## Part 1: The Problem with Repetition (10 minutes)

### The Copy-Paste Trap

Look at this repetitive code:

```javascript
// BAD: Lots of repetition!
function findGoldInForest() {
    playerGold = playerGold + 10;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML = "You found 10 gold!";
}

function findGoldInCave() {
    playerGold = playerGold + 15;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML = "You found 15 gold!";
}

function findGoldInCastle() {
    playerGold = playerGold + 20;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML = "You found 20 gold!";
}
```

### The Solution: One Flexible Function

```javascript
// GOOD: One function that handles everything!
function findGold(amount, location) {
    playerGold = playerGold + amount;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('story').innerHTML = 
        "You found " + amount + " gold in the " + location + "!";
}

// Now we can use it anywhere:
findGold(10, "forest");
findGold(15, "cave");
findGold(20, "castle");
```

---

## Part 2: Functions with Parameters (10 minutes)

### What Are Parameters?

Parameters are like **mail slots** - you pass information into the function:

```javascript
function greetPlayer(name) {  // 'name' is a parameter
    return "Hello, " + name + "!";
}

// Using the function with different values:
greetPlayer("Alex");    // Returns: "Hello, Alex!"
greetPlayer("Jordan");  // Returns: "Hello, Jordan!"
```

### Multiple Parameters

Functions can accept multiple pieces of information:

```javascript
function calculateDamage(attackPower, defense) {
    let damage = attackPower - defense;
    if (damage < 0) damage = 0;  // Can't do negative damage
    return damage;
}

// Using it:
let damageDealt = calculateDamage(50, 20);  // Returns: 30
```

### Functions That Change Things

```javascript
let playerHealth = 100;

function changeHealth(amount) {
    playerHealth = playerHealth + amount;
    
    // Keep health between 0 and 100
    if (playerHealth > 100) playerHealth = 100;
    if (playerHealth < 0) playerHealth = 0;
    
    // Update the display
    document.getElementById('health').innerHTML = playerHealth;
    
    // Check if player died
    if (playerHealth === 0) {
        gameOver();
    }
}

// Use positive numbers to heal:
changeHealth(20);   // Heal 20 points

// Use negative numbers for damage:
changeHealth(-30);  // Take 30 damage
```

---

## Part 3: Building Helper Functions (15 minutes)

### Common Game Functions

Let's create reusable functions for our adventure game:

```javascript
// 1. Update any stat display
function updateStat(statName, value) {
    document.getElementById(statName).innerHTML = value;
}

// 2. Update the story text
function updateStory(text) {
    document.getElementById('story').innerHTML = text;
}

// 3. Set new choice buttons
function setChoices(button1Text, button1Function, button2Text, button2Function) {
    document.getElementById('choices').innerHTML = 
        '<button onclick="' + button1Function + '">' + button1Text + '</button>' +
        '<button onclick="' + button2Function + '">' + button2Text + '</button>';
}

// 4. Check if player has an item
function hasItem(itemName) {
    return inventory.includes(itemName);
}

// 5. Add item to inventory
function addItem(itemName) {
    if (!hasItem(itemName)) {
        inventory.push(itemName);
        updateInventory();
        return true;  // Successfully added
    }
    return false;  // Already had it
}
```

### Using Helper Functions Together

Now our story functions become much simpler:

```javascript
function enterShop() {
    updateStory("Welcome to the shop! What would you like?");
    setChoices(
        "Buy Sword (10 gold)", "buySword()",
        "Buy Potion (5 gold)", "buyPotion()"
    );
}

function buySword() {
    if (playerGold >= 10) {
        changeGold(-10);
        addItem("Sword");
        updateStory("You bought a sword!");
    } else {
        updateStory("Not enough gold!");
    }
    setChoices("Continue", "enterShop()", "Leave", "exitShop()");
}
```

---

## Part 4: Return Values (10 minutes)

### Functions Can Give Back Information

```javascript
// This function RETURNS a value
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// We can use the returned value:
let myRoll = rollDice();
if (myRoll >= 5) {
    updateStory("Critical hit!");
}
```

### Practical Return Value Examples

```javascript
// Check if player can afford something
function canAfford(cost) {
    return playerGold >= cost;
}

// Calculate battle outcome
function battleCalculation(playerAttack, enemyDefense) {
    let damage = playerAttack - enemyDefense;
    if (damage < 1) damage = 1;  // Always do at least 1 damage
    return damage;
}

// Use in your game:
function attackGoblin() {
    if (hasItem("Sword")) {
        let damage = battleCalculation(25, 10);
        updateStory("You deal " + damage + " damage to the goblin!");
    } else {
        updateStory("You need a weapon to fight!");
    }
}
```

---

## Homework: Refactor Your Story

### Assignment: Function Makeover

Take your story from Lesson 2 and improve it with functions!

### Requirements:

1. **Create at least 5 helper functions:**
   - `updateStory(text)`
   - `changeHealth(amount)`
   - `changeGold(amount)`
   - `hasItem(item)`
   - `addItem(item)`

2. **Use parameters** in at least 3 functions

3. **No repeated code** - if you write something twice, make it a function!

4. **Add a combat system** using functions:

```javascript
function combat(enemyName, enemyHealth, enemyAttack) {
    // Your combat logic here
    let playerWins = false;
    
    // Simple combat: compare stats
    if (playerAttack > enemyHealth) {
        playerWins = true;
        gainExperience(10);
        updateStory("You defeated the " + enemyName + "!");
    } else {
        changeHealth(-enemyAttack);
        updateStory("The " + enemyName + " hurt you!");
    }
    
    return playerWins;
}

// Use it:
function fightDragon() {
    let victory = combat("Dragon", 50, 20);
    if (victory) {
        addItem("Dragon Scale");
    }
}
```

### Bonus Challenges:

1. **Inventory System:**
```javascript
function useItem(itemName) {
    if (itemName === "Potion" && hasItem("Potion")) {
        changeHealth(50);
        removeItem("Potion");
        return true;
    }
    return false;
}
```

2. **Shop System:**
```javascript
function buyItem(itemName, cost) {
    if (canAfford(cost)) {
        changeGold(-cost);
        addItem(itemName);
        return "Purchased " + itemName + "!";
    }
    return "Not enough gold!";
}
```

---

## Teacher Notes

### Key Concepts to Emphasize:
1. **Functions = Reusable Code**: Write once, use many times
2. **Parameters = Flexibility**: Same function, different inputs
3. **Return Values = Getting Info Back**: Functions can answer questions

### Common Mistakes:
1. Forgetting parentheses when calling functions
2. Passing wrong number of parameters
3. Not using return values when needed

### Demonstration Ideas:
- Show how much shorter code becomes with functions
- Count lines saved by using functions
- Show debugging is easier with functions

### Assessment Criteria:
- Proper function syntax
- Effective use of parameters
- Code reusability demonstrated
- No unnecessary repetition

### Next Lesson Preview:
"Next time: Making smart decisions with conditionals - your game will react to player choices!"

---

## Function Quick Reference

### Basic Function:
```javascript
function functionName() {
    // code here
}
```

### Function with Parameters:
```javascript
function functionName(parameter1, parameter2) {
    // use parameter1 and parameter2
}
```

### Function with Return:
```javascript
function functionName() {
    return someValue;
}
```

### Calling Functions:
```javascript
functionName();                    // No parameters
functionName(value1, value2);     // With parameters
let result = functionName();      // Capture return value
```