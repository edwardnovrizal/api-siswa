const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GuruModel = require("../../../models/guru");

const LoginGuru = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Data Tidak Boleh Kosong!",
    });
  }
  try {
    const Respone = await GuruModel.findOne({ username });

    if (!Respone)
      return res.status(400).send({
        code: res.statusCode,
        message: "Invalid Username!",
      });
    console.log(Respone);

    bcrypt.compare(password, Respone.password, function (err, result) {
      if (!result) {
        return res.status(400).send({
          code: res.statusCode,
          message: "Invalid Password!",
        });
      } else {
        const token = jwt.sign(
          {
            id_guru: Respone._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).send({
          code: res.statusCode,
          message: "Succesfully Login Guru!",
          data: {
            token,
          },
        });
      }
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: "Bad Request! " + error,
    });
  }
};

module.exports = LoginGuru;
