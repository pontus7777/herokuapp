"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MongoDbConnection_1 = __importDefault(require("../MongoDbConnection"));
const router = express_1.default.Router();
var mongoDb = MongoDbConnection_1.default.getInstance();
/**
 * @swagger
 * /api/v1/:userId/favorite/:favoriteUserId/:
 *   post:
 *     summary: List of all Dota heroes
 *     description: Gets an array list of all heroes in dota2.
 *     responses:
 *       200:
 *         description: if successful returns an array of all heroes in the game.
 */
router.post("/:userId/favorite/:favoritedUserId", async (req, res, next) => {
    try {
        // post DB object
        mongoDb.connect();
    }
    catch (error) {
        console.error("Error fetching rankings:", error);
        next(error); // Pass error to Express's error handler
    }
});
router.post("/:userId/favorite/:matchId", async (req, res, next) => {
    try {
    }
    catch (error) {
        console.error("Error fetching rankings:", error);
        next(error); // Pass error to Express's error handler
    }
});
exports.default = router;
//# sourceMappingURL=mongoDbRoutes.js.map