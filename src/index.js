const express = require("express");
const path = require("path");
const { add, multiply, divide, greet } = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the game as the homepage
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/game.html"));
});

// Health check endpoint (used by CI and deploy platforms)
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Simple API (still available alongside the game)
app.get("/api/math", (req, res) => {
  const { a, b, op } = req.query;
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: "Invalid numbers" });
  }

  let result;
  if (op === "multiply")     result = multiply(numA, numB);
  else if (op === "divide")  result = divide(numA, numB);
  else                       result = add(numA, numB);

  res.json({ a: numA, b: numB, op: op || "add", result });
});

app.get("/api/greet/:name", (req, res) => {
  try {
    res.json({ message: greet(req.params.name) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Ember Isle running → http://localhost:${PORT}`);
  });
}

module.exports = app;
