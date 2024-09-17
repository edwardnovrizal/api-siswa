const GuruModel = require("../../../models/guru");
const JawabanModel = require("../../../models/jawaban");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const JawabanMuridByMapel = async (req, res) => {
  const { id_guru } = req.guru;
  const { id_mapel, id_murid } = req.query;

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        message: "Guru tidak ditemukan",
      });
    const mapel = await MapelModel.findOne({ _id: id_mapel, guru: id_guru });
    if (!mapel)
      return res.status(404).send({
        code: res.statusCode,
        message: "Mapel tidak ditemukan",
      });

    const hasilMapel = await JawabanModel.findOne({ id_mapel, id_murid }).populate("id_murid").populate("jawaban.id_soal");
    if (!hasilMapel) {
      return res.status(404).json({ code: res.statusCode, message: "Murid ini belum mengerjakan soal untuk mapel ini" });
    }

    const response = {
      murid: hasilMapel.id_murid.fullname,
      skor: hasilMapel.skor_total,
      jawaban: hasilMapel.jawaban.map((j) => ({
        soal: j.id_soal.pertanyaan,
        jawaban_murid: j.jawaban_murid,
        poin: j.nilai,
      })),
    };

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Read Data Jawaban Berdasarkan Mapel",
      data: response,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = {
  JawabanMuridByMapel,
};
