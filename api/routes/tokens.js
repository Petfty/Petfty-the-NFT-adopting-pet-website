const router = require("express").Router();
const Token = require("../models/Token");
const User = require("../models/User");

// create a Token
router.post("/", async (req, res) => {
	const newToken = new Token(req.body);
	try {
		const savedToken = await newToken.save();
		res.status(200).json(savedToken);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete a Token
router.delete("/:id", async (req, res) => {
	try {
		const currentToken = await Token.findById(req.params.id);
		if (currentToken.ownerId === req.body.ownerId) {
			await currentToken.deleteOne({ $set: req.body });
			res.status(200).json("the Token has been delete");
		} else {
			res.status(403).json("you can delete only your Token");
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

// get all Token
router.get("/all", async (req, res) => {
	try {
		const tokens = await Token.find({});
		res.status(200).json(tokens);
	} catch (err) {
		res.status(500).json(err);
	}
})

// get a Token
router.get("/:id", async (req, res) => {
	try {
		const currentToken = await Token.findById(req.params.id);
		res.status(200).json(currentToken);
	} catch (err) {
		res.status(500).json(err);
	}
})

// get user's all Token
router.get("/profile/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })
		const token = await Token.find({ ownerId: user._id})
		res.status(200).json(token)
	} catch (err) {
		res.status(500).json(err);
	}
});

// adopt Token
router.put("/:id", async (req, res) => {
	try {
		const token = await Token.findById(req.params.id);
		if (token.ownerId === req.body.ownerId) {
			await token.updateOne({ $set : {'desc.isAdopted': req.body.desc.isAdopted} });
			res.status(200).json("the token has been updated");
		} else {
			res.status(403).json("you can update only your token");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router