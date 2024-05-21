"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const path_1 = __importDefault(require("path"));
// Import pino-mongodb but we don't need to use it directly
require("pino-mongodb");
const createProdLogger = (serviceName) => {
    const logTransport = pino_1.default.transport({
        targets: [
            {
                target: "pino/file",
                options: {
                    destination: path_1.default.join(__dirname, `./logs/${serviceName}.log`),
                    mkdir: true,
                },
                level: "info",
            },
            {
                target: "pino-mongodb",
                options: {
                    uri: process.env.MONGO_URI_LOGGER, // Use the logger-specific URI
                    database: "pino-prod-logger", // Use a different database for logging
                    collection: serviceName,
                    level: "info",
                },
                level: "info",
            },
        ],
    });
    return (0, pino_1.default)({
        level: "info",
        base: {
            service: serviceName,
            environment: process.env.NODE_ENV,
        },
        timestamp: pino_1.default.stdTimeFunctions.isoTime,
    }, logTransport);
};
exports.default = createProdLogger;
//# sourceMappingURL=logger.prod.js.map