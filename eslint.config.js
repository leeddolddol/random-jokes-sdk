import eslint from "@eslint/js";
import * as tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  eslint.configs.recommended,

  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      "samples/**/*",
      "coverage/**/*",
      "*.config.ts",
      "**/*.config.ts",
    ],
  },
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        fetch: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs["recommended"].rules,
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-undef": "off",
    },
  },
];
