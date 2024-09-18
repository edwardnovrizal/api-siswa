const HitungScore = require("../../../commons/hitung_score");
const JawabanModel = require("../../../models/jawaban");
const MapelModel = require("../../../models/mapel");
const SoalModel = require("../../../models/soal");

const CreateJawaban = async (req, res) => {
  const { id_mapel, jawaban } = req.body;
  const { id_murid } = req.murid;
  let totalSkor = 0; // Menyimpan total skor murid
  let jawabanDetails = []; // Menyimpan detail jawaban dan skor tiap soal

  if (!id_mapel || !jawaban) {
    return res.status(400).send({ code: res.statusCode, message: "Invalid request data" });
  }
  try {
    const mapel = await MapelModel.findOne({ _id: id_mapel }).populate("guru");
    if (!mapel) {
      return res.status(400).send({
        code: res.statusCode,
        message: "Data Mapel Tidak Ditemukan",
      });
    }

     await JawabanModel.deleteMany({ id_mapel: id_mapel, id_murid: id_murid });

    const soalIds = jawaban.map((j) => j.soal);
    const soalList = await SoalModel.find({ _id: { $in: soalIds }, id_mapel: id_mapel });
    if (soalList.length !== soalIds.length) {
      return res.status(400).send({
        code: res.statusCode,
        message: "Salah satu soal tidak terkait dengan mapel yang diberikan",
      });
    }

    jawaban.forEach((j) => {
      const soal = soalList.find((s) => s._id.toString() === j.soal);
      let skor = soal.jawaban === j.pilihan ? 1 : 0;
      totalSkor += skor;
      jawabanDetails.push({
        id_soal: j.soal,
        jawaban_murid: j.pilihan,
        nilai: skor,
      });
    });

    const hasilMapel = new JawabanModel({
      id_mapel: id_mapel,
      id_murid: id_murid,
      jawaban: jawabanDetails,
      skor_total: totalSkor,
    });

    const Respone = await hasilMapel.save();

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Mengirim Data Jawaban",
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
  CreateJawaban,
};
