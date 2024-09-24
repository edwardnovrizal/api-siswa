const MuridModel = require("../../../models/murid");

const EditProfilClient = async (req, res) => {
  const { fullname, email } = req.body;
  const { id_murid } = req.murid;

  try {
    const Respone = await MuridModel.findByIdAndUpdate(id_murid, { fullname, email }, { new: true, runValidators: true });
    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Edit Data Profil",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};

module.exports = { EditProfilClient };
