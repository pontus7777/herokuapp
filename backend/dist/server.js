"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./auth/passport"));
const enviroment_1 = require("./config/enviroment");
const mongoDbRoutes_1 = __importDefault(require("./routes/mongoDbRoutes"));
const openDotaRoutes_1 = __importDefault(require("./routes/openDotaRoutes"));
const steamRoutes_1 = __importDefault(require("./routes/steamRoutes"));
const swagger_1 = require("./swagger");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "your secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/v1/steam", steamRoutes_1.default);
app.use("/api/v1/", openDotaRoutes_1.default);
app.use("/api/v1/", mongoDbRoutes_1.default);
app.use(express_1.default.static(path_1.default.join("../frontend/dist")));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.resolve("../frontend/dist/index.html"), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});
// Swagger documentation
(0, swagger_1.setupSwagger)(app);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not Found", path: req.originalUrl });
});
// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${enviroment_1.CONFIG.PORT}`);
    console.log(`API docs available at http://localhost:${enviroment_1.CONFIG.PORT}/api-docs`);
});
exports.server = server;
exports.default = app;
//# sourceMappingURL=server.js.map