const JawabanModel = require("../../../models/jawaban");
const ScoreModel = require("../../../models/score");
const SoalModel = require("../../../models/soal");

const ReadClientScore = async (req, res) => {
  const { id_mapel } = req.query;
  const { id_murid } = req.murid;

  try {
    const jumlahSoal = await SoalModel.countDocuments({ id_mapel });
    const Respone = await JawabanModel.findOne({ id_mapel, id_murid });

    if (Respone == null) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Data Score Tidak Ditemukan",
      });
    }
    const result = {
      nilai: Respone.skor_total,
      jumlah_soal: jumlahSoal,
    };
    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Score",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = {
  ReadClientScore,
};
