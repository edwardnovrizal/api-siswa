const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

const GuruSchema = Mongoose.Schema(
  {
    username: { type: String, unique: true },
    fullname: { type: String },
    email: { type: String, unique: true },
    password: String,
    mapel: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Mapel" }],
    murid: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Murid" }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

GuruSchema.plugin(UniqueValidator, {
  message: "Data '{VALUE}' sudah tersedia !",
});

GuruSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const GuruModel = Mongoose.model("Guru", GuruSchema);

module.exports = GuruModel;
