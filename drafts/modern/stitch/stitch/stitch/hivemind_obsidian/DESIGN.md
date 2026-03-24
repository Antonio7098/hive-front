# Design System Strategy: The Luminous Hive

## 1. Overview & Creative North Star: "Precision Luminescence"
This design system rejects the "standard dashboard" aesthetic in favor of **Precision Luminescence**. The goal is to create an environment that feels like a high-end command deck—dark, focused, and pressurized, where information doesn't just sit on a screen but glows with intentionality. 

We break the "template" look by utilizing **intentional asymmetry** and **tonal depth**. Rather than a rigid grid of boxes, we use overlapping surfaces and high-contrast typography scales to guide the eye. The interface should feel like a singular, living organism—a "Hive"—where the amber accents act as the neural synapses of the project management experience.

---

## 2. Colors: Tonal Architecture
The palette is built on a foundation of deep ink (`#131315`) to provide an infinite canvas for the amber and orange accents to resonate.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. Use `surface-container-low` for large lateral sections and `surface-container-highest` for interactive card-level elements. Transitions should be felt, not seen.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface` (#131315)
*   **In-set Content:** `surface-container-lowest` (#0e0e10)
*   **Floating/Active Surfaces:** `surface-container-high` (#2a2a2c)

### The Glass & Gradient Rule
To move beyond a "flat" digital feel, floating elements (modals, dropdowns) must use **Glassmorphism**. Apply `surface-variant` at 60% opacity with a `20px` backdrop-blur. 
*   **Signature CTA Gradient:** Transitions from `primary` (#ffe1a7) to `primary-container` (#fbbf24) at a 135-degree angle. This adds "soul" and a metallic, premium sheen to actions.

---

## 3. Typography: The Editorial Voice
We use **Inter** with a heavy emphasis on light weights (`300` and `400`) to maintain a sleek, technical feel.

*   **Display (High Impact):** Use `display-lg` (3.5rem) with `-0.04em` letter spacing for key metrics. This creates a "Brutalist-Lite" editorial look.
*   **Headline & Body:** Use `headline-sm` for section titles, paired with `body-md` for descriptions. 
*   **The Hierarchy of Focus:** Brand identity is conveyed through the massive scale difference between Display and Label types. Always pair a large, light-weight number with a tiny, uppercase `label-sm` (0.68rem) tracked out to `0.1em` for a professional, engineered aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to show "height"; we use light to show "importance."

*   **The Layering Principle:** Place a `surface-container-lowest` card inside a `surface-container-low` sidebar. The slight shift in value creates a natural "recess" or "lift" without visual clutter.
*   **Ambient Amber Glow:** For primary floating elements (e.g., an active task card), use a diffusion shadow: `0px 20px 40px rgba(251, 191, 36, 0.08)`. It shouldn't look like a shadow; it should look like the element is emitting light onto the surface below.
*   **The Ghost Border:** If a separator is required for accessibility, use the `outline-variant` token at **15% opacity**. This creates a "whisper" of a line that defines space without trapping it.

---

## 5. Components: Functional Elegance

### Buttons
*   **Primary:** High-gloss gradient (`primary` to `primary-container`). Text is `on-primary` (#402d00) in Bold. No border.
*   **Secondary (Ghost):** No background. `1px` Ghost Border (15% opacity `outline-variant`). On hover, the background fills with a 5% amber tint.
*   **Tertiary:** Text-only using `primary-fixed-dim`. 

### Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Implementation:** Use the Spacing Scale `6` (2rem) to separate list items. To group items, use a subtle background shift to `surface-container-low`.
*   **Honeycomb Pattern:** Apply a CSS mask or a faint background SVG of a hexagonal grid to the `surface-container-lowest` areas to provide a signature texture that reinforces the "Hive" concept.

### Input Fields
*   **Base State:** `surface-container-highest` background, no border.
*   **Active State:** A `1px` solid `primary` (#fbbf24) border with a soft `4px` amber outer glow.
*   **Error State:** Background shifts to a very faint `error_container` (10% opacity) with `secondary` (Orange) helper text.

### Signature Component: The Progress Pulse
Instead of a standard progress bar, use a thin `2px` line. The "unfilled" track is `outline-variant` at 20%. The "filled" track is a gradient of `primary` to `secondary`, ending with a small glow-dot (box-shadow) at the leading edge.

---

## 6. Do’s and Don’ts

### Do
*   **Use Generous Whitespace:** If you think there's enough room, add 20% more. Space is the ultimate luxury in a complex dashboard.
*   **Layer Surfaces:** Think in 3D. A sidebar should feel like it's a different "plate" than the main stage.
*   **Mix Typography Weights:** Use `Inter Light` for large numbers and `Inter Medium` for small labels to create sophisticated contrast.

### Don’t
*   **Don't use 100% White:** Never use `#ffffff`. Use `on-surface` (#e5e1e4) for high-contrast text. It’s easier on the eyes in dark mode and feels more "zinc-like."
*   **Don't use Rounded Corners everywhere:** Stick to the `md` (0.75rem) or `lg` (1rem) tokens for cards. Using `full` (pill-shaped) buttons is acceptable, but avoid mixing too many radii.
*   **Don't clutter with Icons:** Only use icons if they provide immediate functional clarity. When used, they must be thin-stroke (1.5px) to match the light typography.