// Filename: index.js
// This is a complete, self-contained Node.js application using the Express framework.
// To run this code:
// 1. Make sure you have Node.js installed.
// 2. Save this code as `index.js`.
// 3. In your terminal, run `npm install express`.
// 4. Then run `node index.js`.
// The server will start on port 3000.

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

/**
 * POST /bfhl
 * This endpoint processes an array of data and returns a structured JSON response.
 */
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        // Validate if data is an array
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array."
            });
        }

        // Initialize arrays and variables for processing
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_chars = '';

        // --- Data Processing Logic ---
        data.forEach(item => {
            // Check if item is a number (or a string that can be converted to a number)
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = Number(item);
                if (num % 2 === 0) {
                    even_numbers.push(String(item));
                } else {
                    odd_numbers.push(String(item));
                }
                sum += num;
            }
            // Check if item is an alphabet character or a string of alphabets
            else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_chars += item;
            }
            // Otherwise, it's a special character
            else {
                special_characters.push(String(item));
            }
        });

        // --- Concatenation and Alternating Caps Logic ---
        let concat_string = '';
        const reversed_alphabets = alphabet_chars.split('').reverse().join('');
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }

        // --- Construct the Response ---
        const response = {
            is_success: true,
            user_id: "podalaluru_datha_sainath_18122004", // Replace with your details
            email: "sainath.22bce20050@vitap.ac.in", // Replace with your email
            roll_number: "21BCE20050", // Replace with your roll number
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        // Send the successful response
        res.status(200).json(response);

    } catch (error) {
        // Graceful error handling
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred."
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('API endpoint available at POST /bfhl');
});
