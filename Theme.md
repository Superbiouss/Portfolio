# Portfolio Design System & Theme Guidelines

This document outlines the strict design rules and theme tokens for the portfolio. It serves as a source of truth to ensure absolute consistency across all future components, pages, and UI updates.

## 1. Core Philosophy: Strict Neo-Brutalism
The application uses a **Strict Neo-Brutalist** aesthetic. This means:
- **Zero Curves:** Everything is perfectly rectangular.
- **Flat Depth:** No Z-axis elevation via drop shadows or soft blurs.
- **High Contrast:** Harsh, distinct borders rather than subtle color variations.
- **Kinetic Typography:** Large, uppercase, tightly tracked typography drives the visual hierarchy rather than imagery.

## 2. Design Tokens (Colors)
These colors are globally defined in `src/app/globals.css` and map directly to Tailwind classes.

| Token | Class | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `bg-background` | `#09090B` | Primary page background. Completely solid, dark. |
| **Foreground** | `text-foreground` | `#FAFAFA` | Primary text color. |
| **Muted** | `bg-muted` | `#27272A` | Secondary background for badges or subtle highlights. |
| **Muted Text** | `text-muted-foreground`| `#A1A1AA` | Secondary text, paragraphs, and descriptions. |
| **Border** | `border-border` | `#3F3F46` | Standard structural borders. |
| **Accent** | `bg-accent`, `text-accent` | `#DFE104` | Acid Yellow. The sole brand highlight color. |
| **Accent Text**| `text-accent-foreground`| `#000000` | Black text to ensure contrast when layered on the Accent color. |

## 3. Strict Rules & Anti-Patterns
To maintain the Neo-Brutalist theme, strictly avoid the following common utility classes:

### 🚫 NEVER USE:
- **Rounded Corners:** `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`. Everything must be `rounded-none` or rely on the global `--radius-none: 0px`.
- **Shadows:** `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `drop-shadow-*`. No box shadows, no glowing text, no hovering depth.
- **Glassmorphism/Blurs:** `backdrop-blur-*`, `blur-*`. The background must always be a solid color fill. No semi-transparent blurred headers or modals.
- **Gradient Background Blobs:** Do not use soft, blurred radial gradients as decorative background elements.

### ✅ ALWAYS USE:
- **Borders for Structure:** `border-2 border-border`. Components (Cards, Buttons, Inputs, Grid items) should be distinguished by solid borders.
- **Solid Hover States:** On hover, use flat color fills (e.g., `hover:bg-accent hover:text-accent-foreground` or `hover:border-accent`) rather than scale effects or shadow-lifting.
- **Standard Grid Gaps:** For grids of cards, use standard spacing (e.g., `gap-6` or `gap-8`) with individual `border-2` on items. Do not use the `gap-px bg-border` trick for grids, as it creates large gray blocks if the grid cells are empty.

## 4. Typography
- **Primary Font:** Space Grotesk (fallback: Inter, sans-serif).
- **Headings (`h1`, `h2`, `h3`):** Must always be `uppercase`, `font-extrabold` (or `font-bold`), and have tight letter spacing (`tracking-tighter` or `tracking-tight`).
- **Data/Meta Labels:** Small meta-information (like dates, categories, or labels) should be `text-xs font-bold uppercase tracking-widest text-muted-foreground`.

## 5. Components Layout Example
A standard interactive Card component should be structured as follows:

```tsx
<Card className="flex flex-col relative bg-background border-2 border-border rounded-none transition-colors duration-300 hover:border-accent">
  <CardContent className="flex-1 relative z-10 pt-6">
    <Badge variant="outline" className="border-border/50 text-muted-foreground mb-4">Category</Badge>
    <CardTitle className="mb-3">Item Title</CardTitle>
    <CardDescription className="mb-6">Item description.</CardDescription>
  </CardContent>
</Card>
```
