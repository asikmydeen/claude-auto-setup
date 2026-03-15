import type { ElectrobunConfig } from "electrobun";

export default {
  app: {
    name: "Sidekick",
    identifier: "dev.sidekick.app",
    version: "1.0.0",
  },
  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    views: {},
    copy: { "dist": "views/ui" },
    mac: {
      icons: "icon.iconset",
    },
  },
  scripts: {
    postBuild: "./scripts/postbuild.ts",
  },
} satisfies ElectrobunConfig;
