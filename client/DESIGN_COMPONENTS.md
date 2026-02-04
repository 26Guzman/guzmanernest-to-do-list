# 🎨 TaskFlow - Visual Design Components

## **Color System**

### Primary Colors
```
Orange:       #ff6b35 (Primary action color)
Dark Orange:  #e55a2b (Hover/active state)
Light Orange: #fee2e2 (Background highlight)
```

### Semantic Colors
```
Success:      #10b981 (Green - completed, success)
Warning:      #f59e0b (Amber - pending, warning)
Error:        #ef4444 (Red - delete, error)
Info:         #3b82f6 (Blue - information)
```

### Neutral Colors
```
Dark Text:    #2d3748 (Main text)
Gray 600:     #4b5563 (Secondary text)
Gray 500:     #6b7280 (Tertiary text)
Gray 100:     #f3f4f6 (Light background)
White:        #ffffff (Cards, overlays)
```

---

## **Typography System**

### Font Stack
```css
font-family: 'Poppins', sans-serif;
```

### Sizes
```
Display:     2.25rem (36px) - Page titles
Heading 1:   1.875rem (30px) - Section titles
Heading 2:   1.5rem (24px) - Subsection titles
Heading 3:   1.25rem (20px) - List titles
Body:        1rem (16px) - Regular text
Small:       0.875rem (14px) - Labels, hints
Tiny:        0.75rem (12px) - Captions
```

### Font Weights
```
Light:   300
Regular: 400
Medium:  500
Bold:    600
Extra:   700
```

---

## **Component Library**

### Buttons

#### Primary Button
```
Background: #ff6b35
Text: White
Padding: 12px 24px
Border Radius: 8px
Font Weight: 600
Hover: #e55a2b + shadow
Active: Darker shade
Disabled: #d1d5db + no interaction
```

#### Secondary Button
```
Background: #f3f4f6
Text: #2d3748
Padding: 12px 24px
Border Radius: 8px
Font Weight: 600
Hover: #e5e7eb
```

#### Danger Button
```
Background: #ef4444
Text: White
Padding: 12px 24px
Border Radius: 8px
Font Weight: 600
Hover: #dc2626 + shadow
```

### Form Controls

#### Input Field
```
Border: 2px solid #e5e7eb
Padding: 12px 16px
Border Radius: 8px
Font Size: 16px
Focus Border: #ff6b35
Focus Shadow: 0 0 0 3px rgba(255, 107, 53, 0.1)
Background: White
```

#### Textarea
```
Same as input field
Min Height: 100px
Resize: vertical
```

### Cards

#### Card Container
```
Background: White
Border Radius: 12px
Box Shadow: 0 4px 6px rgba(0, 0, 0, 0.07)
Padding: 24px
Hover Shadow: 0 12px 20px rgba(0, 0, 0, 0.1)
Transition: 0.3s ease
Transform on Hover: translateY(-2px)
```

### Badges

#### Success Badge
```
Background: #dcfce7
Text: #166534
Padding: 4px 12px
Border Radius: 20px
Font Size: 13px
Font Weight: 600
```

#### Pending Badge
```
Background: #fef3c7
Text: #b45309
Padding: 4px 12px
Border Radius: 20px
Font Size: 13px
Font Weight: 600
```

#### Error Badge
```
Background: #fee2e2
Text: #991b1b
Padding: 4px 12px
Border Radius: 20px
Font Size: 13px
Font Weight: 600
```

---

## **Spacing System**

```
4px   - xs
8px   - sm
12px  - md
16px  - lg
24px  - xl
32px  - 2xl
48px  - 3xl
64px  - 4xl
```

---

## **Shadow System**

```
sm: 0 2px 4px rgba(0, 0, 0, 0.05)
md: 0 4px 6px rgba(0, 0, 0, 0.07)
lg: 0 10px 15px rgba(0, 0, 0, 0.1)
xl: 0 12px 20px rgba(0, 0, 0, 0.1)
2xl: 0 20px 25px rgba(0, 0, 0, 0.15)
```

---

## **Border Radius**

```
sm: 4px   - Input placeholders
md: 8px   - Buttons, inputs
lg: 12px  - Cards, modals
full: 9999px - Badges, avatars
```

---

## **Animation Library**

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 0.3s ease
```

### Slide In
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
Duration: 0.3s ease
```

### Spin (Loading)
```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
Duration: 1s linear infinite
```

---

## **Layout Grid**

### Container
```
Max Width: 1280px (desktop)
Padding: 24px (desktop), 16px (mobile)
Margin: Auto (centered)
```

### Grid System
```
Mobile:  1 column (< 640px)
Tablet:  2 columns (640px - 1024px)
Desktop: 3 columns (> 1024px)
Gap: 24px
```

---

## **Responsive Design**

### Breakpoints
```
xs: 0px    - Mobile
sm: 640px  - Landscape Mobile
md: 768px  - Tablet
lg: 1024px - Large Tablet
xl: 1280px - Desktop
2xl: 1536px - Large Desktop
```

### Mobile-First Approach
```css
/* Base (mobile) */
.grid { display: grid; grid-template-columns: 1fr; }

/* Tablet and up */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## **Component States**

### Button States
```
Normal:    Solid background
Hover:     Darker background + shadow
Active:    Even darker background
Focus:     Outline + ring
Disabled:  Gray background + no cursor
Loading:   Spinner animation
```

### Input States
```
Empty:     Gray border
Focused:   Orange border + shadow
Valid:     Green border
Invalid:   Red border
Disabled:  Gray background
```

### Card States
```
Default:   Gray border, normal shadow
Hover:     Elevated shadow, slight scale
Selected:  Orange border
Loading:   Spinner overlay
Error:     Red border
```

---

## **Accessibility Features**

### Focus States
```
Outline: 2px solid #ff6b35
Offset: 2px
On all interactive elements
```

### Color Contrast
```
Text on white: #2d3748 (WCAG AAA)
Text on orange: White (WCAG AAA)
Text on gray: Dark gray (WCAG AA)
```

### Touch Targets
```
Minimum: 44px × 44px
Buttons: 48px × 48px
Spacing: 8px minimum between targets
```

---

## **Dark Mode (Future)**

### Colors
```
Background: #1a202c
Card: #2d3748
Text: #f7fafc
Primary: #f97316 (lighter orange)
Border: #4a5568
```

---

## **Icon Library**

Icons used are from system SVG (Heroicons style):
- Checkmark (✓)
- Menu (☰)
- Back arrow (←)
- Close (✕)
- Edit (✎)
- Delete (🗑)
- Search (🔍)
- Plus (+)
- Settings (⚙)

---

## **Typography Examples**

### Display
```
Large heading for main titles
Size: 36px
Weight: 700
Color: #2d3748
```

### Heading 1
```
Section titles
Size: 30px
Weight: 700
Color: #2d3748
```

### Body
```
Regular paragraph text
Size: 16px
Weight: 400
Color: #2d3748
Line Height: 1.5
```

### Small
```
Form labels, captions
Size: 14px
Weight: 500
Color: #4b5563
```

---

## **Usage Examples**

### Login Page
```
Background: Gradient (orange to darker orange)
Card: White with shadow
Title: Display size, bold
Input: Form input class
Button: Primary button class
Message: Alert badges
```

### List Card
```
Container: Card class
Title: Heading 3
Description: Body text
Badge: Status badge class
Shadow: Card hover effect
```

### Task Item
```
Container: Task item class
Checkbox: Accent orange color
Text: Body or struck-through
Button: Small delete button
Hover: Background change
```

---

**Design system is production-ready and fully implemented! 🎉**
