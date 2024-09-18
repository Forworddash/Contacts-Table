"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const config = require("./config.cjs");
const generator = require("./generator.cjs");
exports.configSchema = config.configSchema;
exports.getConfig = config.getConfig;
exports.generator = generator.generator;
exports.startAPIRouteSegmentsFromTSRFilePath = generator.startAPIRouteSegmentsFromTSRFilePath;
//# sourceMappingURL=index.cjs.map
