const Mongoose = require("mongoose");

const ScoreSchema = Mongoose.Schema(
  {
    murid: { type: Mongoose.Schema.Types.ObjectId, ref: "Murid" },
    mapel: { type: Mongoose.Schema.Types.ObjectId, ref: "Mapel" },
    soal: { type: Mongoose.Schema.Types.ObjectId, ref: "Soal" },
    nilai: { type: Number },
    jumlah_soal: { type: Number },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

ScoreSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const ScoreModel = Mongoose.model("Score", ScoreSchema);

module.exports = ScoreModel;
