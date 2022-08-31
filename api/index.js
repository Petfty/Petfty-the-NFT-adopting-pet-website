const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const tokensRoute = require("./routes/tokens");
const usersRoute = require("./routes/users");
const klipRoute = require("./routes/klip");

dotenv.config();

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Connected to MongoDB");
	}
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/tokens", tokensRoute);
app.use("/api/users", usersRoute);
app.use("/api/klip", klipRoute);

app.listen(8080, () => {
	console.log("Backend server is running!");
})