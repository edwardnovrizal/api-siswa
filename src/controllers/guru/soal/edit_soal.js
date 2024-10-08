const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const EditSoal = async (req, res) => {
  const { id_soal, pertanyaan, gambar, opsi, jawaban } = req.body;
  const { id_guru } = req.guru;

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });

    const soal = await SoalModel.findById(id_soal).populate("id_mapel");
    if (!soal)
      return res.status(404).send({
        code: res.statusCode,
        message: "Data Soal tidak ditemukan",
      });

    const mapel = await MapelModel.findOne({ _id: soal.id_mapel, guru: id_guru });
    if (!mapel)
      return res.status(404).send({
        code: res.statusCode,
        message: "Soal pada mapel ini tidak ditemukan",
      });

    const Respone = await SoalModel.findByIdAndUpdate(
      id_soal,
      {
        pertanyaan,
        gambar,
        opsi,
        jawaban,
      },
      { new: true, runValidators: true }
    );

    if (!Respone) {
      return res.status(404).json({
        code: res.statusCode,
        message: "Data Soal tidak ditemukan",
      });
    }

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Edit Data Soal",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = {
  EditSoal,
};
