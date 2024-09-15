const ScoreModel = require("../../../models/score");

const ReadClientScore = async (req, res) => {
  const { id_mapel } = req.query;
  const { id_murid } = req.murid;

  try {
    const Respone = await ScoreModel.findOne({ mapel: id_mapel, murid: id_murid });

    if (Respone == null) {
      return res.status(404).send({
        code: res.statusCode,
        message: "Data Score Tidak Ditemukan",
      });
    }

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Score",
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
  ReadClientScore,
};
