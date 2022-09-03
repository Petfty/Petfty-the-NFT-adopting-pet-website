const router = require("express").Router();
const axios = require("axios");

// get result
router.get("/result", async (req, res) => {
	const response = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${req.body.request_key}`);
	console.log(response.data)
	if (response.data.result) {
		console.log(`[result] ${JSON.stringify(response.data.result)}`);
		res.status(200).json(response.data);
	} else {
		console.log(response.data.status)
		res.status(200).json(response.data);
	}
})

module.exports = router