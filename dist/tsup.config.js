"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsup_1 = require("tsup");
exports.default = (0, tsup_1.defineConfig)({
    entry: ['src/discord-pages.ts'],
    external: [],
    noExternal: [],
    platform: "node",
    format: ['esm', 'cjs'],
    target: 'es2022',
    skipNodeModulesBundle: true,
    clean: true,
    shims: true,
    minify: false,
    splitting: false,
    keepNames: true,
    dts: true,
    sourcemap: true,
    esbuildPlugins: [],
});
//# sourceMappingURL=tsup.config.js.map