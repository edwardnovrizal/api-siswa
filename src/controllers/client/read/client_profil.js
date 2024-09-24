const JawabanModel = require("../../../models/jawaban");
const MuridModel = require("../../../models/murid");

const ReadProfilClient = async (req, res) => {
  const { id_murid } = req.murid;

  try {
    const Respone = await MuridModel.findOne({ _id: id_murid }, { password: 0 }).populate("guru", "fullname email");
    const jawaban = await JawabanModel.find({ id_murid: id_murid })
      .populate({
        path: "id_mapel",
        select: "title icon skor_total", // populate detail mapel
      })
      .populate({
        path: "jawaban.id_soal",
        select: "pertanyaan", // populate soal yang dikerjakan murid
      });

    const jawabanMapel = jawaban
      .map((j) => {
        if (!j.id_mapel) return null;
        return {
          mapel: j.id_mapel.title,
          icon: j.id_mapel.icon,
          skor_total: j.skor_total,
        };
      })
      .filter((j) => j !== null);

    const result = {
      fullname: Respone.fullname,
      username : Respone.username,
      email: Respone.email,
      guru: {
        fullname: Respone.guru.fullname ?? "Guru Tidak Tersedia",
        email: Respone.guru.email ?? "Guru Tidak Tersedia",
      },
      skore: jawabanMapel ,
    };
    return res.status(200).send({
      code: res.statusCode,
      message: "Berhasil Get Data Profil",
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      code: res.statusCode,
      message: `Bad Request! - ${error}`,
    });
  }
};
module.exports = { ReadProfilClient };
