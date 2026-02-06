const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/taskdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Helper to find an available port starting from desired PORT
    const net = require("net");

    const findAvailablePort = (startPort, maxTries = 10) =>
      new Promise((resolve, reject) => {
        let port = Number(startPort) || 0;
        let attempts = 0;

        const tryPort = () => {
          const tester = net
            .createServer()
            .once("error", (err) => {
              tester.close();
              if (err.code === "EADDRINUSE" || err.code === "EACCES") {
                attempts += 1;
                port += 1;
                if (attempts >= maxTries) return reject(err);
                return tryPort();
              }
              return reject(err);
            })
            .once("listening", () => {
              tester.close(() => resolve(port));
            })
            .listen(port, "0.0.0.0");
        };

        tryPort();
      });

    try {
      const availablePort = await findAvailablePort(PORT, 20);
      const server = app.listen(availablePort, () =>
        console.log("Server running on port", availablePort),
      );

      server.on("error", (err) => {
        console.error("Server error:", err);
        process.exit(1);
      });
    } catch (err) {
      console.error("Failed to bind to a port starting at", PORT, err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });
