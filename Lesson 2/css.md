# CSS Quick Reference for Programming Class

## What You Need to Know

This class focuses on **programming**, not web design. However, our games need basic styling to be playable and visually clear. This guide covers only the CSS concepts you'll encounter in assignments.

---

## CSS Basics

CSS (Cascading Style Sheets) controls how HTML elements look and are arranged on the page.

### Basic Syntax
```css
selector {
    property: value;
    another-property: another-value;
}
```

### Three Ways to Add CSS

1. **External File (Recommended)**
```html
<link rel="stylesheet" href="styles.css">
```

2. **Internal Styles**
```html
<style>
    body { background: blue; }
</style>
```

3. **Inline Styles (Avoid)**
```html
<div style="color: red;">Text</div>
```

---

## Essential Selectors

### Element Selectors
```css
body {
    font-family: Arial, sans-serif;
    background: #f0f0f0;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
}

h1 {
    color: #333;
    text-align: center;
}
```

### Class Selectors (Most Important!)
```css
.game-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.stat-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.choice-button {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 15px;
    font-size: 16px;
}
```

### ID Selectors
```css
#health {
    color: green;
    font-weight: bold;
}

#story {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
}
```

---

## Layout Systems You'll Use

### CSS Grid (Primary Layout Tool)
**Perfect for game interfaces with multiple sections**

```css
.status-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}
```

**What this means:**
- `display: grid` - Use grid layout
- `grid-template-columns` - How many columns and their sizes
- `repeat(auto-fit, minmax(120px, 1fr))` - Flexible columns, minimum 120px wide
- `gap: 15px` - Space between grid items

### Flexbox (Secondary Layout Tool)
**Good for button groups and navigation**

```css
.choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

---

## Essential Properties

### Spacing
```css
.element {
    margin: 20px;        /* Space outside element */
    padding: 15px;       /* Space inside element */
    gap: 10px;          /* Space between grid/flex items */
}
```

### Colors and Backgrounds
```css
.element {
    color: #333;                    /* Text color */
    background: #f0f0f0;           /* Background color */
    background: linear-gradient(to bottom, #blue, #purple);  /* Gradient */
}
```

### Borders and Rounding
```css
.element {
    border: 2px solid #ccc;        /* Border around element */
    border-radius: 8px;            /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);  /* Drop shadow */
}
```

### Typography
```css
.element {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
```

---

## Interactive Elements

### Button Styling
```css
button {
    padding: 12px 20px;
    font-size: 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #0056b3;
    transform: translateY(-2px);
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
```

### Hover Effects
```css
.choice-button:hover {
    background: #e0e0e0;
    transform: scale(1.02);
}
```

---

## Common Game Interface Patterns

### Game Container
```css
.game-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}
```

### Status Panel with Grid
```css
.status-panel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
}

.stat-card {
    background: white;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
}
```

### Story Text Area
```css
.story-text {
    font-size: 18px;
    line-height: 1.6;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}
```

### Choice Buttons Container
```css
.choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.choice-button {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    background: white;
    border: 2px solid #007bff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}
```

### Inventory Display
```css
.inventory {
    background: #f0f8f0;
    border-radius: 10px;
    padding: 15px;
    margin: 15px 0;
}

.inventory-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin: 5px 0;
    background: white;
    border-radius: 5px;
}
```

---

## Responsive Design Basics

### Mobile-Friendly Layout
```css
@media (max-width: 768px) {
    .game-container {
        margin: 20px;
        padding: 15px;
    }

    .status-panel {
        grid-template-columns: repeat(2, 1fr);
    }

    .choice-button {
        font-size: 14px;
        padding: 12px;
    }
}
```

---

## CSS Classes for JavaScript

### Animation Classes (Added/Removed by JavaScript)
```css
.shake {
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.fade-in {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### State Classes
```css
.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.selected {
    background: #007bff;
    color: white;
}

.hidden {
    display: none;
}
```

---

## What You DON'T Need to Learn

- Complex CSS animations and keyframes
- Advanced layout techniques (CSS Grid areas, etc.)
- CSS variables and custom properties
- Sass/SCSS preprocessors
- CSS frameworks like Bootstrap

**Remember:** We're using CSS to make our programming projects functional and readable, not to win design awards!

---

## Quick Troubleshooting

### Common Issues:
1. **Styles not applying** → Check class/id spelling in HTML and CSS
2. **Layout broken** → Check for missing closing braces `}`
3. **Grid not working** → Make sure parent has `display: grid`
4. **Buttons look ugly** → Add basic `padding`, `border`, `border-radius`

### Copy-Paste Starter Styles:
```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f0f2f5;
    color: #333;
}

.game-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 30px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

button {
    padding: 12px 20px;
    font-size: 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: #0056b3;
}
```

This gives you a professional-looking base to build on!