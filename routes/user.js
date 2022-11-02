const router = require("express").Router();

const upload = require("../utils/multer");

const { userPost, userEdit } = require("../controller/user");

router.route("/").post(upload.single("image"), userPost);
router.route("/:id").put(upload.single("image"), userEdit)

module.exports = router;