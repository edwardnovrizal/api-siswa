const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

const MapelSchema = Mongoose.Schema(
  {
    title: { type: String, },
    icon: { type: String, },
    guru: { type: Mongoose.Schema.Types.ObjectId, ref: "Guru" }, // Setiap Mapel terkait dengan satu Guru
    soal: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Soal" }], // Mapel memiliki banyak Soal
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

MapelSchema.plugin(UniqueValidator, {
  message: "Data '{VALUE}' sudah tersedia !",
});

MapelSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MapelModel = Mongoose.model("Mapel", MapelSchema);

module.exports = MapelModel;
