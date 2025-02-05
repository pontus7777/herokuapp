"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDbConnection {
    constructor() {
        this.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
    }
    static getInstance() {
        if (!MongoDbConnection.instance) {
            MongoDbConnection.instance = new MongoDbConnection();
        }
        return MongoDbConnection.instance;
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("✅ MongoDB Connected Successfully");
        }
        catch (error) {
            console.error("❌ MongoDB Connection Error:", error);
            process.exit(1); // Exit the process if unable to connect
        }
    }
    async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log("🔌 MongoDB Disconnected");
        }
        catch (error) {
            console.error("❌ MongoDB Disconnection Error:", error);
        }
    }
}
exports.default = MongoDbConnection;
//# sourceMappingURL=MongoDbConnection.js.map