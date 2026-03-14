import type { ElectrobunConfig } from "electrobun";

export default {
  app: {
    name: "Claude Auto Setup",
    identifier: "dev.claude.auto-setup",
    version: "1.0.0",
  },
  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    views: {},
    copy: {},
    mac: {
      icons: "icon.iconset",
    },
  },
  scripts: {
    postBuild: "./scripts/postbuild.ts",
  },
} satisfies ElectrobunConfig;
