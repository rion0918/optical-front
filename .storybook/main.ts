import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import react from "@vitejs/plugin-react";
import type { AliasOptions } from "vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
  ],
  docs: { autodocs: "tag" },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    const alias = config.resolve.alias ?? [];
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const replacement = path.resolve(dirname, "../src");
    const aliasOptions: AliasOptions = Array.isArray(alias)
      ? [...alias, { find: "@", replacement }]
      : { ...alias, "@": replacement };
    config.resolve.alias = aliasOptions;
    // Ensure React automatic JSX runtime
    config.plugins = [
      ...(config.plugins || []),
      react({ jsxRuntime: "automatic" }),
    ];
    config.define = {
      ...(config.define ?? {}),
      "process.env": JSON.stringify({ NODE_ENV: "development" }),
      process: {
        env: { NODE_ENV: "development" },
      },
    };
    return config;
  },
};

export default config;
