---
name: Pulse iOS Design System
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414755'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#4c4aca'
  on-secondary: '#ffffff'
  secondary-container: '#6664e4'
  on-secondary-container: '#fffbff'
  tertiary: '#006b27'
  on-tertiary: '#ffffff'
  tertiary-container: '#008733'
  on-tertiary-container: '#f7fff2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c2c1ff'
  on-secondary-fixed: '#0c006a'
  on-secondary-fixed-variant: '#3631b4'
  tertiary-fixed: '#72fe88'
  tertiary-fixed-dim: '#53e16f'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531c'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-stat:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-stat-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system channels the refined, ergonomic elegance of contemporary iOS and iPadOS interfaces. It prioritizes fluid clarity, content-forward hierarchy, and tactile optical feedback. Built for seamless monitoring, dynamic telemetry, and actionable analytics, the UI delivers an effortless, ambient user experience.

### Core Visual Attributes
- **Glassmorphic Precision:** Layered translucent surfaces featuring high-saturation backdrop filters that dynamically tint according to the canvas content behind them.
- **Continuous Curvature (Squircle Metaphor):** Generous, smooth radii across all interactive and structural containers to reflect modern Apple device hardware contours.
- **Metric-Centric Hierarchy:** High-density, high-legibility typographic metrics paired with vibrant status accents that evoke the energy of Apple Fitness and watchOS complications.
- **Atmospheric Restraint:** Minimal visual clutter. Depth is communicated strictly via optical luminance, subtle specular inner highlights, and multi-tier ambient shadows rather than harsh divider strokes.

## Colors

The palette directly adopts the semantic color model of Apple Human Interface Guidelines:

- **Primary (`#007AFF` - iOS Blue):** Anchors core actions, links, active tab highlights, and primary keyframes.
- **Secondary (`#5856D6` - Indigo/Purple):** Emphasizes complementary trends, secondary analytics, and auxiliary interactive states.
- **Tertiary (`#34C759` - System Green):** Indicates positive trajectory, operational health, nominal performance, and verified states.
- **Warning / Alert (`#FF9500` - System Orange):** Flags attention, thresholds, and pending operational tasks.
- **System Destructive (`#FF3B30` - System Red):** Reserved strictly for critical warnings, failures, and irreversible actions.
- **Canvas Neutral (`#F2F2F7` - System Grouped Background):** The default soft foundational canvas tone that maximizes optical contrast with floating bright surfaces.
- **Surface Material (`#FFFFFF` with 72%–90% opacity):** The foundational base for floating cards and modular widgets.
- **Label Primary (`#1C1C1E`):** Pure readability for headlines, metrics, and primary inputs.
- **Label Secondary (`#8E8E93`):** Sublabels, metadata, units of measurement, and unselected UI elements.
- **Separators / Specular Highlights (`rgba(255, 255, 255, 0.65)` and `rgba(0, 0, 0, 0.04)`): Ultra-fine boundary definition.

## Typography

The type system is powered by **Plus Jakarta Sans**, echoing the functional geometry, open aperture, and neutral legibility of Apple's San Francisco Pro.

- **Metric Complications & Stat Displays:** Utilize `display-stat` with tight tracking (`-0.03em`) and heavy weight to mirror watchOS modular widgets and the iPadOS lock-screen widgets.
- **Large Titles:** Set large titles (`headline-xl`) with optical baseline alignment to navigation toolbars.
- **Body Hierarchy:** Rely on `body-md` (15px) for general information and secondary descriptions, adhering to standard Apple dynamic reading scales.
- **Eyebrow & Widget Headers:** Use `label-md` and `label-sm` with slight uppercase tracking (`0.02em` - `0.04em`) paired with secondary neutral coloring (`#8E8E93`) to establish clear categorization.

## Layout & Spacing

Layouts follow an Apple-standard **Adaptive Fluid Modular Grid**:

- **Desktop & iPadOS (Landscape):** 12-column adaptive layout with `2rem` (32px) margins and `1.25rem` (20px) gutters. Accommodates multi-pane master-detail navigation split views (e.g., standard sidebar width of 260px–320px).
- **iPadOS (Portrait) & Tablet:** 8-column layout with `1.5rem` (24px) margins and `1rem` (16px) gutters. Widgets group into 2-column or 4-column sub-tiles.
- **Mobile (iOS):** 4-column layout with `1rem` (16px) canvas margin and `0.75rem` (12px) gutters. Widgets stack vertically or span horizontally in native edge-to-edge carousel carousels with negative-margin snapping.
- **Rhythm & Padding:** Component internal padding uses strictly `space-md` (16px) for compact widgets and `space-lg` (24px) for full-width cards.

