export type AppEnv ="local" | "development" | "staging" | "production";

type EnvConfig = {
  backendUrl: string;
};

const envConfigs: Record<AppEnv, EnvConfig> = {
  local: {
    backendUrl: "http://127.0.0.1:8000",
  },
  development: {
    backendUrl: "https://api.taxapp.dev",
  },
  staging: {
    backendUrl: "https://api.taxapp.dev",
  },
  production: {
    backendUrl: "https://api.taxapp.dev"
  },
};

const VALID_ENVS = new Set<string>(Object.keys(envConfigs));

function resolveEnv(): AppEnv {
  const raw =
    process.env.APP_ENV ??
    process.env.NEXT_PUBLIC_APP_ENV ??
    "development";

  if (VALID_ENVS.has(raw)) return raw as AppEnv;

  console.warn(`Unknown APP_ENV "${raw}", falling back to "development"`);
  return "development";
}

export const APP_ENV = resolveEnv();
export const envConfig = envConfigs[APP_ENV];
