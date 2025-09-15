# Lesson 4: Conditionals and Game Logic
## Making Smart Decisions in Code

### Duration: 30-45 minutes

---

## Learning Objectives
By the end of this lesson, students will:
1. Master if/else statements for decision-making
2. Understand comparison operators (==, >, <, >=, <=, !=)
3. Learn logical operators (&&, ||, !)
4. Create complex game logic with multiple conditions

---

## Part 1: If Statements - The Decision Makers (10 minutes)

### Basic If Statement

The `if` statement is like a bouncer at a door - it checks if you meet the requirements:

```javascript
let age = 16;

if (age >= 13) {
    console.log("Welcome to the teen section!");
}
```

### If-Else: Two Paths

When you need different outcomes:

```javascript
let hasKey = true;

if (hasKey) {
    console.log("The door opens!");
} else {
    console.log("The door is locked.");
}
```

### If-Else If-Else: Multiple Paths

For multiple conditions:

```javascript
let playerLevel = 5;

if (playerLevel >= 10) {
    console.log("You're a master!");
} else if (playerLevel >= 5) {
    console.log("You're experienced!");
} else if (playerLevel >= 1) {
    console.log("You're a beginner!");
} else {
    console.log("Start your journey!");
}
```

---

## Part 2: Comparison Operators (10 minutes)

### The Comparison Toolbox

```javascript
// == : Equals (be careful with this one!)
// === : Exactly equals (safer!)
// != : Not equals
// !== : Exactly not equals
// > : Greater than
// < : Less than
// >= : Greater than or equal
// <= : Less than or equal

let gold = 50;
let swordPrice = 30;

if (gold >= swordPrice) {
    console.log("You can afford the sword!");
}

let password = "secret123";
let userInput = "secret123";

if (userInput === password) {
    console.log("Access granted!");
}
```

### Why === Instead of ==?

```javascript
// Confusing behavior with ==
5 == "5"     // true (converts types)
5 === "5"    // false (different types)

// Always use === for safety!
let userChoice = "1";

if (userChoice === "1") {  // Safe comparison
    console.log("You chose option 1");
}
```

---

## Part 3: Logical Operators - Combining Conditions (10 minutes)

### AND Operator (&&)
Both conditions must be true:

```javascript
let hasSwor = true;
let hasShield = true;

if (hasSword && hasShield) {
    console.log("You're fully equipped for battle!");
}

// Real game example
if (playerHealth > 0 && enemyHealth > 0) {
    console.log("The battle continues!");
}
```

### OR Operator (||)
At least one condition must be true:

```javascript
let hasMagicKey = false;
let hasLockpicks = true;

if (hasMagicKey || hasLockpicks) {
    console.log("You can open the chest!");
}

// Game example
if (playerClass === "Wizard" || playerClass === "Sorcerer") {
    console.log("You can cast spells!");
}
```

### NOT Operator (!)
Reverses true/false:

```javascript
let isDaytime = false;

if (!isDaytime) {
    console.log("Monsters come out at night!");
}

// Checking if something doesn't exist
if (!hasItem("Torch")) {
    console.log("It's too dark to see!");
}
```

---

## Part 4: Complex Game Logic (10 minutes)

### Nested Conditions

Conditions inside conditions:

```javascript
function enterDungeon() {
    if (playerLevel >= 5) {
        if (hasItem("Torch")) {
            console.log("You enter the dungeon safely.");
        } else {
            console.log("You need a torch to see in the dark!");
        }
    } else {
        console.log("You're not experienced enough! (Need level 5)");
    }
}
```

### Multiple Conditions

Combining multiple checks:

```javascript
function fightDragon() {
    // Need proper equipment AND health
    if ((hasSword || hasMagicStaff) && hasShield && playerHealth >= 50) {
        console.log("You're ready to fight the dragon!");
        return true;
    } else {
        console.log("You're not prepared for this battle!");
        
        // Specific feedback
        if (playerHealth < 50) {
            console.log("- Your health is too low");
        }
        if (!hasSword && !hasMagicStaff) {
            console.log("- You need a weapon");
        }
        if (!hasShield) {
            console.log("- You need a shield");
        }
        return false;
    }
}
```

### Game State Management

Using conditions to control game flow:

```javascript
function shopInteraction() {
    let itemPrice = 30;
    let playerGold = 25;
    let reputation = 10;
    
    // Different outcomes based on conditions
    if (playerGold >= itemPrice) {
        buyItem();
    } else if (playerGold >= itemPrice - 5 && reputation >= 10) {
        console.log("The shopkeeper gives you a discount!");
        buyItemWithDiscount();
    } else {
        console.log("You can't afford this item.");
        
        let goldNeeded = itemPrice - playerGold;
        console.log(`You need ${goldNeeded} more gold.`);
    }
}
```

---

## Part 5: Practical Examples (5 minutes)

### Door System

```javascript
function tryOpenDoor(doorColor) {
    let hasRedKey = true;
    let hasBlueKey = false;
    let hasGoldKey = false;
    let isThief = true;
    
    if (doorColor === "red" && hasRedKey) {
        return "Red door opens!";
    } else if (doorColor === "blue" && hasBlueKey) {
        return "Blue door opens!";
    } else if (doorColor === "gold" && hasGoldKey) {
        return "Gold door opens!";
    } else if (isThief && doorColor !== "gold") {
        return "You pick the lock!";
    } else {
        return "The door won't budge.";
    }
}
```

