---
name: Pudugai Wellness Center
description: Clean, minimalist, and natural community wellness design system
colors:
  primary: "#134e32"
  primary-dark: "#0d3824"
  primary-hover: "#0d3824"
  primary-light: "#e8f3ed"
  primary-subtle: "#f0f7f3"
  teal: "#0f766e"
  teal-light: "#ccfbf1"
  amber: "#b45309"
  amber-light: "#fef3c7"
  bg: "#f8faf8"
  surface: "#ffffff"
  surface-alt: "#f1f5f2"
  border: "#cbd5e1"
  border-subtle: "#e2e8f0"
  text-main: "#111827"
  text-body: "#374151"
  text-muted: "#374151"
  text-secondary: "#4b5563"
  text-light: "#4b5563"
  success: "#15803d"
  success-bg: "#dcfce7"
  warning: "#b45309"
  warning-bg: "#fef3c7"
  danger: "#b91c1c"
  danger-bg: "#fee2e2"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Tamil', 'Latha', sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Tamil', 'Latha', sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.2rem)"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Tamil', 'Latha', sans-serif"
    fontSize: "clamp(1.22rem, 3vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Tamil', 'Latha', sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.68
  label:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Tamil', 'Latha', sans-serif"
    fontSize: "0.85rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3.5rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.35rem"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.35rem"
  button-whatsapp:
    backgroundColor: "{colors.success}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.35rem"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
---

# Design System: Pudugai Wellness Center (PWC)

## Overview

**Creative North Star: "The Natural Village Apothecary"**

The Pudugai Wellness Center design language conveys gentle, grounded health guidance rooted in community trust. Rather than adopting the cold, sterile clinical whites of a diagnostic hospital or the neon-infused aggressive gradients of a commercial fitness gym, PWC feels warm, organic, and approachable. Deep forest green anchors the identity, paired with warm off-white surfaces, generous breathing room, and crisp typography with native Tamil script fallbacks.

The interface is built mobile-first to serve everyday clients across Pudukkottai and Peravurani using smartphones ranging from 320px budget screens to standard viewports. Interactions emphasize clarity, rapid contact via WhatsApp and phone, and straightforward educational copy with non-medical disclaimers.

**Key Characteristics:**
- **Organic Restraint:** Dominant dark green brand voice with neutral off-white surfaces; zero gratuitous animations or sensory overload.
- **Human-Scale Density:** Generous line heights (1.65–1.75) and spacious card padding (1.5rem–2.5rem) that welcome older adults and families.
- **Frictionless Action:** Primary actions lead directly to authentic communication channels (clickable `tel:` links, WhatsApp chats with prefilled messages, and Google Maps location buttons).

---

## Colors

The palette draws directly from the official PWC three-leaf logo, balancing deep forest greens with calming neutrals and functional accents.

### Primary
- **Dark Forest Green** (`#134e32` / `var(--color-primary)`): The principal brand anchor. Applied to primary CTA buttons, hero branding, active indicators, and high-emphasis brand marks.
- **Deepest Forest Green** (`#0d3824` / `var(--color-primary-dark)`): Maximum contrast green. Applied to display titles, headlines (`h1`, `h2`), and button hover states.
- **Pale Leaf Green** (`#e8f3ed` / `var(--color-primary-light)`): Soft tint used for feature badges, coach contact pill hovers, and icon backgrounds.
- **Subtle Mint Background** (`#f0f7f3` / `var(--color-primary-subtle)`): Low-contrast background tint for hero sections, topbars, and alternating page sections.

### Secondary
- **Deep Teal** (`#0f766e` / `var(--color-teal)`): High-contrast accent color used for category tags, section overlines, sub-headers, and secondary metadata badges. Accessible contrast against light surfaces.
- **Pale Teal Tint** (`#ccfbf1` / `var(--color-teal-light)`): Background container for tags and category pills.

### Accent & Status
- **Deep Amber** (`#b45309` / `var(--color-amber)`): Warm amber used for warnings, highlights, and secondary attention cues.
- **WhatsApp Green** (`#15803d` / `var(--color-success)`): High-visibility green dedicated to WhatsApp buttons and verified success badges. Hover shifts to `#0f622d`.
- **Alert Red** (`#b91c1c` / `var(--color-danger)`): Form errors, destructive actions in admin, and validation alerts.

