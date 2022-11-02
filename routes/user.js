const router = require("express").Router();

const upload = require("../utils/multer");

const { userPost, userEdit, userGetAll, userGetByID, userDelete } = require("../controller/user");

router.route("/").post(upload.single("image"), userPost);
router.route("/:id").put(upload.single("image"), userEdit);
router.route("/").get(userGetAll);
router.route("/:id").get(userGetByID);
router.route("/:id").delete(userDelete);

module.exports = router;