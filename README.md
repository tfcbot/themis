# Themis

Themis is the sponsor directory for [Max Explains AI](https://maxexplains.ai).

This repo is the stack root (THEMIS-01): Next.js App Router + Convex, wired for Vercel Marketplace deployment.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Convex](https://convex.dev/) backend
- Deployed on [Vercel](https://vercel.com/) with Marketplace-managed Convex credentials

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Authenticate Convex via Vercel Marketplace (do not paste deploy keys into the repo):

   ```bash
   npx convex login --vercel
   ```

3. Start the dev server and choose the **Themis** Convex project on the Marketplace team when prompted:

   ```bash
   npx convex dev
   ```

   Or use the combined script:

   ```bash
   npm run dev
   ```

## Vercel Marketplace setup (coordinator)

After the Vercel project exists and is linked:

```bash
vercel link
vercel integration add convex --name themis -e production -e preview
```

Do not pass `--prefix`. Marketplace provisions Preview and Production Convex credentials automatically.

Builds use the official Convex + Vercel wiring in `vercel.json`:

```json
{
  "buildCommand": "npx convex deploy --cmd 'npm run build'"
}
```

## Scripts

- `npm run dev` — Convex dev + Next.js dev server
- `npm run build` — typecheck + Next.js production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check

## Scope (THEMIS-01)

- Minimal app shell: nav (Directory, Sponsor, Add listing) and home placeholder
- Trivial Convex `hello.getMessage` query to prove wiring
- No Listing schema, Stripe, apply form, admin gate, or payment collection (later issues)
