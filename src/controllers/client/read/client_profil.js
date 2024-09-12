const MuridModel = require("../../../models/murid");

const ReadProfilClient = async (req, res) => {
  const murid = req.murid;

  try {
    const Respone = await MuridModel.findOne({ _id: murid.id_murid });

    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Profil",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};
module.exports = { ReadProfilClient };
