const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

const SoalSchema = Mongoose.Schema(
  {
    pertanyaan: String,
    gambar: String,
    opsi: [
      {
        pilihan: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ], // Opsi jawaban
    jawaban: String, // Jawaban benar
    id_mapel: { type: Mongoose.Schema.Types.ObjectId, ref: "Mapel" }, // Soal terkait dengan satu Mapel
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    versionKey: false,
  }
);

SoalSchema.plugin(UniqueValidator, {
  message: "Data '{VALUE}' sudah tersedia !",
});

SoalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const SoalModel = Mongoose.model("Soal", SoalSchema);

module.exports = SoalModel;
