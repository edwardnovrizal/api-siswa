const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");

const CreateMapel = async (req, res) => {
  const { title } = req.body;
  const { id_guru } = req.guru;
  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        method: req.method,
        endpoint: req.url,
        message: "Guru tidak ditemukan",
      });

    const DataRequest = MapelModel({
      title,
      guru: id_guru,
    });

    const Respone = await DataRequest.save();

    await GuruModel.findById(id_guru).updateOne({ $push: { mapel: Respone._id } });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Create Data Mata Pelajaran",
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
  CreateMapel,
};
