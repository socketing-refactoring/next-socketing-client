import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: ["node_modules", ".next", "dist"],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
];

export default eslintConfig;