### Neutral
- **Warm Off-White Canvas** (`#f8faf8` / `var(--color-bg)`): Soft background canvas across the entire public layout, preventing harsh screen glare.
- **Card Surface** (`#ffffff` / `var(--color-surface)`): Clean, pure white cards providing subtle contrast against the off-white canvas.
- **Surface Alt** (`#f1f5f2` / `var(--color-surface-alt)`): Supporting surface tone for table headers, image placeholder frames, and admin backgrounds.
- **Crisp Border** (`#cbd5e1` / `var(--color-border)`): Slate-300 tone providing defined, tactile card boundaries.
- **Subtle Divider** (`#e2e8f0` / `var(--color-border-subtle)`): Soft interior dividers and table row borders.
- **Title Neutral** (`#111827` / `var(--color-text-main)`): Deep neutral for primary text and titles.
- **Body Charcoal** (`#374151` / `var(--color-text-body)` / `var(--color-text-muted)`): High-legibility charcoal for long-form reading.
- **Supporting Gray** (`#4b5563` / `var(--color-text-secondary)` / `var(--color-text-light)`): Secondary timestamps, duration tags, and help text.

### Named Rules
**The Forest Anchor Rule.** The dark green primary (`#134e32`) and deepest green (`#0d3824`) are reserved for brand signifiers, titles, and key CTAs. Backgrounds remain light (`#ffffff` or `#f8faf8`) to maintain high legibility and openness.  
**The WhatsApp Distinctiveness Rule.** `#15803d` is exclusively reserved for WhatsApp actions and genuine success indicators. It is never used for general decorative borders.

---

## Typography

**Primary Font:** `Plus Jakarta Sans`  
**System Fallbacks:** `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `Roboto`  
**Tamil Script Fallbacks:** `'Noto Sans Tamil'`, `'Latha'`, `sans-serif`

**Character:** Clean geometric sans-serif with open apertures and high x-height, pairing modern legibility with cultural bilingual support for Tamil community members.

### Hierarchy
- **Display / Hero H1** (`800`, `clamp(1.9rem, 5vw, 3rem)`, `line-height: 1.2–1.25`, `letter-spacing: -0.02em`): Used for primary page titles and hero statements.
- **Headline H2** (`750` / `800`, `clamp(1.5rem, 4vw, 2.3rem)`, `line-height: 1.25`, `letter-spacing: -0.015em`): Section titles across public pages.
- **Title H3** (`700`, `clamp(1.22rem, 3vw, 1.5rem)`, `line-height: 1.3`, `letter-spacing: -0.01em`): Card titles, coach names, pillar headings.
- **Sub-Title H4** (`700`, `1.15rem`, `line-height: 1.4`): Story headlines, table headings, and modal sub-headings.
- **Body Text** (`450` / `500`, `1rem` / `16px`, `line-height: 1.65–1.7`): All descriptive paragraphs, narrative stories, and testimonials. Max line length: 65–75ch.
- **Section Tag / Overline** (`750`, `0.825rem–0.85rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`): Section tags above H2 titles (`color: #0f766e`).
- **Microcopy & Captions** (`600`, `0.72rem–0.85rem`): Badges, timestamps, and input error text.

### Named Rules
**The High Contrast Body Rule.** Body text never uses washed-out grays. Text defaults to dark charcoal (`#374151`) on light backgrounds, exceeding WCAG 2.1 AA requirements.  
**The iOS Input Rule.** Form inputs and selects strictly enforce `font-size: 16px` minimum to prevent mobile Safari auto-zooming the viewport upon focus.

---

## Layout

The spatial model relies on a central container with fluid horizontal padding and structured grid layouts.

### Container & Max Width
- Max container width: `1200px` (`.container`).
- Horizontal padding:
  - Desktop (> 768px): `1.5rem` (`24px`).
  - Tablet (481px–768px): `1.25rem` (`20px`).
  - Mobile (361px–480px): `1rem` (`16px`).
  - Small mobile (331px–360px): `0.85rem` (`13.6px`).
  - Ultra-narrow (<= 330px): `0.75rem` (`12px`).

### Vertical Rhythm (Sections)
- Desktop: `5rem` top and bottom (`.section`).
- Laptop / Tablet (<= 992px): `3.5rem`.
- Mobile (<= 640px): `2.75rem`.
- Small mobile (<= 480px): `2.25rem`.
- Ultra-narrow (<= 360px): `1.75rem`.

