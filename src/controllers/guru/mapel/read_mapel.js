const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");

const ReadMapel = async (req, res) => {
  const { id_guru } = req.guru;
  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });

    const Respone = await MapelModel.find({ guru: id_guru }).populate("soal");

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Mata Pelajaran",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = { ReadMapel };
