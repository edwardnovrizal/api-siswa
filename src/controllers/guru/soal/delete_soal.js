const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const DeleteSoal = async (req, res) => {
  const { id_soal } = req.body;
  const { id_guru } = req.guru;

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });

    const Respone = await SoalModel.deleteOne({ _id: id_soal });
    await MapelModel.updateMany({ soal: id_soal }, { $pull: { soal: id_soal } });
    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Hapus Data Soal",
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
  DeleteSoal,
};
