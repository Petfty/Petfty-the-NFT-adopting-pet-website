const router = require("express").Router();
const Pet = require("../models/Pet");
const User = require("../models/User");
const { route } = require("./auth");

// create a petToken
router.post("/", async (req, res) => {
	const newPet = new Pet(req.body);
	try {
		const savedPet = await newPet.save();
		res.status(200).json(savedPet);
	} catch (err) {
		res.status(500).json(err);
	}
});


// delete a petToken
router.delete("/:tokenId", async (req, res) => {
	try {
		const currentPet = await Pet.findById(req.params.tokenId);
		if (currentPet.userId === req.body.userId) {
			await post.deleteOne({ $set: req.body });
			res.status(200).json("the petToken has been delete");
		} else {
			res.status(403).json("you can delete only your petToken");
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

// get a petToken
router.get("/:tokenId", async (req, res) => {
	try {
		const currentPet = await Pet.findById(req.params.tokenId);
		res.status(200).json(currentPet);
	} catch (err) {
		res.status(500).json(err);
	}
})

// get all petToken
router.get("/all", async (req, res) => {
	try {
		const pets = await Pet.find({});
		res.status(200).json(pets);
	} catch (err) {
		res.status(500).json(err);
	}
})

// get user's all petToken
router.get("/profile/:address", async (req, res) => {
	try {
		const user = await User.findOne({ address: req.params.address })
		const pet = await Pet.find({ userId: user._id})
		res.status(200).json(pet)
	} catch (err) {
		res.status(500).json(err);
	}
});

// adopt petToken
router.put("/:tokenId", async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.tokenId);
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("the post has been updated");
		} else {
			res.status(403).json("you can update only your post");
		}
	} catch (err) {
		res.status(500).json(err);
	}
	
});