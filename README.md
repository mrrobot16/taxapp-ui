# Tax App UI

Next.js frontend for the Tax App assistant.

## Prerequisites

- Bun (`>=1.0`)
- Node.js (`>=20.9.0`)
- A Firebase project with Authentication enabled

## Local Setup

1. Copy `.env.example` into `.env.local`.
2. Fill all Firebase variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_SESSION_COOKIE_NAME` (optional override)
   - `FIREBASE_SESSION_MAX_AGE_MS` (optional override)
3. Choose environment routing (`APP_ENV` / `NEXT_PUBLIC_APP_ENV`).
4. Install dependencies:

```bash
bun install
```

5. Run dev server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase Setup Checklist

1. Create Firebase project and web app.
2. In **Authentication > Sign-in method**, enable:
   - Email/Password
   - Google
3. Create a service account key in Firebase Console.
4. Put service account values into server env variables.

## Auth Flow

1. User signs in on `/login` using Firebase Web SDK.
2. Client sends Firebase ID token to `POST /api/auth/session`.
3. Server verifies token with Firebase Admin and sets an httpOnly session cookie.
4. Protected pages and API routes validate this cookie on each request.
5. `POST /api/auth/logout` clears cookie and revokes refresh tokens.

## Validation Commands

```bash
bun run lint
bun run typecheck
bun run build
```
