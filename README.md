# simpleHeaderFooter

Two Salesforce Experience Cloud LWC components — `brandedHeader` and `brandedFooter` — for building accessible, brand-consistent headers and footers on LWR (Lightning Web Runtime) Experience sites.

---

## Components

### `brandedHeader`

A simple brand bar with a logo linked to the site home page. Includes a GOV.UK-style skip link as the first focusable element for keyboard and screen reader accessibility.

**Properties (configurable in Experience Builder)**

| Property | Type | Default | Description |
|---|---|---|---|
| `logoReference` | ContentReference | — | CMS image selected via the image picker. Upload via Setup > Digital Experiences > CMS Workspaces first. |
| `homeUrl` | String | `/` | URL the logo links to. |
| `logoHeight` | String | `48` | Logo height in pixels. Enter a number only (e.g. `48`). |
| `logoAltText` | String | `Home` | Alt text for the logo, read by screen readers. Describe the logo and its destination (e.g. `Portal - go to home page`). |
| `backgroundColour` | String | — | Header background as a hex value (e.g. `#000000`). Falls back to CSS custom property `--branded-header-bg`. |
| `focusColour` | String | — | Focus ring colour as a hex value (e.g. `#ffdd00`). Falls back to `--branded-header-focus`. |

---

### `brandedFooter`

A structured footer with configurable secondary navigation sections, fixed meta links (Privacy, Cookies, Accessibility Statement), and an optional Open Government Licence bar.

**Properties (configurable in Experience Builder)**

#### Secondary navigation

Navigation is configured with four parallel, semicolon-separated string properties — one entry per section, in matching order.

| Property | Type | Example | Description |
|---|---|---|---|
| `sectionNames` | String | `Our Offices;Contact Us` | Section heading labels. |
| `navigationNames` | String | `London\|Manchester;Email\|Call` | Pipe-separated item labels within each section. |
| `navigationLinks` | String | `https://...\|https://...;mailto:...\|tel:...` | Pipe-separated URLs in the same order as Navigation Names. |
| `columnTypes` | String | `2;1` | `1` for a single-column list, `2` for a two-column list, per section. |

#### Meta links

These three links are always shown. The component resolves them to correct site-relative URLs automatically using `NavigationMixin` — enter the page API name only, not the full URL.

| Property | Type | Default | Description |
|---|---|---|---|
| `privacyPageName` | String | `Privacy` | API name of the Privacy page (Experience Builder > Page Properties > API Name). |
| `cookiesPageName` | String | `Cookies` | API name of the Cookies page. |
| `accessibilityPageName` | String | `Accessibility_Statement` | API name of the Accessibility Statement page. |

#### Licence bar

| Property | Type | Default | Description |
|---|---|---|---|
| `hideLicenceBar` | Boolean | `false` | Tick to hide the OGL bar. Leave unticked for public sector projects. |
| `licenceBarPrefix` | String | `All content is available under the ` | Text before the OGL link. |
| `licenceBarSuffix` | String | `, except where otherwise stated` | Text after the OGL link. |

#### Colour overrides

All colour properties accept a hex value (e.g. `#382573`). When left blank, the component falls back to the corresponding CSS custom property so colours can be set globally in the site theme.

| Property | CSS custom property fallback | Description |
|---|---|---|
| `backgroundColour` | `--branded-footer-bg` | Main footer background. |
| `barBackgroundColour` | `--branded-footer-bar-bg` | Licence bar background. |
| `headingColour` | `--branded-footer-heading` | Section heading text colour. |
| `navLinkColour` | `--branded-footer-nav-link` | Navigation link colour. |
| `metaLinkColour` | `--branded-footer-meta-link` | Meta link colour (Privacy, Cookies, Accessibility). |
| `focusColour` | `--branded-footer-focus` | Focus ring colour. |

---

## Deployment

Deploy to your org using the Salesforce CLI:

```bash
sf project deploy start --source-dir force-app
```

Then add the components to your Experience site pages via Experience Builder.

---

## Accessibility

These components are designed to support **WCAG 2.2 AAA** conformance at default configuration.

- **Skip link** — the header renders a visually hidden `Skip to main content` link as the first focusable element, becoming visible on focus. Ensure your page template includes a matching `id="main-content"` anchor.
- **Focus appearance (2.4.12 AAA)** — all interactive elements use a `3px solid` outline with `outline-offset` via `:focus-visible`, plus a background colour swap for additional contrast. Default focus colour is `#ffdd00` (yellow) against a dark background (~16:1 contrast ratio).
- **Target size (2.5.5 AAA, 44×44px)** — footer nav links, footer meta links, and the header skip link all have `min-height: 44px` with sufficient padding to meet the enhanced target size criterion.
- **Contrast (1.4.6 AAA, 7:1)** — default white-on-black text achieves 21:1. **Colour overrides are not validated by the component** — verify any custom hex values meet 7:1 contrast against their background before deploying.
- **Link purpose (2.4.9 AAA)** — all links have meaningful standalone labels (skip link text, logo alt text, named nav items, fixed meta link labels, OGL link text).
- **Semantic landmarks** — `role="banner"` on the header, `role="contentinfo"` on the footer, `aria-label="Navigation menu"` on nav lists, `aria-hidden="true"` and `focusable="false"` on the decorative licence SVG.
