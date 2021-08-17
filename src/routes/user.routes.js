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

router.get("/", getUsers);
router.get("/alta", formUsersA);
router.get("/:firstName", getOneUserByName);
router.get("/detalle/:id",getDetailUser);

router.post("/agregando", addUser);

router.get("/borrando/:id", deleteUser);



router.put("/:id", updateUser);

router.get("/modificar/:id", formUsersM);
router.put("/modificando/:id?_method=PUT",updateUser);

module.exports = router;
