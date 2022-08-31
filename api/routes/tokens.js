const router = require("express").Router();
const axios = require("axios");
const API = require("../KlaytnAPI/API");
const Token = require("../models/Token");
const User = require("../models/User");

// get create token URL
router.get("/createTokenURL", async (req, res) => {
	try {
		// upload metadata
		const metadataURL = await API.uploadMetaData(req.body, req.body.desc.name, req.body.img);
		if (!metadataURL) {
			res.status(404).json("failed to upload metadata");
		}

		// execute contract
		const functionJson = '{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
		const request_key = await API.executeContract(process.env.NFT_CONTRACT_ADDRESS, functionJson, "0", `["${req.body.toAddress}", "${req.body.tokenId}", "${metadataURL}"]`);
		if (!request_key) {
			res.status(404).json("failed to execute contract");
		}

		// response to client
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
})

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

// get sale token URL
router.get("/saleTokenURL", async (req, res) => {
	try {
		// execute contract
		const functionJson = '{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
		const request_key = await API.executeContract(process.env.NFT_CONTRACT_ADDRESS, functionJson, "0", `["${req.body.fromAddress}", "${process.env.MARKET_CONTRACT_ADDRESS}", "${req.body.tokenId}"]`);
		if (!request_key) {
			res.status(404).json("failed to execute contract");
		}

		// response to client
		if (req.body.isMobile === true) {
			res.status(200).json({url: process.env.MB_URL, request_key: request_key});
		} else {
			res.status(200).json({url: process.env.QR_URL, request_key: request_key});
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

// update sale status
router.put("/saleToken/:id", async (req, res) => {
	try {
		const token = await Token.findById(req.params.id);
		if (token.ownerId === req.body.ownerId && token.tokenId === req.body.tokenId) {
			await token.updateOne({ $set: req.body });
			res.status(200).json("the token is on market");
		} else {
			res.status(403).json("you can only sale your owned token on market");
		}
	} catch(err) {
		res.status(500).json(err);
	}
})

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