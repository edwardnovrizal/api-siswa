const MapelModel = require("../../../models/mapel");

const ReadMapelClient = async (req, res) => {
  const murid = req.murid;

  try {
    const Respone = await MapelModel.find({ guru: murid.id_guru }, { title: 1, id: 1, icon: 1 });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Mata Pelajaran",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};
module.exports = { ReadMapelClient };
