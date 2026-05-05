# Firebase Console Setup Guide

This guide explains how to configure a Firebase project for `taxapp-ui` and map Firebase Console values to the environment variables used by the app.

## Prerequisites

- A Google account with permission to create Firebase projects.
- Access to this project and ability to edit `.env.local`.

## 1) Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project**.
3. Choose a project name and complete the setup flow.

After the project is created, keep the Firebase Console open for the next steps.

## 2) Generate the service account private key (server variables)

1. In your Firebase project, open **Project settings**.
2. Go to **Service accounts**.
3. Click **Generate new private key** and confirm.
4. A JSON file will be downloaded. Keep it secure and never commit it to git.

From that JSON file, copy these values into `.env.local`:

- `FIREBASE_PROJECT_ID` -> `project_id`
- `FIREBASE_CLIENT_EMAIL` -> `client_email`
- `FIREBASE_PRIVATE_KEY` -> `private_key`

### Important note for `FIREBASE_PRIVATE_KEY`

The private key is multiline. Store it as a single quoted string with `\n` characters preserved, for example:

```bash
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 3) Add a web app in Firebase (public client variables)

1. In **Project settings**, open the **General** tab.
2. In **Your apps**, click the **Web** icon (`</>`) to add a web app.
3. Register the app (nickname is enough). Hosting setup is optional for this project.
4. Firebase will display your web configuration object.

Copy those values into `.env.local` using this mapping:

- `NEXT_PUBLIC_FIREBASE_API_KEY` -> `apiKey`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` -> `authDomain`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` -> `projectId`
- `NEXT_PUBLIC_FIREBASE_APP_ID` -> `appId`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` -> `storageBucket`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` -> `messagingSenderId`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` -> `measurementId` (if Analytics is enabled)

## 4) Update local environment file

1. Copy `.env.example` to `.env.local` if you have not already:

   ```bash
   cp .env.example .env.local
   ```

2. Replace example values with your Firebase project values.

## 5) Recommended verification

- Start the app and verify login flow works:

  ```bash
  bun run dev
  ```

- If authentication fails, re-check:
  - Service account variables (`FIREBASE_*`).
  - Web app variables (`NEXT_PUBLIC_FIREBASE_*`).
  - That the private key format in `FIREBASE_PRIVATE_KEY` is intact.

## Security reminders

- Do not commit `.env.local` or service account JSON files.
- Rotate service account keys if a private key is exposed.
- Treat all `FIREBASE_*` server variables as secrets.
