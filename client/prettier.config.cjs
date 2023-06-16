/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */

const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: [
    "react", // React
    "^react-.*$", // React-related imports
    "^next", // Next-related imports
    "^next-.*$", // Next-related imports
    "^next/.*$", // Next-related imports
    "^.*/hooks/.*$", // Hooks
    "^.*/services/.*$", // Services
    "^.*/utils/.*$", // Utils
    "^.*/types/.*$", // Types
    "^.*/pages/.*$", // Components
    "^.*/components/.*$", // Components
    "^[./]", // Other imports
    ".*", // Any uncaught imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  printWidth: 120,
  endOfLine: "auto",
}

module.exports = config
