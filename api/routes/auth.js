const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");

// get auth URL (QR / mobile)
router.get("/connectURL", async (req, res) => {
	try {
		const response = await axios.post(process.env.A2P_API_PREPARE_URL, {
			bapp: {
				name: process.env.APP_NAME,
			},
			type: "auth"
		});
		const { request_key } = await response.data;
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

//REGISTER
router.post("/register", async (req, res) => {
	try{
		// create new users
		const newUser = new User({
			username: req.body.username,
			walletAddress: req.body.walletAddress,
		});
		console.log(newUser);

		// save user and respond
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

//LOGIN
router.post("/login", async (req, res) => {
	try {
		const walletAddress = await User.findOne({ walletAddress: req.body.walletAddress });
		if (!walletAddress) {
			return (res.status(404).json("user not found"));
		} else {
			return (res.status(200).json("Login Success"));
		}

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router