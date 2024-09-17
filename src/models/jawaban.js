const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

const JawabanSchema = Mongoose.Schema(
  {
    id_mapel: { type: Mongoose.Schema.Types.ObjectId, ref: "Mapel" },
    id_murid: { type: Mongoose.Schema.Types.ObjectId, ref: "Murid" },
    jawaban: [
      {
        id_soal: { type: Mongoose.Schema.Types.ObjectId, ref: "Soal" },
        jawaban_murid: { type: String, required: true },
        nilai: { type: Number, required: true },
      },
    ],
    skor_total: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

JawabanSchema.plugin(UniqueValidator, {
  message: "Data '{VALUE}' sudah tersedia !",
});

JawabanSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const JawabanModel = Mongoose.model("Jawaban", JawabanSchema);

module.exports = JawabanModel;
