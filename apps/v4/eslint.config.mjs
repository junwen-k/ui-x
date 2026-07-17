import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  nextCoreWebVitals,
  nextTypescript,
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
        },
      ],
      // The registry deliberately exports named props interfaces
      // (`interface XProps extends useRender.ComponentProps<"div"> {}`),
      // mirroring Base UI's public API idiom.
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
      // TODO: New react-hooks v6 rules flag long-standing patterns in the
      // registry components (composed event handlers reading refs, media
      // query hooks). Revisit when refreshing the registry components.
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".source/**"]),
]);
