// @ts-check

import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierRecommended,
  reactPlugin.configs.flat?.recommended,
  reactPlugin.configs.flat?.["jsx-runtime"],
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: {
      // Formatting
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "lf",
          semi: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
        },
      ],
      // React
      "react/react-in-jsx-scope": "off",
      ...hooksPlugin.configs.recommended.rules,
      // TypeScript
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
    },
    ignores: ["*.test.tsx"],
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
];
