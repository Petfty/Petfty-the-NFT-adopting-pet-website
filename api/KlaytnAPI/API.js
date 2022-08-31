const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const option = {
	headers: {
		Authorization: process.env.AUTH,
		"x-chain-id": process.env.CHAIN_ID,
		"content-type" : "application/json",
	}
};

module.exports = {
	// =======================  KAS API ========================
	uploadMetaData: async (description, name, imageUrl) => {
		const _description = description;
		const _name = name;

		const metadata = {
			metadata: {
				name: _name,
				description: _description,
				image: imageUrl
			}
		}

		try {
			const response = await axios.post("https://metadata-api.klaytnapi.com/v1/metadata", metadata, option);
			// console.log(`${JSON.stringify(response.data)}`);
			return response.data.uri;
		} catch(e) {
			console.log(e);
			return (false);
		}
	},


	// ======================= KLIP API ==========================
	executeContract: async (txTo, functionJson, value, params) => {
		try{
			const response = await axios.post(process.env.A2P_API_PREPARE_URL, {
				bapp: {
					name: process.env.APP_NAME,
				},
				type: "execute_contract",
				transaction: {
					to: txTo,
					abi: functionJson,
					value: value,
					params: params
				},
			});
			const { request_key } = await response.data;
			console.log(response)
			return request_key;
		} catch (err) {
			console.log(err);
			return false;
		} 
		
	}
}
