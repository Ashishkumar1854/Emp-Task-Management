const express = require("express");
const router = express.Router();
const { auth, requireRole } = require("../middleware/auth");
const taskCtrl = require("../controllers/taskController");

router.use(auth);

router.post("/", requireRole("admin"), taskCtrl.createTask); // admin creates
router.get("/all", requireRole("admin"), taskCtrl.getAll);
router.get("/mine", taskCtrl.getAssigned); // any authenticated user
router.put("/:id", taskCtrl.updateTask); // admin or assigned user
router.delete("/:id", requireRole("admin"), taskCtrl.deleteTask);

module.exports = router;
