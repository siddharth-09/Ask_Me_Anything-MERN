// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Define the port to run the server on
const port = process.env.port || 3800;

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON request bodies
app.use(cors());          // Enable CORS for all routes

// Initialize Google Generative AI with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Route to handle POST requests to "/gpt"
app.post("/gpt", async (req, res) => {
    const { question } = req.body;  // Destructure question from request body
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // Get the generative model

    try {
        const result = await model.generateContent(question);  // Generate content based on the question
        const ans = result.response.text();  // Get the text response

        console.log(ans);  // Log the generated answer

        // Send the response back to the client
        res.json({ ans: ans });
    } catch (error) {
        console.error("Error generating content:", error);  // Log any errors
        res.status(500).json({ error: "Failed to generate content" });  // Send error response
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
