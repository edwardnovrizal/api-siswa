const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const CreateSoal = async (req, res) => {
  const { id_mapel, pertanyaan, gambar, opsi, jawaban } = req.body;
  const { id_guru } = req.guru;

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
        method: req.method,
        endpoint: req.url,
        message: "Mapel tidak ditemukan",
      });

    const DataRequest = SoalModel({
      pertanyaan,
      gambar,
      opsi,
      jawaban,
      id_mapel,
    });

    const Respone = await DataRequest.save();
    await MapelModel.findById(id_mapel).updateOne({ $push: { soal: Respone._id } });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Create Data Soal",
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
  CreateSoal,
};
