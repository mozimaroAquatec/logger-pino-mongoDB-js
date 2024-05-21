"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing required modules
const express_1 = __importDefault(require("express"));
const connect_db_1 = __importDefault(require("./config/connect.db")); // Importing MongoDB connection function
const users_routes_1 = __importDefault(require("./routes/users.routes")); // Importing energy routes
const cors_1 = __importDefault(require("cors"));
require("./config/env.config");
const page_not_found_1 = require("./middlewares/page.not.found");
const logging_1 = require("./logging");
// Creating an Express app
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connecting to MongoDB
(0, connect_db_1.default)();
app.use("/", users_routes_1.default);
app.use(page_not_found_1.logNotFound);
// Starting the server and listening on the specified port
app.listen(process.env.PORT || 5000, async function () {
    try {
        logging_1.serverLogger.info(`Server is running on port ${process.env.PORT}`);
    }
    catch (error) {
        logging_1.serverLogger.error(error, "server error");
    }
});
//# sourceMappingURL=index.js.map