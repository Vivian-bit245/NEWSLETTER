const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 5003;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Mailchimp API credentials
const MAILCHIMP_DC = process.env.MAILCHIMP_DC;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;

const MAILCHIMP_URL = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`;

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const response = await axios.post(
      MAILCHIMP_URL,
      {
        email_address: email,
        status: "subscribed",
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `anystring:${MAILCHIMP_API_KEY}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return res.json({ success: true, message: "Successfully subscribed!" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Error subscribing to Mailchimp" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
