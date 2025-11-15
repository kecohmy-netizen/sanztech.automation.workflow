# Tech Stack

## Core Technologies

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast refresh
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Backend**: Supabase
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

## Key Libraries

- **@xyflow/react**: Visual workflow builder
- **lucide-react**: Icon library
- **date-fns**: Date manipulation
- **recharts**: Data visualization
- **cmdk**: Command palette

## Common Commands

```bash
# Development
npm run dev

# Build (with TypeScript compilation)
npm run build

# Build (ignore TypeScript errors)
npm run build-no-errors

# Preview production build
npm run preview

# Linting
npm run lint

# Generate Supabase types
npm run types:supabase
```

## Path Aliases

- `@/*` maps to `src/*` for cleaner imports
- Example: `import { Button } from "@/components/ui/button"`

## TypeScript Configuration

- Target: ES2020
- Strict mode: Disabled
- Module resolution: Bundler
- JSX: react-jsx
- No emit on error: false (allows builds with type errors)