### Grid Systems
- **Services & Stories:** 3 columns on desktop (`grid-template-columns: repeat(3, 1fr); gap: 1.5rem`), transitioning to 2 columns at 1024px, and 1 column at 640px.
- **Coaches & Full Stories:** 2 columns on desktop (`grid-template-columns: repeat(2, 1fr); gap: 2rem`), transitioning to 1 column at 860px.
- **Pillars:** 3 columns on desktop (`gap: 1.75rem`), transitioning to 1 column on mobile.
- **Hero & Contact:** Asymmetric 2-column split (e.g. `1.1fr 0.9fr` or `1fr 1.1fr`), stacking vertically on mobile.

---

## Elevation & Depth

PWC uses a **tactile, border-first elevation model**. Depth is primarily established through crisp borders (`1px solid #cbd5e1`), subtle tonal contrast, and ambient forest-green tinted drop shadows. Heavy blur layers and stark black shadows are intentionally avoided.

### Shadow Vocabulary
- **Subtle Surface** (`var(--shadow-sm)`: `0 1px 2px 0 rgba(19, 78, 50, 0.05)`): Standard rest state for cards, location boxes, and containers.
- **Interactive Elevation** (`var(--shadow-md)`: `0 4px 12px -2px rgba(19, 78, 50, 0.08)`): Applied on card hover, button hover, and active carousel containers.
- **Prominent Float** (`var(--shadow-lg)`: `0 10px 25px -3px rgba(19, 78, 50, 0.1)`): Modals, mobile menu drawers, and login panels.

### Named Rules
**The Tinted Ambient Rule.** Shadows are never neutral black (`rgba(0,0,0,...)`). They incorporate brand forest green (`rgba(19, 78, 50, ...)`) to harmonize with the organic canvas.  
**The Restrained Motion Rule.** Card and button hover elevations use slight transforms (`translateY(-1px)` or `translateY(-2px)`) with fast transitions (`150ms–250ms`). Excessive parallax or scale effects are banned.

---

## Shapes

- **Corners:**
  - Full pill (`var(--radius-full)`: `9999px`): Badges, category pills, coach contact pills, and smart call buttons.
  - Large card radius (`var(--radius-lg)`: `16px`): Cards, modal containers, and hero carousel media frames.
  - Medium component radius (`var(--radius-md)`: `10px`): Buttons, form inputs, textareas, and coach profile pictures.
  - Small element radius (`var(--radius-sm)`: `6px`): Small buttons, tags, and icon boxes.
- **Borders:**
  - Standard stroke: `1px solid var(--color-border)` (`#cbd5e1`).
  - Active / Focus stroke: `1px solid var(--color-primary)` or `var(--color-teal)`.
  - Disclaimer alert: Left accent bar of `4px solid var(--color-primary)`.

---

## Components

### Buttons
- **Touch Target:** Minimum height `44px` across all primary and secondary buttons.
- **Primary Button (`.btn-primary`):** Background `#134e32`, text `#ffffff`, border radius `10px`, padding `0.75rem 1.35rem`, font-weight `600`. Hover shifts to `#0d3824` with `translateY(-1px)` and shadow.
- **Secondary Button (`.btn-secondary`):** White background, dark green text (`#0d3824`), border `1px solid #94a3b8`.
- **Outline Button (`.btn-outline`):** Transparent background, dark green text, border `1px solid #134e32`.
- **WhatsApp Button (`.btn-whatsapp`):** Background `#15803d`, text `#ffffff`, font-weight `650`, WhatsApp icon inline.
- **Mobile Behavior:** Full-width buttons on mobile viewports (<= 480px) in CTA groups.

### Cards
- **Base Card (`.card`):** White background, `1px solid #cbd5e1`, `16px` border-radius, `1.5rem` internal padding, `var(--shadow-sm)`.
- **Coach Clean Card (`.coach-clean-card`):** Full portrait frame with `320px` height (object-position center 20%), structured bio, and interactive contact pill stack.
- **Service Card (`.service-card`):** Category badge header, title, description with flex grow, and "Ask About This" arrow link.
- **Story Card (`.story-card`):** Image header (`200px` height), bilingual language badge, duration pill, and testimonial body.

### Forms & Inputs
- **Inputs & Selects (`.form-input`, `.form-select`, `.form-textarea`):** Padding `0.75rem 0.95rem`, font size `16px`, border `1px solid #cbd5e1`, radius `10px`.
- **Focus State:** Border shifts to `#134e32` with outer ring `0 0 0 3px rgba(19, 78, 50, 0.12)`.
- **Textarea:** Minimum height `110px`, vertical resize only.

