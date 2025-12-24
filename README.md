
# FakeTwitch (Next.js)

A Twitch-like streaming app built with **Next.js App Router**, **Clerk authentication**, **LiveKit** for real‑time video, **Prisma (MongoDB)** for data, and **UploadThing** for uploads.

## Features

- **Auth**: Sign up / sign in with Clerk
- **Browse**: Home feed, search, creator pages (`/:username`)
- **Dashboard**: Creator area under `/u/:username` (keys/chat/community)
- **Streaming**: LiveKit ingress + live status updates via webhook
- **Social**: Follow/unfollow, block/unblock
- **Uploads**: Stream thumbnail upload via UploadThing
- **UI**: Tailwind + shadcn/ui tokens + `next-themes` (Zinc palette)

## Tech Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Clerk (`@clerk/nextjs`) for authentication + webhooks
- Prisma + MongoDB (`PRISMA_DB_URL`)
- LiveKit (viewer tokens, ingress, webhook receiver)
- UploadThing (thumbnail upload)
- Tailwind CSS + shadcn/ui primitives + `next-themes`

## Project Structure (high level)

- `app/(browse)` — public browsing UI
- `app/(auth)` — auth routes
- `app/(dashboard)/u/[username]` — creator dashboard (protected)
- `app/api/webhooks/*` — Clerk + LiveKit webhooks
- `app/api/uploadthing/*` — UploadThing route + router
- `actions/*` — server actions (ingress, stream settings, token, etc.)
- `lib/*` — DB/services (Prisma, follow/block/feed/search)
- `prisma/schema.prisma` — MongoDB schema

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- A **MongoDB** database
- A **Clerk** application
- A **LiveKit** project (Cloud or self-hosted)
- An **UploadThing** app

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` in the project root.

#### Database (Prisma)

```bash
PRISMA_DB_URL="mongodb+srv://..."
```

#### Clerk

Used by `@clerk/nextjs` and the webhook route.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Webhook verification secret (Svix)
CLERK_WEBHOOK_SECRET="whsec_..."
```

#### LiveKit

Server-side (ingress + webhook + token signing):

```bash
LIVEKIT_URL="https://<your-livekit-host>"
LIVEKIT_KEY="..."
LIVEKIT_SECRET="..."
```

Client-side (used by the player):

```bash
NEXT_PUBLIC_LIVEKIT_URL="wss://<your-livekit-host>"
# Optional alternative supported by the UI:
NEXT_PUBLIC_LIVEKIT_WS_URL="wss://<your-livekit-host>"
```

#### UploadThing

UploadThing environment variables depend on your dashboard settings. Common keys are:

```bash
UPLOADTHING_APP_ID="..."
UPLOADTHING_SECRET="..."
```

### Prisma (MongoDB)

This repo runs `prisma generate` automatically on install (`postinstall`). If you need to sync schema to MongoDB:

```bash
npx prisma db push
```

### Run the App

```bash
npm run dev
```

Open http://localhost:3000

## Webhooks

### Clerk

Endpoint: `POST /api/webhooks/clerk`

- Validates Svix headers (`svix-id`, `svix-timestamp`, `svix-signature`)
- Requires `CLERK_WEBHOOK_SECRET`
- Handles `user.created`, `user.updated`, `user.deleted`

### LiveKit

Endpoint: `POST /api/webhooks/livekit`

- Validates the `Authorization` signature
- Updates `Stream.isLive` on `ingress_started` / `ingress_ended`

## Common Troubleshooting

### `LiveKit URL is not configured`

Set `NEXT_PUBLIC_LIVEKIT_URL` (or `NEXT_PUBLIC_LIVEKIT_WS_URL`) to a **WebSocket** URL, typically `wss://...`.

### Windows build error: `EPERM ... .next\trace`

Stop the dev server first (Ctrl+C), then run:

```bash
npm run build
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint

