const GuruModel = require("../../../models/guru");

const ReadGuruAdmin = async (req, res) => {
  try {
    const Respone = await GuruModel.find().populate({
      path: "mapel",
      populate: {
        path: "soal",
        match: { _id: { $exists: true } }, // Hanya mengambil soal yang masih ada
        select: "_id",
      },
    });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data All Guru",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = { ReadGuruAdmin };
