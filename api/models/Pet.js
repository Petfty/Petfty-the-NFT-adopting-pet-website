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
    vaccinationDate: {
      type: String,
    },
    registeredAccount: {
      type: String,
      required: true,
    },
    registeredUsername: {
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

const PetSchema = new mongoose.Schema(
  {
    userId: {
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
    desc: {
      type: DescSchema,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
