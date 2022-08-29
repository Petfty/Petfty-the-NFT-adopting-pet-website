const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
	console.log(req.body);
	try{
		// create new users
		const newUser = new User({
			username: req.body.username,
			address: req.body.address,
		});
		
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
		const address = await User.findOne({ address: req.body.address });
		!address && res.status(404).json("user not found");

		res.status(200).json("Login Success");
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router