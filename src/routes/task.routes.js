const router = require("express").Router();
const {
  getTasks,
  getDetailTasks,
  formTaskA,
  formTaskM,
  addTask,
  deleteTask,
  updateTask,
} = require("../controller/task.controller");
const { authJwt } = require("../middleware");

router.get("/:id", [authJwt.check], getTasks);
router.get("/detalle/:id", [authJwt.check], getDetailTasks);

//ALTA TAREAS
router.get("/alta/:id", [authJwt.check], formTaskA);
router.post("/agregando", [authJwt.check], addTask);





router.delete("/:id", [authJwt.check], deleteTask);

router.get("/modificar/:id",[authJwt.check], formTaskM);

router.put("/:id",[authJwt.check], updateTask);
router.put("/modificando/:id?_methodT=PUT", [authJwt.check], updateTask);


router.get("/borrando/:id",[authJwt.check], deleteTask);


module.exports = router;
