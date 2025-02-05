"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const enviroment_1 = require("../config/enviroment");
const router = express_1.default.Router();
// Base URL for the Dota API (read from environment variables)
const baseUrl = enviroment_1.CONFIG.DOTA_API_BASE_URL;
// Route to fetch heroes
/**
 * @swagger
 * /api/v1/heroes:
 *   get:
 *     summary: List of all Dota heroes
 *     description: Gets an array list of all heroes in dota2.
 *     responses:
 *       200:
 *         description: if successful returns an array of all heroes in the game.
 */
router.get("/heroes", async (req, res, next) => {
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get(`${baseUrl}/heroes`);
        const heroes = response.data; // Ensure the data conforms to the Hero interface
        res.status(200).json(heroes); // Respond with the heroes data
    }
    catch (error) {
        console.error("Error fetching heroes:", error);
        next(error); // Pass the error to the next middleware
    }
});
/**
 * @swagger
 * /api/v1/heroStats:
 *   get:
 *     summary: List of all Dota heroes
 *     description: Gets an array list of all heroes in dota2.
 *     responses:
 *       200:
 *         description: if successful returns an array of all heroes in the game.
 */
router.get("/heroStats", async (req, res, next) => {
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get(`${baseUrl}/heroStats`);
        const heroes = response.data; // Ensure the data conforms to the Hero interface
        res.status(200).json(heroes); // Respond with the heroes data
    }
    catch (error) {
        console.error("Error fetching heroes:", error);
        next(error); // Pass the error to the next middleware
    }
});
// Route to fetch heroes
/**
 * @swagger
 * /api/v1/live:
 *   get:
 *     summary: List of all Dota heroes
 *     description: Gets an array list top currently ongoing live games in dota2.
 *     responses:
 *       200:
 *         description: if successful returns an array of all heroes in the game.
 */
router.get("/live", async (req, res, next) => {
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get(`${baseUrl}/live`);
        const heroes = response.data; // Ensure the data conforms to the Hero interface
        res.status(200).json(heroes); // Respond with the heroes data
    }
    catch (error) {
        console.error("Error fetching heroes:", error);
        next(error); // Pass the error to the next middleware
    }
});
/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search players by name
 *     description: Get a list of players whose names match or are similar to the query string.
 *     parameters:
 *       - name: q
 *         in: query
 *         description: The search query (e.g., player name or part of the name)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of players matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   account_id:
 *                     type: integer
 *                     description: The account ID of the player
 *                   avatarfull:
 *                     type: string
 *                     description: URL to the player's avatar image
 *                   personaname:
 *                     type: string
 *                     description: The player's display name
 *                   last_match_time:
 *                     type: string
 *                     format: date-time
 *                     description: The last match time for the player
 *                   similarity:
 *                     type: number
 *                     description: A similarity score between the query and the player
 *       400:
 *         description: Bad request, query parameter "q" is missing or invalid
 *       404:
 *         description: No players found matching the query
 *       500:
 *         description: Internal server error
 */
router.get("/search", async (req, res, next) => {
    try {
        // Retrieve query parameters (e.g., player name, match ID, etc.)
        const query = req.query.q; // 'q' is the search query (can be player name, match ID, etc.)
        if (!query) {
            res.status(400).json({ error: 'Query parameter "q" is required' });
        }
        // Build the URL for the OpenDota API search endpoint
        const url = `${baseUrl}/search?q=${encodeURIComponent(query)}`;
        // Make the request to the OpenDota API
        const response = await axios_1.default.get(url); // Use the PlayerSearchResults interface here
        // Return the search results from OpenDota API
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error("Error during OpenDota search:", error);
        next(error); // Pass the error to the next middleware (e.g., error handler)
    }
});
/**
 * @swagger
 * /api/v1/rankings:
 *   get:
 *     summary: Get player rankings for a specific hero
 *     description: Fetches the top player rankings for a specific hero from OpenDota API.
 *     parameters:
 *       - in: query
 *         name: hero_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the hero to fetch rankings for.
 *     responses:
 *       200:
 *         description: A list of player rankings for the hero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rankings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       account_id:
 *                         type: integer
 *                       score:
 *                         type: number
 *                       personaname:
 *                         type: string
 *                       avatar:
 *                         type: string
 *       400:
 *         description: Bad request if `hero_id` is not provided.
 *       500:
 *         description: Internal server error if the API request fails.
 */
router.get("/rankings", async (req, res, next) => {
    try {
        const { hero_id } = req.query;
        if (!hero_id) {
            res.status(400).json({ error: "hero_id is required" });
            return;
        }
        const response = await axios_1.default.get("https://api.opendota.com/api/rankings", {
            params: { hero_id },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error("Error fetching rankings:", error);
        next(error); // Pass error to Express's error handler
    }
});
/**
 * @swagger
 * /api/v1/distributions:
 *   get:
 *     summary: Get MMR and rank distributions
 *     description: Fetches data on MMR and rank distributions from OpenDota.
 *     responses:
 *       200:
 *         description: Successfully retrieved distributions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rank:
 *                   type: object
 *                   description: Rank distribution data
 *                 mmr:
 *                   type: object
 *                   description: MMR distribution data
 *       500:
 *         description: Internal server error
 */
router.get("/distributions", async (req, res, next) => {
    try {
        const response = await axios_1.default.get("https://api.opendota.com/api/distributions");
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error("Error fetching distributions:", error);
        next(error); // Pass the error to the Express error handler
    }
});
/**
 * @swagger
 * /api/v1/heroes/:hero:
 *   get:
 *     summary: Get MMR and rank distributions
 *     description: Fetches data on MMR and rank distributions from OpenDota.
 *     responses:
 *       200:
 *         description: Successfully retrieved distributions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rank:
 *                   type: object
 *                   description: Rank distribution data
 *                 mmr:
 *                   type: object
 *                   description: MMR distribution data
 *       500:
 *         description: Internal server error
 */
router.get("/heroes/:hero", async (req, res, next) => {
    const { hero } = req.params; // Extract hero from the URL parameters
    try {
        // Make the API request to OpenDota
        const response = await axios_1.default.get(`https://api.opendota.com/api/heroes/${hero}`);
        res.status(200).json(response.data); // Send the OpenDota API response to the client
    }
    catch (error) {
        console.error(`Error fetching hero data for ${hero}:`, error);
        if (axios_1.default.isAxiosError(error) && error.response) {
            res.status(error.response.status).json({
                error: error.response.data,
                message: `Failed to fetch data for hero: ${hero}`,
            });
        }
        else {
            next(error); // Pass the error to the Express error handler
        }
    }
});
/**
 * @swagger
 * /api/v1/constants/items:
 *   get:
 *     summary: Get MMR and rank distributions
 *     description: Fetches data on MMR and rank distributions from OpenDota.
 *     responses:
 *       200:
 *         description: Successfully retrieved distributions data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rank:
 *                   type: object
 *                   description: Rank distribution data
 *                 mmr:
 *                   type: object
 *                   description: MMR distribution data
 *       500:
 *         description: Internal server error
 */
router.get("/constants/items", async (req, res, next) => {
    try {
        const respone = await axios_1.default.get(`https://api.opendota.com/api/constants/items`);
        res.status(200).json(respone.data);
    }
    catch (error) {
        console.error("Error fetching rankings:", error);
        next(error); // Pass error to Express's error handler
    }
});
exports.default = router;
//# sourceMappingURL=openDotaRoutes.js.map