const ReadGuruClient = async (req, res) => {
  try {
    const Respone = await GuruModel.find({}, { username: 1, email: 1 });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Guru",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = { ReadGuruClient };
