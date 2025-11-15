# Project Structure

## Directory Organization

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Radix UI wrappers)
│   ├── nodes/          # Custom workflow node components
│   └── *.tsx           # Feature components (Dashboard, WorkflowBuilder, etc.)
├── pages/              # Route-level page components
├── services/           # Business logic and API integrations
│   ├── analyticsService.ts
│   ├── browserAutomation.ts
│   ├── mayaPhoneService.ts
│   └── mayaService.ts
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities (cn, etc.)
├── types/              # TypeScript type definitions
│   └── supabase.ts     # Generated Supabase types
├── stories/            # Component stories/examples
├── tempobook/          # Tempo-specific functionality
│   └── storyboards/
├── App.tsx             # Main app component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind directives
```

## Component Conventions

- **UI Components**: Located in `src/components/ui/`, follow shadcn/ui patterns
- **Feature Components**: Top-level components in `src/components/`
- **Pages**: Route components in `src/pages/`
- **Services**: Business logic separated from UI in `src/services/`

## Routing

- Uses React Router v6 with declarative routing in `App.tsx`
- Base path configured via `VITE_BASE_PATH` environment variable
- Routes defined with `<Route>` components inside `<Routes>`

## Styling Approach

- Tailwind CSS with custom design tokens via CSS variables
- Theme colors defined in `index.css` using HSL values
- Dark mode support via class-based strategy
- Component variants managed with `class-variance-authority`
- Utility function `cn()` from `@/lib/utils` for conditional classes

## Import Patterns

- Use `@/` alias for all src imports
- Example: `import { Button } from "@/components/ui/button"`
- Avoid relative imports like `../../components`
