const Mongoose = require("mongoose");

const MuridSchema = Mongoose.Schema(
  {
    username: { type: String, unique: true },
    fullname: { type: String },
    email: { type: String, unique: true },
    password: String,
    guru: { type: Mongoose.Schema.Types.ObjectId, ref: "Guru" }, // Setiap Mapel terkait dengan satu Guru
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

MuridSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MuridModel = Mongoose.model("Murid", MuridSchema);

module.exports = MuridModel;