### Combat System

```javascript
function calculateDamage(attackType) {
    let baseDamage = 10;
    let finalDamage = baseDamage;
    
    if (attackType === "fire" && enemyType === "ice") {
        finalDamage = baseDamage * 2;  // Double damage!
    } else if (attackType === "fire" && enemyType === "fire") {
        finalDamage = baseDamage / 2;  // Half damage
    } else if (hasPowerUp) {
        finalDamage = baseDamage * 1.5;  // 50% bonus
    }
    
    if (isCriticalHit()) {
        finalDamage = finalDamage * 2;
        console.log("Critical hit!");
    }
    
    return Math.floor(finalDamage);
}
```

---

## Homework: The Kingdom of Choices

### Assignment: Multi-Path Adventure

Expand the Kingdom of Choices game with complex conditional logic!

### Requirements:

1. **At least 10 different conditional checks** using:
   - Simple if statements
   - If-else chains
   - Nested conditions
   - Combined conditions with && and ||

2. **Implement these systems:**

   a) **Reputation System:**
   ```javascript
   function checkReputation() {
       if (reputation >= 50) {
           title = "Hero";
       } else if (reputation >= 20) {
           title = "Adventurer";
       } else if (reputation >= 0) {
           title = "Wanderer";
       } else {
           title = "Outlaw";
       }
   }
   ```

   b) **Quest Requirements:**
   ```javascript
   function canStartQuest(questName) {
       if (questName === "Dragon Slayer") {
           return level >= 10 && hasSword && hasShield;
       } else if (questName === "Treasure Hunter") {
           return hasMap && (hasLockpicks || hasKey);
       }
       return false;
   }
   ```

   c) **Dynamic Pricing:**
   ```javascript
   function getPrice(item) {
       let basePrice = itemPrices[item];
       
       if (reputation >= 20) {
           basePrice = basePrice * 0.8;  // 20% discount
       } else if (reputation < 0) {
           basePrice = basePrice * 1.2;  // 20% markup
       }
       
       if (isNightTime) {
           basePrice = basePrice * 1.5;  // Night premium
       }
       
       return Math.floor(basePrice);
   }
   ```

3. **Add disabled choices** that show requirements:

```javascript
function showTavernChoices() {
    let choices = "";
    
    if (gold >= 5) {
        choices += '<button onclick="buyDrink()">Buy Drink (5 gold)</button>';
    } else {
        choices += '<button disabled>Buy Drink (Need 5 gold)</button>';
    }
    
    if (reputation >= 10 && !hasQuest) {
        choices += '<button onclick="secretQuest()">Secret Quest Available!</button>';
    }
    
    document.getElementById('choices').innerHTML = choices;
}
```

### Bonus Challenges:

1. **Time System:**
```javascript
let timeOfDay = "morning";  // morning, afternoon, evening, night

function updateTimeOfDay() {
    if (turns < 5) {
        timeOfDay = "morning";
    } else if (turns < 10) {
        timeOfDay = "afternoon";
    } else if (turns < 15) {
        timeOfDay = "evening";
    } else {
        timeOfDay = "night";
    }
    
    // Different events based on time
    if (timeOfDay === "night" && location === "forest") {
        encounterWolves();
    }
}
```

2. **Combo Conditions:**
```javascript
function specialAttack() {
    if (hasFireSpell && hasIceSpell && mana >= 50) {
        console.log("Steam Blast available!");
        return "steam";
    } else if (hasSword && hasShield && stamina >= 30) {
        console.log("Shield Bash available!");
        return "bash";
    }
    return "normal";
}
```

---

## Teacher Notes

### Common Logical Errors:
1. **Assignment vs Comparison**: `if (x = 5)` vs `if (x === 5)`
2. **Missing else cases**: Always consider what happens if condition is false
3. **Impossible conditions**: `if (health < 0 && health > 100)`

### Debugging Tips:
```javascript
// Add console.log to check conditions
if (gold >= price) {
    console.log("Can afford! Gold:", gold, "Price:", price);
    buyItem();
} else {
    console.log("Cannot afford! Gold:", gold, "Price:", price);
}
```

### Assessment Focus:
- Correct use of comparison operators
- Logical operator understanding
- Appropriate nesting of conditions
- Code readability and organization

### Next Lesson Preview:
"Next time: Arrays and loops - managing multiple items and repeating actions!"

---

## Quick Reference

### Comparison Operators:
```javascript
===  // Exactly equals
!==  // Not equals
>    // Greater than
<    // Less than
>=   // Greater than or equal
<=   // Less than or equal
```

### Logical Operators:
```javascript
&&   // AND (both must be true)
||   // OR (at least one must be true)
!    // NOT (reverses true/false)
```

### Condition Patterns:
```javascript
// Simple
if (condition) { }

// Two-way
if (condition) { } else { }

// Multi-way
if (condition1) { }
else if (condition2) { }
else { }

// Nested
if (condition1) {
    if (condition2) { }
}

// Combined
if (condition1 && condition2) { }
if (condition1 || condition2) { }
```