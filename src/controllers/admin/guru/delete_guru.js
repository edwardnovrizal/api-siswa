const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");
const MuridModel = require("../../../models/murid");
const SoalModel = require("../../../models/soal");

const DeleteGuruAdmin = async (req, res) => {
  const { id_guru } = req.body;
  try {
    // 1. Hapus semua Mapel yang terkait dengan Guru
    const mapelList = await MapelModel.find({ guru: id_guru });

    // Ambil ID Mapel dari hasil pencarian
    const mapelIds = mapelList.map((mapel) => mapel._id);

    // 2. Hapus semua Soal yang terkait dengan Mapel yang dihapus
    await SoalModel.deleteMany({ id_mapel: { $in: mapelIds } });

    // 3. Hapus semua Mapel yang terkait dengan Guru ini
    await MapelModel.deleteMany({ guru: id_guru });

    // 4. Hapus Murid yang terkait dengan Guru ini (jika perlu)
    await MuridModel.deleteMany({ guru: id_guru });

    // 5. Hapus Guru itu sendiri
    const Respone = await GuruModel.deleteOne({ _id: id_guru });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Hapus Data Guru",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = { DeleteGuruAdmin };
