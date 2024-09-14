const HitungScore = require("../../../commons/hitung_score");

const CreateJawaban = async (req, res) => {
  const { id_mapel, jawaban } = req.body;
  const { id_murid } = req.murid;
  if (!id_mapel || !jawaban) {
    return res.status(400).send({ code: res.statusCode, message: "Invalid request data" });
  }
  try {
    const score = await HitungScore(id_murid, id_mapel, jawaban);

    if (score === null) {
      return res.status(400).send({
        code: res.statusCode,
        message: "Data Mapel Tidak Ditemukan",
      });
    }
    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Mengirim Data Jawaban",
      data: score,
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
