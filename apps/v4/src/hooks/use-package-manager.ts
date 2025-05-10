import useLocalStorageState from "use-local-storage-state";

export const packageManagers = ["npm", "yarn", "pnpm", "bun"] as const;

export type PackageManager = (typeof packageManagers)[number];

export function usePackageManager() {
  return useLocalStorageState<PackageManager>("package-manager", {
    defaultValue: "pnpm",
  });
}