## Elevation & Depth

Visual depth is achieved through optical materials and soft atmospheric dispersion rather than heavy dropped shadows.

### Glassmorphic Material Recipe
- **Base Widget Tile:** Background of `rgba(255, 255, 255, 0.78)` backed by `backdrop-filter: blur(28px) saturate(190%)`.
- **Specular Border Stroke:** A 1px outer hairline border with `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.3) 100%)`.
- **Inner Rim Light:** An inner shadow (`inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)`) to mimic the beveled edge of milled glass.

### Elevation Scale
- **Level 0 (Canvas Base):** Solid `#F2F2F7` background.
- **Level 1 (Standard Card / Modular Tile):** Translucent material layer paired with `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)`.
- **Level 2 (Hover / Active Interactive Card):** `box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)`.
- **Level 3 (Modals / Action Sheets / Floating Menus):** Pure frosted acrylic `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(40px)` and `box-shadow: 0 24px 48px -8px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04)`.

## Shapes

The system relies on high-curvature pill and squircle geometry:

- **Widgets & Floating Cards:** Standardized on `24px` (`rounded-3xl` or `1.5rem`) corner rounding to replicate iPadOS home screen and dashboard widgets.
- **Primary Buttons & Form Fields:** Standardized on fully rounded pill containers (`9999px` or continuous `16px` for larger form cards).
- **Nested Elements:** Inner tags, badges, and icon backplates scale proportionally between `8px` and `12px` to preserve balanced concentric radii against the parent card.

## Components

### Buttons
- **Primary Action:** Solid `#007AFF` fill, white bold typography, pill-shaped (`border-radius: 9999px`), internal padding `12px 24px`. On press: opacity scales to `0.85` with a subtle mechanical scale transform (`scale(0.98)`).
- **Secondary / Glass Button:** `rgba(0, 122, 255, 0.1)` background with `#007AFF` text, 0px border, pill-shaped.
- **Icon Buttons:** Circular `44px x 44px` touch target, translucent white surface (`rgba(255, 255, 255, 0.8)`), soft drop shadow, `#007AFF` or `#1C1C1E` symbol glyph.

### Cards & Complication Widgets
- **Structure:** `24px` border radius, frosted glass background, 1px white gradient border, `20px` to `24px` internal padding.
- **Complication Header:** Top row containing a small rounded-rect icon container (`32px x 32px` with `8px` radius, system tint background at 15% opacity), accompanied by an uppercase `label-md` category, and optional contextual status dot.
- **Metric Center:** Huge, bold metric display (`display-stat`) in `#1C1C1E`, with adjacent trend pill indicators (e.g., green pill with `+14.2%` and an upward directional chevron).

### Chips & Segmented Controls
- **Segmented Control:** Grouped container with `#E5E5EA` background, `10px` radius, `3px` internal padding. The active segment is a sliding pure white card (`#FFFFFF`) with a micro-shadow (`0 2px 6px rgba(0,0,0,0.12)`).
- **Filter Chips:** Pill shape with `8px 16px` padding. Inactive: `#FFFFFF` with hairline border. Active: solid `#007AFF` with pure white text.

### Form Inputs & Text Fields
- **Container:** Rounded rectangle (`14px` border radius), filled with `rgba(118, 118, 128, 0.08)`, no default border.
- **States:** Transitions smoothly on focus to a `1px` outer stroke of `#007AFF` with a faint `0 0 0 3px rgba(0, 122, 255, 0.15)` focus ring. Clear button (x) displayed on right edge in `#8E8E93`.

### Toggles, Checkboxes & Radios
- **iOS Switch:** `51px x 31px` pill track. Inactive in `#E9E9EB`, active in `#34C759`. Draggable white circle handle (`27px`) with `0 3px 8px rgba(0,0,0,0.15)` shadow.
- **Checkboxes & Radios:** Circle-based (`20px`), `#007AFF` active state featuring a clean, sharp white checkmark glyph.

### List Views (Grouped Inset Table)
- **Inset Pattern:** Cards sit inset from edges by `16px`, grouped inside a shared `20px` rounded container with white glass fill.
- **Row Styling:** `48px` minimum height, border separator indented past the icon leading edge (`rgba(60, 60, 67, 0.12)`), chevron accessory (`#C7C7CC`) positioned on trailing edges.