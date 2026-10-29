# UI Preview Kit

A shared React package for local preview chrome: a titled toolbar, accessible dropdown controls, and a common SVG icon.

The package owns presentation only. Each consuming application owns its preview route, synthetic fixtures, state, and action blocking.

## Install in an existing Next.js project

    pnpm add github:zakaihamilton/ui-preview-kit#v0.1.0
    pnpm exec ui-preview-init

The initializer creates a development-only starter /ui-preview route under src/app or app. It stops without changing files if the project already has that route. Customize the generated sample to use safe synthetic fixtures and the app's own preview guard.

## Use the components directly

    import { PreviewDropdown, PreviewToolbar } from "@zakaihamilton/ui-preview-kit";

    <PreviewToolbar subtitle="Synthetic data · local preview" note="Actions are simulated; no changes are saved.">
      <PreviewDropdown
        label="Screen"
        value={screen}
        options={screens.map((screen) => ({
          value: screen.id,
          label: screen.label,
          href: "/ui-preview?screen=" + encodeURIComponent(screen.id),
        }))}
      />
    </PreviewToolbar>

PreviewToolbar also accepts variant="card" for an inset card and theme="dark" for dark surfaces. Dropdown options can use href for navigation or onSelect for client-side state. PreviewIcon is exported for layouts that need the icon without the complete toolbar.

The Git dependency includes prebuilt JavaScript, declarations, and CSS, so consuming applications do not need a package build step.
