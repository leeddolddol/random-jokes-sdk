import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".mjs" : ".cjs",
  }),
  minify: true,
});
