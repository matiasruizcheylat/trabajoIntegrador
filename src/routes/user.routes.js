const router = require("express").Router();
const {
  getUsers,
  addUser,
  getDetailUser,
  deleteUser,
  updateUser,
  formUsersA,
  formUsersM,
  getOneUserByName,
} = require("../controller/user.controller");
const { authJwt } = require("../middleware");

router.get("/", [authJwt.check], getUsers);
router.get("/alta",[authJwt.check], formUsersA);
router.get("/:username",[authJwt.check], getOneUserByName);
router.get("/detalle/:id",[authJwt.check],getDetailUser);

router.post("/agregando",[authJwt.check], addUser);

router.get("/borrando/:id",[authJwt.check], deleteUser);



router.put("/:id",[authJwt.check], updateUser);

router.get("/modificar/:id",[authJwt.check], formUsersM);
router.put("/modificando/:id?_method=PUT",[authJwt.check],updateUser);

module.exports = router;
