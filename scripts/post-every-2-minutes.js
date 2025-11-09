// Simple Node.js script to make a POST request every 2 minutes
const https = require("https"); // or use 'http' if your endpoint is not HTTPS
const url = "https://exp.host/--/api/v2/push/send"; // <-- Replace with your endpoint
const data = JSON.stringify({
  to: "ExponentPushToken[QUORvlC7L_kivcgsY5ZcFt]",
  title: "Instant Zahlung erhalten",
  body: "Hans Muster hat CHF 50.00 überwiesen",
});

function makePostRequest() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = https.request(url, options, (res) => {
    let responseData = "";
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", res.headers);
    res.on("data", (chunk) => {
      responseData += chunk;
    });
    res.on("end", () => {
      console.log("Response:", responseData);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.write(data);
  req.end();
}

// Run every 2 minutes (120000 ms)
makePostRequest(); // Run immediately
setInterval(makePostRequest, 120000);
