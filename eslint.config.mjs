import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import dropEmDash from "eslint-plugin-drop-em-dash";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { "drop-em-dash": dropEmDash },
    rules: { "drop-em-dash/drop-em-dash": "error" },
  },
]);

export default eslintConfig;
