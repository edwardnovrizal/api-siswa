const ScoreModel = require("../models/score");
const SoalModel = require("../models/soal");

async function HitungScore(id_murid, id_mapel, jawaban) {
  try {
    const soalList = await SoalModel.find({ id_mapel: id_mapel });
    if (soalList.length === 0) {
      return null;
    }

    let totalScore = 0;

    jawaban.forEach((jawabanItem) => {
      const soalDitemukan = soalList.find((s) => s.id === jawabanItem.soal);
 
      if (soalDitemukan && soalDitemukan.jawaban === jawabanItem.pilihan) {
        totalScore++;
      }
    });

    const existingScore = await ScoreModel.findOne({ murid: id_murid, mapel: id_mapel });
    
    if (existingScore) {
      existingScore.nilai = totalScore;
      await existingScore.save();
    } else {
      const newScore = new ScoreModel({
        murid: id_murid,
        mapel: id_mapel,
        nilai: totalScore,
        jumlah_soal: soalList.length,
      });
      await newScore.save();
    }

    return totalScore;
  } catch (error) {
    throw new Error("Error calculating score - " + error);
  }
}

module.exports = HitungScore;