### Header & Navigation
- **Top Microbar:** Deep subtle green (`#f0f7f3`) with center info, phone, and Instagram link. Hidden on mobile <= 860px.
- **Main Sticky Header:** White background, subtle scroll shadow, brand logo with subtitle, desktop nav links with active bottom pill indicator (`2.5px` height).
- **Mobile Menu Drawer:** Full-width slide/fade drawer below header with backdrop overlay, Escape key listener, and body scroll lock.

### Footer
- **Desktop Footer (> 860px):** 4-column layout (Brand bio, Quick links, Wellness programs, Center contact details with Tamil address), disclaimer bar, and copyright row.
- **Mobile Footer (<= 860px):** Streamlined vertical stack with compact logo, direct phone link, location map link, Instagram link, and copyright.

### Hero Carousel
- Slideshow wrapper (`max-width: 480px`, height `440px`, radius `16px`).
- Smooth 700ms opacity/visibility cross-fade between active slides.
- Supports both static images (`object-fit: cover; object-position: center 25%`) and HTML5 video loops.

---

## Do's and Don'ts

### Do:
- **Do** use `var(--color-primary)` (`#134e32`) or `var(--color-primary-dark)` (`#0d3824`) for prominent headlines and primary buttons.
- **Do** enforce a minimum touch target of `44px` on all clickable interactive elements.
- **Do** maintain bilingual cultural compatibility (Tamil text fallbacks and Tamil language badges on success stories).
- **Do** include clear, prominent medical disclaimers on all pages discussing body composition or weight loss.
- **Do** ensure phone numbers are clickable `tel:` links and WhatsApp links use prefilled messages.

### Don't:
- **Don't** use black drop shadows; always use forest-green tinted shadows (`rgba(19, 78, 50, ...)`).
- **Don't** use input font sizes smaller than `16px`, which trigger automatic iOS viewport zoom.
- **Don't** make clinical diagnoses or medical promises; keep tone educational, supportive, and non-prescriptive.
- **Don't** introduce heavy gradients, floating neon accents, or aggressive commercial gym aesthetics.
- **Don't** create separate desktop and mobile button links with conflicting destinations.

---

## Discovered Inconsistencies & Undocumented Patterns

1. **Hardcoded Hex Values Across CSS Files:**
   - Multiple page stylesheets directly repeat `#0d3824`, `#0f766e`, `#374151`, and `#cbd5e1` rather than referencing CSS custom properties (`var(--color-primary-dark)`, `var(--color-teal)`, etc.).
2. **Non-Standard Font Weights:**
   - Global stylesheet and page CSS frequently use `font-weight: 450` (for body text and subtitles) and `font-weight: 750` (for h2 titles and overlines). While modern browsers approximate these, standard CSS specification steps are 400, 500, 600, 700, 800.
3. **Disparate Section Background Tints:**
   - HomePage hero uses `#f7faf8`.
   - Services overview uses `#fafcfb`.
   - Contact CTA uses `#f2f7f4`.
   - About header uses `#f7faf8`.
   - Global variable specifies `--color-bg: #f8faf8` and `--color-primary-subtle: #f0f7f3`. These variations should be unified under standard token roles.
4. **Duplicate Footer DOM Trees:**
   - `Footer.jsx` renders two completely separate DOM structures (`.mobile-footer` and `.desktop-footer`), hidden via CSS display toggles, creating redundant DOM nodes.
5. **Admin Portal Visual Detachment:**
   - Admin sidebar uses `#10291e` (not in global tokens) and a local JPEG logo (`/assets/pwc-logo.jpeg`), whereas the public site uses the official transparent PNG from Supabase storage.

---

## Potential Improvement Opportunities

1. **Token Consolidation:** Refactor hardcoded `#0d3824` and `#0f766e` across page CSS files to canonical CSS variables.
2. **Font Weight Normalization:** Map `450` to `400` or `500`, and `750` to `700` or `800`.
3. **Carousel Affordance:** Add subtle dot indicators or counter pills to `HeroCarousel` to improve slide count awareness.
4. **Single-Tree Responsive Footer:** Refactor `Footer.jsx` into a unified responsive grid/flex layout instead of maintaining two separate DOM trees.
5. **Shared Dual-Location Architecture:** Update the header topbar, coach cards, and footers to consistently represent both Pudukkottai and Peravurani branches.
