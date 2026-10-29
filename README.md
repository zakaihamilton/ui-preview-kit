# UI Preview Kit

A shared React package for building consistent, isolated UI previews across applications. It provides the preview toolbar, custom dropdowns, shared SVG icon, and a starter route scaffold so teams can preview real interface patterns without routing through login or connecting to live user data.

## Why use it

A preview route is useful for reviewing screens, states, and design changes quickly. Keeping its shell and controls in this package gives every app the same polished starting point:

- **Consistent across projects:** shared spacing, typography, toolbar controls, and the “UI Preview” icon.
- **Less duplicated code:** maintain one toolbar and dropdown implementation instead of copying UI and CSS between repositories.
- **Easier to add:** the `ui-preview-init` command creates a development-only starter route in a Next.js App Router project.
- **Safer to explore:** apps can show synthetic fixtures and simulated actions in a route that is separate from login and protected product flows.
- **Simple to extend:** each application keeps control of its own screens, fixtures, preview state, and route behavior.

## What’s included

- `PreviewToolbar` — a shared toolbar with the title, subtitle, optional note and utilities, plus bar or card variants and light or dark themes.
- `PreviewDropdown` — a styled, keyboard-friendly dropdown for navigation or client-side selection.
- `PreviewIcon` — the shared SVG mark, titled “UI Preview”.
- `ui-preview-init` — a scaffold command for a development-only `/ui-preview` route.

The package owns presentation components. It does not own an application’s routing, authentication, fixtures, data access, or action handling.

## Install and scaffold

From the root of a Next.js project using the App Router:

```sh
pnpm add github:zakaihamilton/ui-preview-kit#v0.1.1
pnpm exec ui-preview-init
```

The initializer creates `page.tsx`, `preview-client.tsx`, and `page.module.css` under `src/app/ui-preview` or `app/ui-preview`. Its server page returns `notFound()` outside development. It stops without changing files if a `/ui-preview/page.tsx` route already exists.

Replace the sample screens with your own synthetic fixtures and preview-specific UI. The scaffold is a starting point; your app remains responsible for keeping real data and actions out of the preview.

## Use the components

```tsx
'use client';

import { useState } from 'react';
import { PreviewDropdown, PreviewToolbar } from '@zakaihamilton/ui-preview-kit';

const screens = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
];

export function PreviewControls() {
  const [screen, setScreen] = useState('overview');

  return (
    <PreviewToolbar
      subtitle="Synthetic data · local preview"
      note="Actions are simulated; no changes are saved."
    >
      <PreviewDropdown
        label="Screen"
        value={screen}
        options={screens}
        onSelect={setScreen}
      />
    </PreviewToolbar>
  );
}
```

Use `onSelect` for client-side state, as shown above, or set an `href` on each option to navigate between preview URLs. For a route-based preview, derive the selected value from the URL and include it in the option href:

```tsx
const routeOptions = screens.map((item) => ({
  ...item,
  href: '/ui-preview?screen=' + encodeURIComponent(item.value),
}));

<PreviewDropdown label="Screen" value={screen} options={routeOptions} />
```

`PreviewToolbar` also accepts `variant="card"` and `theme="dark"`. Optional utilities can be passed through its `utilities` prop. The package includes its compiled CSS with the components, so a consuming Next.js app does not need a separate package build step.

## Keep preview separate from login and authentication

Mount the preview route outside the authenticated application layout when possible. Give it a preview-only shell and deterministic fixtures. If reusable UI requires auth context, provide a mock only inside the preview route. Do not make preview rendering depend on a real login, session, production database, or authenticated API.

Keep the existing login and authentication flows unchanged. Do not weaken production route protection to make previews accessible. Restrict the preview route on the server to local development—for Next.js App Router, check `process.env.NODE_ENV` in the server page and call `notFound()` outside development. If middleware applies authentication globally, any exception must be limited to the exact preview path and development environment; production checks must remain in force.

Treat preview actions as simulations. Use synthetic data, prevent real form submissions and mutations, and label simulated results clearly.

## Copy-ready prompt for an AI coding agent

Use this prompt when adding the kit to an existing application:

```text
You are working in an existing application. Add an isolated UI Preview experience using `@zakaihamilton/ui-preview-kit`.

First inspect the framework, routing tree, login and authentication flow, middleware, protected layouts, existing UI components, and test setup. Identify exactly where auth is enforced before changing files.

Requirements:
- Add a dedicated `/ui-preview` route that can be opened locally without signing in and is separate from the normal login route and authenticated product layout.
- Keep the current login flow, auth provider, session handling, and production route protection intact. Do not disable or weaken authentication globally.
- Make the preview route development-only with a server-side environment check. In Next.js App Router, use a server `page.tsx` that calls `notFound()` when `process.env.NODE_ENV !== 'development'`, and render client-side preview controls in a separate client component.
- If middleware redirects every unauthenticated request to login, add only a narrowly scoped exception for `/ui-preview` in development. Do not allow that exception in production or for other routes.
- Reuse presentational UI components where practical. If they require auth context, provide a preview-only mock provider or wrapper; do not change the real provider or inject mock data globally.
- Use synthetic fixtures only. Do not read real user data, call authenticated or production APIs, or submit forms or mutations. Make preview actions no-ops or simulated actions and explain that they are simulated.
- Install `@zakaihamilton/ui-preview-kit` at the current documented tag if it is not already installed. Use `PreviewToolbar`, `PreviewDropdown`, and the shared “UI Preview” icon for the preview controls; keep page-specific fixtures and state in this application.
- Preserve existing routes and visual behavior. Add or update focused tests for the preview controls and route guard.

After implementation, report the files changed, how the preview stays separate from login/authentication, and the checks you ran. Do not claim production safety unless the production route guard was verified.
```

## Testing note for Vitest

If Vitest reports an unknown `.css` extension while importing this package, inline it so Vite can transform the package stylesheet. Add this under `test` in `vitest.config.ts`:

```ts
server: { deps: { inline: ['@zakaihamilton/ui-preview-kit'] } },
```

## License

MIT
