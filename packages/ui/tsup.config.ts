import { defineConfig } from 'tsup'

const shared = {
  format: ['esm'] as const,
  dts: true,
  external: ['react', 'react-dom', 'lucide-react'],
}

// Two entries, built separately because they differ on one thing: the
// 'use client' banner. The root barrel re-exports client components (hooks,
// browser APIs) so it needs the directive. `src/app.ts` is deliberately the
// RSC-safe subset — banner it and every consumer importing it from a Server
// Component gets silently opted into client rendering, which is the whole
// thing that entry exists to avoid.
export default defineConfig([
  {
    ...shared,
    entry: ['src/index.ts'],
    banner: { js: "'use client';" },
  },
  {
    ...shared,
    entry: ['src/app.ts'],
  },
])
