const express = require("express");
const router = express.Router();

const Register = require("../controllers/client/auth_murid/register");
const Login = require("../controllers/client/auth_murid/login");
const VerifyToken = require("../commons/verify_token");
const RegisterGuru = require("../controllers/guru/auth/register_guru");
const LoginGuru = require("../controllers/guru/auth/login_guru");
const { CreateMapel } = require("../controllers/guru/mapel/create_mapel");
const { ReadMapel } = require("../controllers/guru/mapel/read_mapel");
const { DeleteMapel } = require("../controllers/guru/mapel/delete_mapel");
const { CreateSoal } = require("../controllers/guru/soal/create_soal");
const { ReadSoal } = require("../controllers/guru/soal/read_soal");
const { EditMapel } = require("../controllers/guru/mapel/edit_mapel");
const { EditSoal } = require("../controllers/guru/soal/edit_soal");
const { ReadMurid } = require("../controllers/guru/murid/read_murid");
const { DeleteMurid } = require("../controllers/guru/murid/delete_murid");
const { ReadGuruClient } = require("../controllers/client/read/client_guru");
const { ReadMapelClient } = require("../controllers/client/read/client_mapel");
const { ReadClientSoal } = require("../controllers/client/read/client_soal");
const { DeleteSoal } = require("../controllers/guru/soal/delete_soal");
const { ReadGuruAdmin } = require("../controllers/admin/guru/read_guru");
const { DeleteGuruAdmin } = require("../controllers/admin/guru/delete_guru");
const { ReadProfilClient } = require("../controllers/client/read/client_profil");

// ADMIN
router.get("/admin/guru", ReadGuruAdmin);
router.delete("/admin/guru", DeleteGuruAdmin);

// GURU
router.post("/guru/register", RegisterGuru);
router.post("/guru/login", LoginGuru);
// GURU MAPEL
router.post("/guru/mapel", VerifyToken, CreateMapel);
router.get("/guru/mapel", VerifyToken, ReadMapel);
router.delete("/guru/mapel", VerifyToken, DeleteMapel);
router.put("/guru/mapel", VerifyToken, EditMapel);
// GURU SOAL
router.post("/guru/soal", VerifyToken, CreateSoal);
router.get("/guru/soal", VerifyToken, ReadSoal);
router.put("/guru/soal", VerifyToken, EditSoal);
router.delete("/guru/soal", VerifyToken, DeleteSoal);
//  GURU MURID
router.get("/guru/murid", VerifyToken, ReadMurid);
router.delete("/guru/murid", VerifyToken, DeleteMurid);

// Client
router.post("/client/register", Register);
router.post("/client/login", Login);
router.get("/client/guru", ReadGuruClient);
router.get("/client/mapel", VerifyToken, ReadMapelClient);
router.get("/client/soal", VerifyToken, ReadClientSoal);
router.get("/client/profil", VerifyToken, ReadProfilClient);

module.exports = router;
