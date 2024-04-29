import express from "express";
import cors from "cors";
import { userRoutes } from "./userRoutes.js";
import connectionToDb from "./databaseConfig.js";

const app = express();
const PORT = 5500;

// Ignore favicon requests
app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
});

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hii you are at the right server");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.use(express.json());
app.use("/", userRoutes.router);

app.all("*", (req, res) => {
    res.status(404).send("Oops Page not found!");
});

app.listen(PORT, async (error) => {
    if (!error) {
        await connectionToDb();
        console.log(`Server is running on the port ${PORT}`);
    } else {
        console.log(error);
    }
});

export default app;
