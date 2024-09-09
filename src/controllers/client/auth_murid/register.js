const EncryptId = require("../../../commons/encrypt");
const GuruModel = require("../../../models/guru");
const MuridModel = require("../../../models/murid");

const Register = async (req, res) => {
  const { id_guru, username, email, password } = req.body;

  // VALIDASI DATA KOSONG
  if (!username || !email || !password || !id_guru) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Data Tidak Boleh Kosong!",
    });
  }

  // Validasi username tidak hanya berisi karakter spasi
  if (username.includes(" ")) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Username Tidak Boleh Mengandung Spasi!",
    });
  }

  // Validasi format email menggunakan regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Format Email Tidak Valid!",
    });
  }

  // Validasi panjang password minimal 6 karakter
  if (password.length < 6) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Panjang password minimal 6 karakter!",
    });
  }

  try {
    const guru = await GuruModel.findById(id_guru);
    if (!guru)
      return res.status(404).send({
        code: res.statusCode,
        method: req.method,
        endpoint: req.url,
        message: "Guru tidak ditemukan",
      });

    const DataRequest = MuridModel({
      username: username,
      email: email,
      password: EncryptId(password),
      guru: id_guru,
    });
    const Respone = await DataRequest.save();
    console.log(Respone);

    await GuruModel.findById(id_guru).updateOne({ $push: { murid: Respone._id } });
    return res.status(200).send({
      code: res.statusCode,
      message: "Register Murid Berhasil",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Bad Request! " + error,
    });
  }
};

module.exports = Register;
