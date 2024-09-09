const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const ReadSoal = async (req, res) => {
  const { id_guru } = req.guru;
  const { id_mapel } = req.query;

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });

    const mapel = await MapelModel.findById(id_mapel);
    if (!mapel)
      return res.status(404).send({
        code: res.statusCode,
        message: "Mapel tidak ditemukan",
      });

    const Respone = await SoalModel.find({ id_mapel: id_mapel });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Soal",
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
  ReadSoal,
};
