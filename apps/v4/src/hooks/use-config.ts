import useLocalStorageState from "use-local-storage-state";

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
};

export function useConfig() {
  return useLocalStorageState<Config>("config", {
    defaultValue: {
      packageManager: "pnpm",
      installationType: "cli",
    },
  });
}
