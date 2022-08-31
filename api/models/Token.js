const mongoose = require("mongoose");

const DescSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    animalKind: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    bornDate: {
      type: String,
      required: true,
    },
    isVaccinated: {
      type: Boolean,
      required: true,
    },
    isAdopted: {
      type: Boolean,
      required: true,
    },
    vaccinationDate: {
      type: String,
    },
    registeredId: {
      type: String,
      required: true,
    },
    registeredAddress: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TokenSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isOnSale: {
      type: Boolean,
      required: true,
      defalut: false,
    },
    desc: {
      type: DescSchema,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
