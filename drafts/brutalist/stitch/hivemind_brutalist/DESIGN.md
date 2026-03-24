```markdown
# Design System Strategy: The Industrial Monolith

## 1. Overview & Creative North Star
**Creative North Star: "Precision Brutalism"**

This design system rejects the "softness" of modern SaaS. We are moving away from the rounded, air-light templates of the last decade toward an aesthetic of high-impact utility and structural permanence. This is "Precision Brutalism"—a digital architecture that feels machined rather than rendered.

By utilizing intentional asymmetry and a rigid 0px radius philosophy, we create a UI that commands authority. We break the "template" look by treating the screen as a technical blueprint: heavy strokes, bold offsets, and a relentless focus on high-contrast information density. This is not just a dashboard; it is a high-performance command center.

---

## 2. Colors & Surface Logic
The palette is built on deep, architectural blacks and a high-visibility "Warning" spectrum (Amber/Orange).

### The Palette
- **Core Background:** `surface` (#131313)
- **Primary Accent:** `primary_container` (#fbbf24) — Used for mission-critical actions and state indicators.
- **Secondary Accent:** `secondary_container` (#ec6a06) — Used for urgent alerts and divergent data paths.
- **Text/Inks:** `on_surface` (#e5e2e1) and `on_surface_variant` (#d3c5ac) for lower-hierarchy metadata.

### The "Heavy-Stroke" Rule
Contrary to standard modern design, this system **requires** visible containment. Every functional container must utilize a `2px` or `3px` solid border using `outline` (#9c8f79). Do not use 1px borders; they lack the industrial weight required for this aesthetic.

### Surface Hierarchy & Layering
Instead of traditional elevation, we use "Offset Stacking."
- **Level 0 (Base):** `surface` (#131313) with the subtle honeycomb pattern overlay.
- **Level 1 (Cards):** `surface_container` (#201f1f) with a `3px` solid border.
- **Level 2 (Active/Focus):** `surface_container_high` (#2a2a2a).

### Signature Textures
To add "soul" to the brutalism, implement a 5% opacity honeycomb grid across the `surface` layer. For CTA buttons, use a subtle linear gradient from `primary` (#ffe1a7) to `primary_container` (#fbbf24) to simulate a physical, backlit industrial toggle.

---

## 3. Typography
We utilize a dual-font system to balance industrial "tech" with high-end editorial clarity.

- **Display & Headlines (Space Grotesk):** All-caps, heavy tracking (letter-spacing: 0.05em). These are the structural beams of the layout. `display-lg` and `headline-lg` should be treated as graphic elements, not just text.
- **Body & Data (Work Sans):** Chosen for its high legibility in dense task environments. Use `body-md` for standard task descriptions.
- **Mono-Utility (System Mono):** For IDs, timestamps, and status codes, use a monospace font to reinforce the "machine-read" aesthetic.

---

## 4. Elevation & Depth: The Hard-Shadow Principle
Traditional Gaussian blurs are prohibited. Depth is communicated through **Block Shadows**.

- **The Offset Rule:** Floating elements (like active cards or buttons) must use a 0-blur shadow.
  - **Shadow Token:** `4px 4px 0px 0px #0e0e0e` (using `surface_container_lowest`).
- **Nesting:** When placing a container inside another (e.g., a task item inside a column), do not use a shadow. Use a background shift to `surface_container_low` and a `1px` `outline_variant` border.
- **Interaction Depth:** On "Hover," the block shadow should increase from 4px to 8px, physically lifting the element toward the user. On "Active/Click," the shadow disappears, and the element shifts `translate(4px, 4px)` to simulate a physical button press.

---

## 5. Components

### Buttons (The "Industrial Toggle")
- **Primary:** `primary_container` background, `2px` black border, 0px radius. Text is `on_primary_fixed` (All-caps, Bold).
- **Secondary:** Transparent background, `on_surface` `2px` border. 
- **Interaction:** All buttons must have a "Hard-Shadow" that collapses on click.

### Chips & Badges
- **Status Badges:** Use sharp, non-rounded rectangles. Use `secondary_container` for "High Priority" and `tertiary` for "Backlog."
- **Padding:** Tight, technical padding (e.g., `spacing.1` vertical, `spacing.3` horizontal).

### Input Fields
- **Styling:** `surface_container_lowest` background, `2px` `outline` border.
- **Focus State:** Border color shifts to `primary_container` with a 4px block shadow. 
- **Labels:** Use `label-sm` in All-caps, placed directly above the field with no vertical gap, creating a "tabbed" appearance.

### The "Monolith" Card
- **Structure:** No divider lines. Separate header, body, and footer using distinct `surface-container` tiers or a 2px horizontal rule that spans 100% of the container width.
- **Layout:** Use `spacing.5` (1.1rem) as the standard internal gutter to maintain a sense of structured density.

---

## 6. Do's and Don'ts

### Do:
- **Use 0px radius everywhere.** If a component defaults to a curve, override it.
- **Embrace "Over-inked" Borders.** If a section feels weak, increase the border weight to 3px.
- **Leverage Asymmetry.** Align headers to the far left and metadata to the far right to create a "technical manual" feel.
- **Use High-Contrast States.** An "Active" task should be unmistakably different (e.g., a full `primary_container` background vs. a `surface` background).

### Don't:
- **No Soft Shadows.** Never use `box-shadow` with a blur radius greater than 0px.
- **No Pastel Colors.** Stick to the Amber/Orange/Black/Cream spectrum. Avoid "friendly" blues or greens.
- **No Centered Typography.** Brutalism is about structure; align text to the grid (Left or Right), never center.
- **No Dividers for Spacing.** Use the `spacing` scale to create clear air between sections; only use lines when they are heavy and intentional (2px+).

---

## 7. Signature Editorial Component: "The Status Bar"
Every view should be anchored by a top or bottom "Status Bar" using `surface_container_highest`. This bar should contain breadcrumbs in `label-md` (Mono) and a real-time system "Health" indicator in `primary_container`. This reinforces the feeling that the user is operating a piece of high-end industrial machinery.```