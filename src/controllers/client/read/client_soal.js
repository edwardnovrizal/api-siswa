const ReadClientSoal = async (req, res) => {
  const { id_mapel } = req.query;

  try {
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
  ReadClientSoal,
};
