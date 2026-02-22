const express = require("express");
const app = express();
const port = 3000;

// הדביקי כאן את ה-API Key שלך שמתחיל ב-rnd_
const RENDER_API_KEY = process.env.RENDER_API_KEY;
app.get("/services", async (req, res) => {
  try {
    console.log("Fetching services from Render...");

    const response = await fetch(
      "https://api.render.com/v1/services?limit=20",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${RENDER_API_KEY}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Render API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Success! Data received.");
    res.json(data);
  } catch (err) {
    console.error("Detailed Error:", err.message);
    res.status(500).json({
      error: "Failed to fetch services",
      details: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
