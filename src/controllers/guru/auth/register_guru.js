const EncryptId = require("../../../commons/encrypt");
const GuruModel = require("../../../models/guru");

const RegisterGuru = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  // VALIDASI DATA KOSONG
  if (!username || !email || !password || !fullname) {
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
    const DataRequest = GuruModel({
      username: username,
      fullname: fullname,
      email: email,
      password: EncryptId(password),
    });
    const Respone = await DataRequest.save();

    return res.status(200).send({
      code: res.statusCode,
      message: "Register Guru Berhasil",
      data: Respone,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Bad Request! " + error,
    });
  }
};

module.exports = RegisterGuru;
