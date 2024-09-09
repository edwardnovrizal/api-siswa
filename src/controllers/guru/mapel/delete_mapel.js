const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const DeleteMapel = async (req, res) => {
  const { id_mapel } = req.body;
  const { id_guru } = req.guru;

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });

    // 1. Hapus semua Soal yang terkait dengan Mapel yang dihapus
    await SoalModel.deleteMany({ id_mapel: { $in: id_mapel } });

    // 2. Hapus Guru itu sendiri
    const Respone = await MapelModel.deleteOne({ _id: id_mapel });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Hapus Data Mapel",
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
  DeleteMapel,
};
