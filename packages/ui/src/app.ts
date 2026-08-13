// App / dashboard primitives — the RSC-safe subset of the design system.
//
// These are pure, presentational components (no hooks, no browser APIs), so
// they can be imported into React Server Components. The root entry
// (`@totalaudiopromo/ui`) also re-exports the marketing components, several of
// which are client components (useState); importing the root barrel into a
// Server Component would drag those in. Import primitives from
// `@totalaudiopromo/ui/app` in server code to avoid that.

export { Card } from './Card'
export { Button } from './Button'
export { PageHeader } from './PageHeader'
export { SectionLabel } from './SectionLabel'
export { EmptyState } from './EmptyState'
export { StatCard } from './StatCard'
export { ActionTile } from './ActionTile'
