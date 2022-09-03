const router = require("express").Router();
const API = require("../KlaytnAPI/API");
const User = require("../models/User");

// update user
router.put("/:walletAddress", async (req, res) => {
	if (req.body.walletAddress === req.params.walletAddress || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Account has been updated")
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can update only your account");
	}
})

// delete user
router.delete("/:walletAddress", async (req, res) => {
	if (req.body.walletAddress === req.params.walletAddress || req.body.isAdmin) {
		try {
			const user = await User.findOneAndDelete({"walletAddress": req.body.walletAddress})
			res.status(200).json("Account has been deleted")
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can delete only your account");
	}
})

// get a user
router.get("/", async (req, res) => {
	const userwalletaddress = req.query.walletAddress;
	const username = req.query.username;
	try {
		const user = userwalletaddress
		 ? await User.findOne({walletAddress: userwalletaddress})
		 : await User.findOne({username: username})
		const {updatedAt, ...other} = user._doc
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
})

router.get("/balance/:walletAddress", async (req, res) => {
	try {
		const balance = await API.getBalance(req.params.walletAddress)
		res.status(200).json(balance);
	} catch (err) {
		res.status(500).json(err);
	}
})

module.exports = router