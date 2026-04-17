const express = require("express");
const path = require("path");
const ejs = require("ejs");
require("dotenv").config();
const connectDB = require("./config/db");
const Location = require("./models/location");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

connectDB();

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/api/v1/location/update", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        if(latitude !== null && longitude != null) {
            await Location.create({
                latitude: latitude,
                longitude: longitude
            });
        }

        res.redirect("/");

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to update visiter's location"
        });
    }
});
