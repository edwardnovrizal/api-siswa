const GuruModel = require("../../../models/guru");
const MapelModel = require("../../../models/mapel");

const EditMapel = async (req, res) => {
  const { title, icon, id_mapel } = req.body;
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

    const Respone = await MapelModel.findByIdAndUpdate(
      id_mapel,
      {
        title,
        icon,
        guru: id_guru,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Edit Data Mata Pelajaran",
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
  EditMapel,
};
